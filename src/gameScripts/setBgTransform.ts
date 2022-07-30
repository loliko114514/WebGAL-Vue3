import { cloneDeep } from "lodash";
import { IPerform } from "../interface/coreInterface/performInterface";
import { ISentence } from "../interface/coreInterface/sceneInterface";
import { IEffect } from "../interface/stateInterface/stageInterface";
import { StageStore } from "../store/StageStore";

/**
 * 设置背景变换
 * @param sentence
 */
 export const setBgTransform = (sentence: ISentence): IPerform => {
  const stageStore = StageStore()
  const effectList: Array<IEffect> = stageStore.stageState.effects;
  const newEffectList = cloneDeep(effectList);
  let isTargetSet = false;
  newEffectList.forEach((e) => {
    if (e.target === 'MainStage_bg_MainContainer') {
      isTargetSet = true;
      e.transform = sentence.content;
    }
  });
  if (!isTargetSet) {
    newEffectList.push({
      target: 'MainStage_bg_MainContainer',
      transform: sentence.content,
      filter: ''
    });
  }
  stageStore.stageState.effects = newEffectList;
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
