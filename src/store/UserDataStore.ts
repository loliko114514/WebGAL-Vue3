import { defineStore } from "pinia"
import { 
  IUserData,
  PlaySpeed,
  TextSize } from '../interface/stateInterface/userDataInterface'

export const UserDataStore = defineStore('UserDataStore',{
    state:()=>{
      return {
        userDataState:<IUserData>{
          saveData: [],
          optionData: {
            slPage: 1,
            volumeMain: 100, // 主音量
            textSpeed: PlaySpeed.normal, // 文字速度
            autoSpeed: PlaySpeed.normal, // 自动播放速度
            textSize: TextSize.medium,
            vocalVolume: 100, // 语音音量
            bgmVolume: 25, // 背景音乐音量
          }, 
          appreciationData: {
            bgm: [],
            cg: []
          }
        }
      }
    },
    actions:{
      setTextSpeed(speed:PlaySpeed){
        this.userDataState.optionData.textSpeed = speed
      },
      setAutoSpeed(speed:PlaySpeed){
        this.userDataState.optionData.autoSpeed = speed
      },
      setTextSize(size:TextSize){
        this.userDataState.optionData.textSize = size
      },
      setStorage(){//更新本地缓存

      },
      setVolume(){//设置音量

      },
      setSlPage(page:number){//设置当前存读界面页数
        this.userDataState.optionData.slPage = page
      },
      resetUserData(userDataState:IUserData){
        Object.assign(this.userDataState,userDataState)
      },
    }
})