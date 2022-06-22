import { defineStore } from "pinia"
import { UserDataStore } from "./UserDataStore"
import { GuiStore } from "./GuiStore"
import { StageStore } from "./StageStore"
import { IBacklogItem } from "../interface/coreInterface/runtimeInterface"
export const ControllerSotre = defineStore('ControllerSotre',{
  state:()=>{
    const userDataState = UserDataStore().userDataState
    const stageState = StageStore().stageState
    return{
      runtime_currentBacklog:{
                
      }
    }
  },
  actions:{
    saveGame(index:number){
      const userDataState = UserDataStore().userDataState
      const stageState = StageStore().stageState
    }
  }
})