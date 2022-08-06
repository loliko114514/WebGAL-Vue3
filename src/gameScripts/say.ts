import { getRandomPerformName } from "../controller/perform/getRandomPerformName";
import { IPerform } from "../interface/coreInterface/performInterface";
import { ISentence } from "../interface/coreInterface/sceneInterface";
import { ControllerStore } from "../store/ControllerStore";
import { StageStore } from "../store/StageStore";
import { UserDataStore } from "../store/UserDataStore";
import { playVocal } from "./playVocal";

export const say = (sentence: ISentence): IPerform => {
  const stageStore = StageStore()
  const userDataStore = UserDataStore()
  const controllerStore = ControllerStore()
  let dialogToShow = sentence.content;
  let dialogKey = Math.random().toString();
  // 是否是继承语句
  let isConcat = false;
  // 是否有 notend 参数
  let isNotend = false;
  // 如果是concat，那么就继承上一句的key，并且继承上一句对话。
  sentence.args.forEach(e => {
    if (e.key === 'concat' && e.value === true) {
      dialogKey = stageStore.stageState.currentDialogKey;
      dialogToShow = stageStore.stageState.showText + dialogToShow;
      isConcat = true;
    }
    if (e.key === 'notend' && e.value === true) {
      isNotend = true;
    }
  });
  if (isConcat) {
    stageStore.stageState.currentConcatDialogPrev = stageStore.stageState.showText
  } else {
    stageStore.stageState.currentConcatDialogPrev = ''
  }
  // 设置文本显示
  stageStore.stageState.showText = dialogToShow
  // 清除语音
  stageStore.stageState.vocal = ''
  // 设置key
  stageStore.stageState.currentDialogKey = dialogKey
  // 计算延迟
  const textDelay = controllerStore.textInitialDelay - 20 * userDataStore.userDataState.optionData.textSpeed;
  // 本句延迟
  const sentenceDelay = textDelay * sentence.content.length;
  // // 设置延迟
  // if (isNotend) {
  //   dispatch(setStage({key: 'currentPerformDelay', value: sentenceDelay}));
  // } else {
  //   dispatch(setStage({key: 'currentPerformDelay', value: 0}));
  // }
  // 设置显示的角色名称
  let showName: string | number | boolean = stageStore.stageState.showName; // 先默认继承
  for (const e of sentence.args) {
    if (e.key === 'speaker') {
      showName = e.value;
    }
    if (e.key === 'clear' && e.value === true) {
      showName = '';
    }
    if (e.key === 'vocal') {
      playVocal(sentence);
    }
  }
  stageStore.stageState.showName = showName as string
  setTimeout(() => {
    const textElements = document.querySelectorAll('.TextBox_textElement_start');
    const textArray = [...textElements];
    textArray.forEach((e) => {
      e.className = 'TextBox_textElement';
    });
  }, 0);
  const performInitName: string = getRandomPerformName();
  let endDelay = 750 - userDataStore.userDataState.optionData.textSpeed * 250;
  if (isNotend) {
    endDelay = 0;
  }
  return {
    performName: performInitName,
    duration: sentenceDelay + endDelay,
    isOver: false,
    isHoldOn: false,
    stopFunction: () => {
      const textElements = document.querySelectorAll('.TextBox_textElement');
      const textArray = [...textElements];
      textArray.forEach((e) => {
        e.className = 'TextBox_textElement_Settled';
      })
    },
    blockingNext: () => false,
    blockingAuto: () => true,
    stopTimeout: undefined, // 暂时不用，后面会交给自动清除
    goNextWhenOver: isNotend,
  };
}