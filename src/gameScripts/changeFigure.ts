import { IPerform } from "../interface/coreInterface/performInterface";
import { ISentence } from "../interface/coreInterface/sceneInterface";
import { StageStore } from "../store/StageStore";

/**
 * 更改立绘
 * @param sentence 语句
 */
 export const changeFigure = (sentence: ISentence): IPerform => {
  // 根据参数设置指定位置
  let pos = 'center';
  let content = sentence.content;
  for (const e of sentence.args) {
    if (e.key === 'left' && e.value === true) {
      pos = 'left';
    }
    if (e.key === 'right' && e.value === true) {
      pos = 'right';
    }
    if (e.key === 'clear' && e.value === true) {
      content = '';
    }
    if (content === 'none') {
      content = '';
    }
  }
  const stageStore = StageStore()
  switch (pos) {
  case 'center':
    stageStore.stageState.figName = content;
    break;
  case 'left':
    stageStore.stageState.figNameLeft = content;
    break;
  case 'right':
    stageStore.stageState.figNameRight = content;
    break;
  }
  return {
    performName: 'none',
    duration: 0,
    isOver: false,
    isHoldOn: false,
    stopFunction: () => {
    },
    blockingNext: () => false,
    blockingAuto: () => false,
    stopTimeout: undefined, // 暂时不用，后面会交给自动清除
  };
};
