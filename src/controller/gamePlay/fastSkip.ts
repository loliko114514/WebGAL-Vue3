import { ControllerStore } from "../../store/ControllerStore";
import { UserDataStore } from "../../store/UserDataStore";
import { stopAuto } from "./autoPlay";
import { nextSentence } from "./nextSentence";


/**
 * 停止快进模式
 */
export const stopFast = () => {
  if (!isFast()) {
    return;
  }
  const controllerStore=ControllerStore()
  controllerStore.runtime_gamePlay.isFast = false;
  // setButton(false);
  if (controllerStore.runtime_gamePlay.fastInterval !== null) {
    clearInterval(controllerStore.runtime_gamePlay.fastInterval);
    controllerStore.runtime_gamePlay.fastInterval = null;
  }
};

/**
 * 开启快进
 */
export const startFast = () => {
  if (isFast()) {
    return;
  }
  const controllerStore=ControllerStore()
  controllerStore.runtime_gamePlay.isFast = true;
  // setButton(true);
  controllerStore.runtime_gamePlay.fastInterval = setInterval(() => {
    nextSentence();
  }, 100);
};

// 判断是否是快进模式
export const isFast = function () {
  const controllerStore=ControllerStore()
  return controllerStore.runtime_gamePlay.isFast;
};

/**
 * 停止快进模式与自动播放
 */
export const stopAll = () => {
  stopFast();
  stopAuto();
};

/**
 * 切换快进模式
 */
export const switchFast = () => {
  // 现在正在快进
  const controllerStore=ControllerStore()
  if (controllerStore.runtime_gamePlay.isFast) {
    stopFast();
  } else {
    // 当前不在快进
    startFast();
  }
};

export const testChange = () => {
  console.log("test")
  UserDataStore().userDataState.optionData.volumeMain=88
};