import { defineStore } from "pinia"
import { UserDataStore } from "./UserDataStore"
import { GuiStore } from "./GuiStore"
import { StageStore } from "./StageStore"
import { IBacklogItem } from "../interface/coreInterface/runtimeInterface"
import { ISaveData, IUserData } from "../interface/stateInterface/userDataInterface"
import { ISceneData } from "../interface/coreInterface/sceneInterface"
import { cloneDeep, isArguments } from "lodash"
import localforage from "localforage"
export const ControllerSotre = defineStore('ControllerSotre',{
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