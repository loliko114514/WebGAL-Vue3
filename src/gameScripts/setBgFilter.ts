import { cloneDeep } from "lodash";
import { IPerform } from "../interface/coreInterface/performInterface";
import { ISentence } from "../interface/coreInterface/sceneInterface";
import { IEffect } from "../interface/stateInterface/stageInterface";
import { StageStore } from "../store/StageStore";

/**
 * 设置背景效果
 * @param sentence
 */
 export const setBgFilter = (sentence: ISentence): IPerform => {
  const stageStore = StageStore()
  const effectList: Array<IEffect> =stageStore.stageState.effects;
  const newEffectList = cloneDeep(effectList);
  let isTargetSet = false;
  newEffectList.forEach((e) => {
    if (e.target === 'MainStage_bg_MainContainer') {
      console.log('已存在效果，正在修改');
      isTargetSet = true;
      e.filter = sentence.content;
    }
  });
  if (!isTargetSet) {
    newEffectList.push({
      target: 'MainStage_bg_MainContainer',
      transform: '',
      filter: sentence.content
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
