import { IPerform } from "../interface/coreInterface/performInterface";
import { ISentence } from "../interface/coreInterface/sceneInterface";
import { StageStore } from "../store/StageStore";

/**
 * 显示小头像
 * @param sentence
 */
 export const miniAvatar = (sentence: ISentence): IPerform => {
  let content = sentence.content;
  if (sentence.content === 'none' || sentence.content === '') {
    content = '';
  }
  const stageStore= StageStore()
  stageStore.stageState.miniAvatar = content
  return {
    performName: 'none',
    duration: 0,
    isOver: false,
    isHoldOn: true,
    stopFunction: () => {
    },
    blockingNext: () => false,
    blockingAuto: () => true,
    stopTimeout: undefined, // 暂时不用，后面会交给自动清除
  };
};
