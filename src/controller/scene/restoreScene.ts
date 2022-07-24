import { ControllerStore } from "../../store/ControllerStore";

export const stopAllPerform = ()=>{
 console.log('清除所有演出');
 const controllerStore = ControllerStore()
  for (let i = 0; i < controllerStore.runtime_gamePlay.performList.length; i++) {
    const e = controllerStore.runtime_gamePlay.performList[i];
    e.stopFunction();
    clearTimeout(e.stopTimeout);
    controllerStore.runtime_gamePlay.performList.splice(i, 1);
    i--;
  }
};
