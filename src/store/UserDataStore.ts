import { defineStore } from "pinia"
import { 
  IAppreciationAsset,
  ISetOptionDataPayload,
  ISetUserDataPayload,
  IUserData,
  PlaySpeed,
  TextSize } from '../interface/stateInterface/userDataInterface'

export const UserDataStore = defineStore('UserDataStore',{
    state:()=>{
      return {
        initState:<IUserData>{
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
        this.initState.optionData.textSpeed = speed
      },
      setAutoSpeed(speed:PlaySpeed){
        this.initState.optionData.autoSpeed = speed
      },
      setTextSize(size:TextSize){
        this.initState.optionData.textSize = size
      },
      setStorage(){

      },
      setVolume(){
        console.log("主音量", this.initState.optionData.volumeMain)
      }
    }
})