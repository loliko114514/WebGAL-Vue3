import { ControllerStore } from "../../store/ControllerStore";


/**
 * 卸载演出
 * @param name 演出的名称
 */
export const unmountPerform = (name: string) => {
  const controllerStore = ControllerStore()
  for (let i = 0; i < controllerStore.runtime_gamePlay.performList.length; i++) {
    const e = controllerStore.runtime_gamePlay.performList[i];
    if (!e.isHoldOn && e.performName === name) {
      e.stopFunction();
      clearTimeout(e.stopTimeout);
      controllerStore.runtime_gamePlay.performList.splice(i, 1);
      i--;
    }
  }
};
