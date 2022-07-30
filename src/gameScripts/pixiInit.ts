import { IPerform, IRunPerform } from "../interface/coreInterface/performInterface";
import { commandType, ISentence } from "../interface/coreInterface/sceneInterface";
import { ControllerStore } from "../store/ControllerStore";
import { StageStore } from "../store/StageStore";
import { cloneDeep } from "lodash"
/**
 * 初始化pixi
 * @param sentence
 */
 export const pixiInit = (sentence: ISentence): IPerform => {
  const controllerStore = ControllerStore()
  controllerStore.runtime_gamePlay.performList.forEach((e) => {
    if (e.performName.match(/PixiPerform/)) {
      console.log('pixi 被脚本重新初始化', e.performName);
      /**
                 * 卸载演出
                 */
      for (let i = 0; i < controllerStore.runtime_gamePlay.performList.length; i++) {
        const e2 = controllerStore.runtime_gamePlay.performList[i];
        if (e2.performName === e.performName) {
          e2.stopFunction();
          clearTimeout(e2.stopTimeout);
          controllerStore.runtime_gamePlay.performList.splice(i, 1);
          i--;
        }
      }
      /**
                 * 从状态表里清除演出
                 */
      const stageStore = StageStore()
      const newStageState = cloneDeep(stageStore.stageState);
      for (let i = 0; i < newStageState.PerformList.length; i++) {
        const e2: IRunPerform = newStageState.PerformList[i];
        if (e2.script.command === commandType.pixi) {
          newStageState.PerformList.splice(i, 1);
          i--;
        }
      }
      stageStore.resetStageState(newStageState)
    }
  }
  );
  return {
    performName: 'none',
    duration: 0,
    isOver: false,
    isHoldOn: false,
    stopFunction: () => {
    },
    blockingNext: () => false,
    blockingAuto: () => true,
    stopTimeout: undefined, // 暂时不用，后面会交给自动清除
  };
};
