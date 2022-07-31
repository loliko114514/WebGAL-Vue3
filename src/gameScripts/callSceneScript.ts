import { callScene } from "../controller/scene/callScene";
import { IPerform } from "../interface/coreInterface/performInterface";
import { ISentence } from "../interface/coreInterface/sceneInterface";

/**
 * 调用一个场景，在场景结束后回到调用这个场景的父场景。
 * @param sentence
 */
 export const callSceneScript = (sentence: ISentence): IPerform => {
  const sceneNameArray: Array<string> = sentence.content.split('/');
  const sceneName = sceneNameArray[sceneNameArray.length - 1];
  callScene(sentence.content, sceneName);
  return {
    performName: 'none',
    duration: 0,
    isOver: false,
    isHoldOn: true,
    stopFunction: () => {},
    blockingNext: () => false,
    blockingAuto: () => true,
    stopTimeout: undefined, // 暂时不用，后面会交给自动清除
  };
};
