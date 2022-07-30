import { IPerform } from "../interface/coreInterface/performInterface";
import { ISentence } from "../interface/coreInterface/sceneInterface";
import { ControllerStore } from "../store/ControllerStore";
import { GuiStore } from "../store/GuiStore";

export const intro = (sentence: ISentence): IPerform => {
  const guiStore = GuiStore()
  guiStore.guiState.showIntro = true
  console.log("intro",sentence.content)
  const introArray: Array<string> = sentence.content.split(/\|/);
  console.log("intro",introArray)
  const controllerStore = ControllerStore()
  controllerStore.introArray = introArray
  return {
    performName: 'introPerform',
    duration: 1000 + 1500 * introArray.length,
    isOver: false,
    isHoldOn: false,
    stopFunction: () => {
      const guiStore = GuiStore()
      if(guiStore.guiState.showIntro){
        guiStore.guiState.showIntro = false
      }
    },
    blockingNext: () => false,
    blockingAuto: () => true,
    stopTimeout: undefined, // 暂时不用，后面会交给自动清除
    goNextWhenOver:true
  };
};