import localforage from "localforage";
import { IPerform } from "../interface/coreInterface/performInterface";
import { ISentence } from "../interface/coreInterface/sceneInterface";
import { ControllerStore } from "../store/ControllerStore";
import { UserDataStore } from "../store/UserDataStore";

/**
 * 解锁cg
 * @param sentence
 */
 export const unlockCg = (sentence: ISentence): IPerform => {
  const userDataStore = UserDataStore()
  const controllerStore = ControllerStore()
  const url = sentence.content;
  let name = sentence.content;
  let series = 'default';
  sentence.args.forEach(e => {
    if (e.key === 'name') {
      name = e.value.toString();
    }
    if (e.key === 'series') {
      series = e.value.toString();
    }
  });
  console.log(`解锁CG：${name}，路径：${url}，所属系列：${series}`);
  userDataStore.unlockCgInUserData(name, url, series)
  // localforage.setItem(controllerStore.gameInfo.gameKey, userDataStore.userDataState).then(() => {});
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
