import { IPerform } from "../interface/coreInterface/performInterface";
import { ISentence } from "../interface/coreInterface/sceneInterface";
import { StageStore } from "../store/StageStore";

/**
 * 语句执行的模板代码
 * @param sentence
 */
 export const filmMode = (sentence: ISentence): IPerform => {
  const stageStore = StageStore()
  console.log("电影模式")
  if (sentence.content !== '' && sentence.content !== 'none') {
    stageStore.stageState.enableFilm = sentence.content
  } else {
    stageStore.stageState.enableFilm = ''
  }
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
