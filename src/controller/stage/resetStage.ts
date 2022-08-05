import { cloneDeep } from "lodash";
import { ControllerStore } from "../../store/ControllerStore";
import { StageStore } from "../../store/StageStore";

export const resetStage = (resetBacklog: boolean) => {
  /**
   * 清空运行时
   */
  const controllerStore = ControllerStore()
  if (resetBacklog) {
    controllerStore.runtime_currentBacklog.splice(0, controllerStore.runtime_currentBacklog.length); // 清空backlog
  }
  // 清空sceneData，并重新获取
  controllerStore.runtime_currentSceneData.currentSentenceId = 0;
  controllerStore.runtime_currentSceneData.sceneStack = [];
  controllerStore.runtime_currentSceneData.currentScene = controllerStore.initSceneData.currentScene;

  // 清空所有演出和timeOut
  for (const e of controllerStore.runtime_gamePlay.performList) {
    e.stopFunction();
  }
  controllerStore.runtime_gamePlay.performList = [];
  for (const e of controllerStore.runtime_gamePlay.timeoutList) {
    clearTimeout(e);
  }
  controllerStore.runtime_gamePlay.timeoutList = [];
  controllerStore.runtime_gamePlay.isAuto = false;
  controllerStore.runtime_gamePlay.isFast = false;
  const autoInterval = controllerStore.runtime_gamePlay.autoInterval;
  if (autoInterval !== null) clearInterval(autoInterval);
  controllerStore.runtime_gamePlay.autoInterval = null;
  const fastInterval = controllerStore.runtime_gamePlay.fastInterval;
  if (fastInterval !== null) clearInterval(fastInterval);
  controllerStore.runtime_gamePlay.fastInterval = null;
  const autoTimeout = controllerStore.runtime_gamePlay.autoTimeout;
  if (autoTimeout !== null) clearInterval(autoTimeout);
  controllerStore.runtime_gamePlay.autoTimeout = null;

  // 清空舞台状态表
  const stageStore = StageStore()
  const initSceneDataCopy = cloneDeep(stageStore.stageState);
  stageStore.resetStageState(initSceneDataCopy)
};
