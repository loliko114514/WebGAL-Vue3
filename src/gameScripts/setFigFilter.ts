import { cloneDeep } from "lodash";
import { IPerform } from "../interface/coreInterface/performInterface";
import { ISentence } from "../interface/coreInterface/sceneInterface";
import { IEffect } from "../interface/stateInterface/stageInterface";
import { StageStore } from "../store/StageStore";

/**
 * 设置立绘效果
 * @param sentence
 */
 export const setFigFilter = (sentence: ISentence): IPerform => {
  const stageStore = StageStore()
  const effectList: Array<IEffect> = stageStore.stageState.effects;
  const newEffectList = cloneDeep(effectList);
  let target = 'figCenterContainer';
  sentence.args.forEach(e => {
    if (e.key === 'left' && e.value) {
      target = 'figLeftContainer';
    }
    if (e.key === 'right' && e.value) {
      target = 'figRightContainer';
    }
  });
  let isTargetSet = false;
  newEffectList.forEach((e) => {
    if (e.target === target) {
      console.log('已存在效果，正在修改');
      isTargetSet = true;
      e.filter = sentence.content;
    }
  });
  if (!isTargetSet) {
    newEffectList.push({
      target: target,
      transform: '',
      filter: sentence.content
    });
  }
  stageStore.stageState.effects = newEffectList
  // stageStore.setStage('bgFilter', sentence.content);
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