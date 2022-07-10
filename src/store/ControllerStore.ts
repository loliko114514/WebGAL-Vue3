import { defineStore } from "pinia"
import { UserDataStore } from "./UserDataStore"
import { GuiStore } from "./GuiStore"
import { StageStore } from "./StageStore"
import { IBacklogItem, IGamePlay, sceneEntry } from "../interface/coreInterface/runtimeInterface"
import { ISaveData, IUserData } from "../interface/stateInterface/userDataInterface"
import { ISceneData, fileType, IScene, IAsset, ISentence, commandType } from "../interface/coreInterface/sceneInterface"
import { assetSetter } from "../util/assetSetter"
import { cloneDeep } from "lodash"
import localforage from "localforage"
import axios from "axios"
import { sceneFetcher } from "../util/sceneFetcher"
import { sceneParser } from "../util/parser/scenParser"
import { initPerform, IPerform, IRunPerform } from "../interface/coreInterface/performInterface"
import { infoFetcher } from "../util/coreInitialFunction/infoFetcher"
import { IStageState } from "../interface/stateInterface/stageInterface"
import { runScript } from "../controller/gamePlay/runScript"
export const ControllerStore = defineStore('ControllerStore',{
  state:()=>{
    return{
      textInitialDelay:<number> 80,
      runtime_currentBacklog:<Array<IBacklogItem>>[],
      runtime_currentSceneData:<ISceneData>{
        currentSentenceId: 0,// 当前语句ID
        sceneStack: [],
        // 初始场景，没有数据
        currentScene: {
          sceneName: '', // 场景名称
          sceneUrl: '', // 场景url
          sentenceList: [], // 语句列表
          assetsList: [], // 资源列表
          subSceneList: [] // 子场景列表
        }
      },
      gameInfo:{
        gameName: '',
        gameKey: '',
      },
      settledScene: <Array<string>> [],
      settledAssets: <Array<string>> [],
      runtime_gamePlay: <IGamePlay>{
        performList: [],
        timeoutList: [],
        isAuto: false,
        isFast: false,
        autoInterval: null,
        fastInterval: null,
        autoTimeout: null,
        currentPixi: null
      }
    }
  },
  actions:{
    /**
     * 引擎初始化函数
     */
    async initializeScript(){
      // 获取游戏信息
      infoFetcher('../../public/game/config.txt')
      // 获取start场景
      const sceneUrl: string = assetSetter('start.txt', fileType.scene)
      // 场景写入到运行时
      sceneFetcher(sceneUrl).then((rawScene) => {
        this.runtime_currentSceneData.currentScene = sceneParser(rawScene, 'start.txt', sceneUrl)
      })
    },

    /**
     * -----------------------------------------gamePlay---------------------------------------
     */

    /**
     * 进行下一句
     */
     nextSentence(){
      console.log("进行下一句")
      // 如果当前显示标题，那么不进行下一句
      const GuiState = GuiStore().guiState
      if (GuiState.showTitle) {
        return
      }

      // 第一步，检查是否存在 blockNext 的演出
      let isBlockingNext = false;
      this.runtime_gamePlay.performList.forEach((e) => {
        if (e.blockingNext() && !e.isOver)
          // 阻塞且没有结束的演出
          isBlockingNext = true
      });
      if (isBlockingNext) {
        // 有阻塞，提前结束
        console.log('next 被阻塞！')
        return
      }

      // 检查是否处于演出完成状态，不是则结束所有普通演出（保持演出不算做普通演出）
      let allSettled = true;
      this.runtime_gamePlay.performList.forEach((e) => {
        if (!e.isHoldOn) allSettled = false;
      });
      if (allSettled) { 
        // 所有普通演出已经结束
        // 清除状态表的演出序列（因为这时候已经准备进行下一句了）
        const stageStore = StageStore()
        const newStageState = cloneDeep(stageStore.stageState);
        for (let i = 0; i < newStageState.PerformList.length; i++) {
          const e: IRunPerform = newStageState.PerformList[i];
          if (!e.isHoldOn) {
            newStageState.PerformList.splice(i, 1);
            i--;
          }
        }
        stageStore.resetStageState(newStageState)
        this.scriptExecutor()
        return;
      }
        
      // 不处于 allSettled 状态，清除所有普通演出，强制进入settled。
      console.log('提前结束被触发，现在清除普通演出');
      let isGoNext = false;
      for (let i = 0; i < this.runtime_gamePlay.performList.length; i++) {
        const e = this.runtime_gamePlay.performList[i];
        if (!e.isHoldOn) {
          if (e.goNextWhenOver) {
            isGoNext = true;
          }
          e.stopFunction();
          clearTimeout(e.stopTimeout);
          this.runtime_gamePlay.performList.splice(i, 1);
          i--;
        }
      }
      if (isGoNext) {
        this.nextSentence();
      }
    },

    /**
     * 语句执行器
     * 执行语句，同步场景状态，并根据情况立即执行下一句或者加入backlog
     */
    scriptExecutor(){
      // 超过总语句数量，则从场景栈拿出一个需要继续的场景，然后继续流程。若场景栈清空，则停止流程
      if (this.runtime_currentSceneData.currentSentenceId > this.runtime_currentSceneData.currentScene.sentenceList.length - 1) {
        if (this.runtime_currentSceneData.sceneStack.length !== 0) {
          const sceneToRestore: sceneEntry | undefined = this.runtime_currentSceneData.sceneStack.pop();
          if (sceneToRestore !== undefined) {
            this.restoreScene(sceneToRestore);
          }
        }
        return;
      }
      const currentScript: ISentence =
      this.runtime_currentSceneData.currentScene.sentenceList[this.runtime_currentSceneData.currentSentenceId];
      // 判断这个脚本要不要执行
      let runThis = true;
      let isHasWhenArg = false;
      let whenValue = '';
      currentScript.args.forEach(e => {
        if (e.key === 'when') {
          isHasWhenArg = true;
          whenValue = e.value.toString();
        }
      });
      // 如果语句有 when
      // if (isHasWhenArg) {
      //   // 先把变量解析出来
      //   const valExpArr = whenValue.split(/([+\-*\/()><=!]|>=|<=)/g);
      //   const valExp = valExpArr.map(e => {
      //     if (e.match(/[a-zA-Z]/)) {
      //       if (e.match(/true/) || e.match(/false/)) {
      //         return e;
      //       }
      //       return getValueFromState(e).toString();
      //     } else return e;
      //   }).reduce((pre, curr) => pre + curr, '');
      //   runThis = strIf(valExp);
      // }
      // 执行语句
      if (!runThis) {
        this.runtime_currentSceneData.currentSentenceId++;
        this.nextSentence();
        return;
      }
      runScript(currentScript);
      let isNext = false; // 是否要进行下一句
      currentScript.args.forEach((e) => {
        // 判断是否有下一句的参数
        if (e.key === 'next' && e.value) {
          isNext = true;
        }
      });

      let isSaveBacklog = currentScript.command === commandType.say; // 是否在本句保存backlog（一般遇到对话保存）
      // 检查当前对话是否有 notend 参数
      currentScript.args.forEach(e => {
        if (e.key === 'notend' && e.value === true) {
          isSaveBacklog = false;
        }
      });
      let currentStageState: IStageState;

      // 执行至指定 sentenceID
      // if (runToSentence >= 0 && runtime_currentSceneData.currentSentenceId < runToSentence) {
      //   runtime_currentSceneData.currentSentenceId++;
      //   scriptExecutor(runToSentence);
      //   return;
      // }

      // 执行“下一句”
      if (isNext) {
        this.runtime_currentSceneData.currentSentenceId++;
        this.scriptExecutor();
        return;
      }

      /**
       * 为了让 backlog 拿到连续执行了多条语句后正确的数据，放到下一个宏任务中执行（我也不知道为什么这样能正常，有能力的可以研究一下
       */
      setTimeout(() => {
        // 同步当前舞台数据
        currentStageState = StageStore().stageState
        console.log('本条语句执行结果', currentStageState);
        // 保存 backlog
        if (isSaveBacklog) {
          const newStageState = cloneDeep(currentStageState);
          newStageState.PerformList.forEach(ele => {
            ele.script.args.forEach(argelement => {
              if (argelement.key === 'concat') {
                argelement.value = false;
                ele.script.content = newStageState.showText;
              }
            });
          });
          const backlogElement: IBacklogItem = {
            currentStageState: newStageState,
            saveScene: {
              currentSentenceId: this.runtime_currentSceneData.currentSentenceId,// 当前语句ID
              sceneStack: cloneDeep(this.runtime_currentSceneData.sceneStack), // 场景栈
              sceneName: this.runtime_currentSceneData.currentScene.sceneName, // 场景名称
              sceneUrl: this.runtime_currentSceneData.currentScene.sceneUrl, // 场景url
            }
          };
          this.runtime_currentBacklog.push(backlogElement);
        }
      }, 0);
      this.runtime_currentSceneData.currentSentenceId++;
    },
    
    /**
     * -----------------------------------------scene---------------------------------------
     */
    
    /**
     * 恢复场景
     * @param entry 场景入口
     */
    restoreScene(entry: sceneEntry){
    // 场景写入到运行时
    sceneFetcher(entry.sceneUrl).then((rawScene) => {
      this.runtime_currentSceneData.currentScene = sceneParser(rawScene, entry.sceneName, entry.sceneUrl);
      this.runtime_currentSceneData.currentSentenceId = entry.continueLine + 1; // 重设场景
      this.nextSentence();
    });
    },

    /**
     * -----------------------------------------storage---------------------------------------
     */

    /**
     * 保存游戏
     * @param index 游戏的档位
     */
    saveGame(index:number){
      const userDataState = UserDataStore().userDataState
      const stageState = StageStore().stageState
      const saveBacklog = cloneDeep(this.runtime_currentBacklog)
      const saveData:ISaveData = {
        nowStageState: cloneDeep(stageState),
        backlog: saveBacklog, // 舞台数据
        index: index, // 存档的序号
        saveTime: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString('chinese', {hour12: false}), // 保存时间
        sceneData: {
          currentSentenceId: this.runtime_currentSceneData.currentSentenceId, // 当前语句ID
          sceneStack: cloneDeep(this.runtime_currentSceneData.sceneStack), // 场景栈
          sceneName: this.runtime_currentSceneData.currentScene.sceneName, // 场景名称
          sceneUrl: this.runtime_currentSceneData.currentScene.sceneUrl, // 场景url
        }
      }
      console.log('存档数据',saveData)
      const newSaveData = cloneDeep(userDataState.saveData)
      console.log('newSaveData',newSaveData)
      newSaveData[index] = saveData
      userDataState.saveData = cloneDeep(newSaveData)
    },

    /**
     * 写入本地存储
     */
    setStorage(){
      this.debounce(()=>{
        const userDataState = UserDataStore().userDataState
        localforage.setItem(this.gameInfo.gameKey, userDataState).then(() => {
          console.log('写入本地存储')
        });  
      },100)
    },

    /**
     * 从本地存储获取数据
     */
    getStorage(){
      this.debounce(()=>{
        const userDataStore = UserDataStore()
        localforage.getItem(this.gameInfo.gameKey).then((newUserData) => {
          // 如果没有数据或者属性不完全，重新初始化
          if (!newUserData || !this.checkUserDataProperty(newUserData)) {
            console.log('现在重置数据');
            this.setStorage();
            return;
          }
          userDataStore.resetUserData(newUserData as IUserData)
        });  
      },100)
    },
    
    /**
     * 同步本地存储
     */
    syncStorageFast(){
      const userDataStore = UserDataStore()
      localforage.setItem(this.gameInfo.gameKey,userDataStore.userDataState).then(()=>{
        localforage.getItem(this.gameInfo.gameKey).then((newUserData) => {
          // 如果没有数据，初始化
          if (!newUserData) {
            this.setStorage();
            return;
          }
          userDataStore.resetUserData(newUserData as IUserData)
        })
      })
    },

    /**
     * 检查用户数据属性是否齐全
     * @param userData 需要检查的数据
     */
    checkUserDataProperty(userData: any) {
      const userDatakey = UserDataStore().userDataState
      let result = true;
      for (const key in userDatakey) {
        if (!userData.hasOwnProperty(key)) {
          result = false;
        }
      }
      return result;
    },

    /**
     * 防抖函数
     * @param func 要执行的函数
     * @param wait 防抖等待时间
     */
    debounce<T, K>(func: (...args: T[]) => K, wait: number) {
      let timeout: ReturnType<typeof setTimeout>;
    
      function context(...args: T[]): K {
        clearTimeout(timeout);
        let ret!: K;
        timeout = setTimeout(() => {
          ret = func.apply(context, args);
        }, wait);
        return ret;
      }
      return context;
    },
  }
})