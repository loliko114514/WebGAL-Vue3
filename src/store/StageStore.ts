import { defineStore } from "pinia"
import { IStageState } from "../interface/stateInterface/stageInterface"

export const StageStore = defineStore('StageStore',{
  state:()=>{
    return {
      stageState:<IStageState> {
        oldBgName: '',
        bgName: '', // 背景文件地址（相对或绝对）
        figName: '', // 立绘_中 文件地址（相对或绝对）
        figNameLeft: '', // 立绘_左 文件地址（相对或绝对）
        figNameRight: '', // 立绘_右 文件地址（相对或绝对）
        showText: '', // 文字
        showName: '', // 人物名
        command: '', // 语句指令
        choose: [], // 选项列表，现在不用，先预留
        vocal: '', // 语音 文件地址（相对或绝对）
        bgm: '', // 背景音乐 文件地址（相对或绝对）
        miniAvatar: '', // 小头像 文件地址（相对或绝对）
        GameVar: {}, // 游戏内变量
        effects: [], // 应用的效果
        bgFilter: '', // 现在不用，先预留
        bgTransform: '', // 现在不用，先预留
        PerformList: [], // 要启动的演出列表
        currentDialogKey: 'initial',
        // currentPerformDelay: 0
        currentConcatDialogPrev:'',
        enableFilm:''
      },
    }
  },
  actions:{
    resetStageState(stageState:IStageState){
      Object.assign(this.stageState,stageState)
    },
    setStageVar(key:string,value:number | string | boolean){
      console.log('setStageVar',value)
      this.stageState.GameVar[key] = value
    }
  }
})