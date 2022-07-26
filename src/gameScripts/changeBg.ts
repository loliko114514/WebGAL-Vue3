import { IPerform } from "../interface/coreInterface/performInterface";
import { ISentence } from "../interface/coreInterface/sceneInterface";
import { StageStore } from "../store/StageStore";

/**
 * 进行背景图片的切换
 * @param sentence 语句
 * @return {IPerform}
 */
 export const changeBg = (sentence: ISentence): IPerform => {

  const stageStore = StageStore();
  const oldBgName = stageStore.stageState.bgName;
  stageStore.stageState.oldBgName = oldBgName
  stageStore.stageState.bgName = sentence.content
  // const performInitName: string = getRandomPerformName();
  return {
    performName: 'none',
    duration: 1000,
    isOver: false,
    isHoldOn: false,
    stopFunction: () => {
      // const bgContainer = document.getElementById('MainStage_bg_MainContainer');
      // if (bgContainer) bgContainer.className = styles.MainStage_bgContainer;
      const BgContainer = document.getElementById('MainStage_bg_MainContainer');
      if (BgContainer) {
        BgContainer.className = 'MainStage_bgContainer_Settled';
      }
    },
    blockingNext: () => false,
    blockingAuto: () => true,
    stopTimeout: undefined, // 暂时不用，后面会交给自动清除
  };
};
