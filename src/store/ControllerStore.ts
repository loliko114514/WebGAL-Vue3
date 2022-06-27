import { defineStore } from "pinia"
import { UserDataStore } from "./UserDataStore"
import { GuiStore } from "./GuiStore"
import { StageStore } from "./StageStore"
import { IBacklogItem } from "../interface/coreInterface/runtimeInterface"
import { ISaveData, IUserData } from "../interface/stateInterface/userDataInterface"
import { ISceneData, fileType, IScene, IAsset, ISentence } from "../interface/coreInterface/sceneInterface"
import { assetSetter } from "../util/assetSetter"
import { cloneDeep } from "lodash"
import localforage from "localforage"
import axios from "axios"
import { sceneFetcher } from "../util/sceneFetcher"
export const ControllerStore = defineStore('ControllerStore',{
  state:()=>{
    const userDataState = UserDataStore().userDataState
    const stageState = StageStore().stageState
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
      }
    }
  },
  actions:{
    /**
     * 引擎初始化函数
     */
    initializeScript(){
      // 获取游戏信息
      this.infoFetcher('./game/config.txt')
      // 获取start场景
      const sceneUrl: string = assetSetter('start.txt', fileType.scene);
      // 场景写入到运行时
      sceneFetcher(sceneUrl).then((rawScene) => {
        this.runtime_currentSceneData.currentScene = sceneParser(rawScene, 'start.txt', sceneUrl);
      });

    },

    infoFetcher(url:string){
      const guiStore = GuiStore()
      axios.get(url).then((r)=>{
        let gameConfigRaw: Array<string> = r.data.split('\n'); // 游戏配置原始数据
        gameConfigRaw = gameConfigRaw.map((e) => e.split(';')[0]);
        const gameConfig: Array<Array<string>> = gameConfigRaw.map((e) => e.split(':')); // 游戏配置数据
        console.log('获取到游戏信息', gameConfig);
        // 按照游戏的配置开始设置对应的状态
        if (guiStore.guiState) {
          gameConfig.forEach((e) => {
            // 设置标题背景
            if (e[0] === 'Title_img') {
              const url: string = assetSetter(e[1], fileType.background);
              guiStore.settitleBg(url)
            }
            // 设置标题背景音乐
            if (e[0] === 'Title_bgm') {
              const url: string = assetSetter(e[1], fileType.bgm);
              guiStore.settitleBgm(url)
            }
            if (e[0] === 'Game_name') {
              this.gameInfo.gameName = e[1];
              document.title = e[1];
            }
            if (e[0] === 'Game_key') {
              this.gameInfo.gameKey = e[1];
              this.getStorage();
            }
          });
        }
        // window?.renderPromise?.();
        // delete window.renderPromise;
      })
    },
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
    setStorage(){
      this.debounce(()=>{
        const userDataState = UserDataStore().userDataState
        localforage.setItem(this.gameInfo.gameKey, userDataState).then(() => {
          console.log('写入本地存储')
        });  
      },100)
    },
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