import { cloneDeep } from "lodash"
import { ISaveData } from "../../interface/stateInterface/userDataInterface"
import { ControllerStore } from "../../store/ControllerStore"
import { StageStore } from "../../store/StageStore"
import { UserDataStore } from "../../store/UserDataStore"

/**
 * 保存游戏
 * @param index 游戏的档位
 */
export const saveGame = (index:number)=>{
  const controllerStore = ControllerStore()
  const userDataState = UserDataStore().userDataState
  const stageState = StageStore().stageState
  const saveBacklog = cloneDeep(controllerStore.runtime_currentBacklog)
  const saveData:ISaveData = {
    nowStageState: cloneDeep(stageState),
    backlog: saveBacklog, // 舞台数据
    index: index, // 存档的序号
    saveTime: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString('chinese', {hour12: false}), // 保存时间
    sceneData: {
      currentSentenceId: controllerStore.runtime_currentSceneData.currentSentenceId, // 当前语句ID
      sceneStack: cloneDeep(controllerStore.runtime_currentSceneData.sceneStack), // 场景栈
      sceneName: controllerStore.runtime_currentSceneData.currentScene.sceneName, // 场景名称
      sceneUrl: controllerStore.runtime_currentSceneData.currentScene.sceneUrl, // 场景url
    }
  }
  console.log('存档数据',saveData)
  const newSaveData = cloneDeep(userDataState.saveData)
  console.log('newSaveData',newSaveData)
  newSaveData[index] = saveData
  userDataState.saveData = cloneDeep(newSaveData)
}