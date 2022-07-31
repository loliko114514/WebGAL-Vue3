import { getRandomPerformName } from "../controller/perform/getRandomPerformName";
import { IPerform } from "../interface/coreInterface/performInterface";
import { ISentence } from "../interface/coreInterface/sceneInterface";
import { ControllerStore } from "../store/ControllerStore";
import { StageStore } from "../store/StageStore";
import { UserDataStore } from "../store/UserDataStore";

/**
 * 进行普通对话的显示
 * @param sentence 语句
 * @return {IPerform} 执行的演出
 */
 export const showVars = (sentence: ISentence): IPerform => {
  const stageStore = StageStore()
  const userDataStore = UserDataStore()
  const controllerStore = ControllerStore()
  // 设置文本显示
  stageStore.stageState.showText = JSON.stringify(stageStore.stageState.GameVar).replace(/[\\r]/g,'')
  stageStore.stageState.showName = '展示变量'
  console.log('展示变量：', stageStore.stageState.GameVar);
  setTimeout(() => {
    const textElements = document.querySelectorAll('.TextBox_textElement_start');
    const textArray = [...textElements];
    textArray.forEach((e) => {
      e.className = 'TextBox_textElement';
    });
  }, 0);
  const performInitName: string = getRandomPerformName();
  const textDelay = controllerStore.textInitialDelay - 20 * userDataStore.userDataState.optionData.textSpeed;
  const endDelay = 750 - userDataStore.userDataState.optionData.textSpeed * 250;
  return {
    performName: performInitName,
    duration: sentence.content.length * textDelay + endDelay,
    isOver: false,
    isHoldOn: false,
    stopFunction: () => {
      const textElements = document.querySelectorAll('.TextBox_textElement_start');
      const textArray = [...textElements];
      textArray.forEach((e) => {
        e.className = 'TextBox_textElement';
      });
    },
    blockingNext: () => false,
    blockingAuto: () => true,
    stopTimeout: undefined, // 暂时不用，后面会交给自动清除
  };
};