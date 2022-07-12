import { ControllerStore } from "../../store/ControllerStore";
import { UserDataStore } from "../../store/UserDataStore";
import { stopAuto } from "./autoPlay";

const controllerStore=ControllerStore()
/**
 * 停止快进模式
 */
export const stopFast = () => {
  if (!isFast()) {
    return;
  }
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
  controllerStore.runtime_gamePlay.isFast = true;
  // setButton(true);
  controllerStore.runtime_gamePlay.fastInterval = setInterval(() => {
    controllerStore.nextSentence();
  }, 100);
};

// 判断是否是快进模式
export const isFast = function () {
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