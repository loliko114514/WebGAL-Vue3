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
import { sceneParser } from "../util/parser/sceneParser"
import { initPerform, IPerform, IRunPerform } from "../interface/coreInterface/performInterface"
import { infoFetcher } from "../util/coreInitialFunction/infoFetcher"
import { IStageState } from "../interface/stateInterface/stageInterface"
import { runScript } from "../controller/gamePlay/runScript"
export const ControllerStore = defineStore('ControllerStore',{
  state:()=>{
    return{
      textInitialDelay:<number> 80,
      chooselist:<string[][]> [], // 选项列表
      videoSrc:<string> '',//视频路径
      introArray:<Array<string>> [],//黑屏文字
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


  }
})