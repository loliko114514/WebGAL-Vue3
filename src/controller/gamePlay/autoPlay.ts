import { ControllerStore } from "../../store/ControllerStore";
import { UserDataStore } from "../../store/UserDataStore";
import { nextSentence } from "./nextSentence";



/**
 * 停止自动播放
 */
 export const stopAuto = () => {
  const controllerStore=ControllerStore()
  controllerStore.runtime_gamePlay.isAuto = false;
  // setButton(false);
  if (controllerStore.runtime_gamePlay.autoInterval !== null) {
    clearInterval(controllerStore.runtime_gamePlay.autoInterval);
    controllerStore.runtime_gamePlay.autoInterval = null;
  }
  if (controllerStore.runtime_gamePlay.autoTimeout !== null) {
    clearTimeout(controllerStore.runtime_gamePlay.autoTimeout);
    controllerStore.runtime_gamePlay.autoTimeout = null;
  }
};

/**
 * 切换自动播放状态
 */
export const switchAuto = () => {
  // 现在正在自动播放
  const controllerStore=ControllerStore()
  if (controllerStore.runtime_gamePlay.isAuto) {
    controllerStore.runtime_gamePlay.isAuto = false;
    // setButton(false);
    if (controllerStore.runtime_gamePlay.autoInterval !== null) {
      clearInterval(controllerStore.runtime_gamePlay.autoInterval);
      controllerStore.runtime_gamePlay.autoInterval = null;
    }
  } else {
    // 当前不在自动播放
    controllerStore.runtime_gamePlay.isAuto = true;
    // setButton(true);
    controllerStore.runtime_gamePlay.autoInterval = setInterval(autoPlay, 100);
  }
};

export const autoNextSentence = () => {
  const controllerStore=ControllerStore()
  nextSentence();
  controllerStore.runtime_gamePlay.autoTimeout = null;
};

/**
 * 自动播放的执行函数
 */
const autoPlay = () => {
  const controllerStore=ControllerStore()
  const userDataState = UserDataStore().userDataState
  const delay = userDataState.optionData.autoSpeed;
  const autoPlayDelay = 750 - 250 * delay;
  let isBlockingAuto = false;
  controllerStore.runtime_gamePlay.performList.forEach((e) => {
    if (e.blockingAuto() && !e.isOver)
      // 阻塞且没有结束的演出
      isBlockingAuto = true;
  });
  if (isBlockingAuto) {
    // 有阻塞，提前结束
    return;
  }
  // nextSentence();
  if (controllerStore.runtime_gamePlay.autoTimeout === null) {
    controllerStore.runtime_gamePlay.autoTimeout = setTimeout(autoNextSentence, autoPlayDelay);
  }
};
