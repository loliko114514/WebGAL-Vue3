import { IPerform } from "../interface/coreInterface/performInterface";
import { ISentence } from "../interface/coreInterface/sceneInterface";
import { ControllerStore } from "../store/ControllerStore";
import { GuiStore } from "../store/GuiStore";

/**
 * 显示选择枝
 * @param sentence
 */
 export const choose = (sentence: ISentence): IPerform => {
  let chooseList = sentence.content.split('|');
  const chooseListFull = chooseList.map(e => e.split(':'));
  const controllerStore = ControllerStore()
  controllerStore.chooselist = chooseListFull
  const guistore = GuiStore()
  guistore.guiState.showChoose = true
  // const chooseElements = chooseListFull.map((e, i) => {
  //   return <div className={styles.Choose_item} key={e[0] + i} onClick={() => {
  //     if (e[1].match(/\./)) {
  //       changeScene(e[1], e[0]);
  //     } else {
  //       jmp(e[1]);
  //     }
  //     unmountPerform('choose');
  //   }
  //   }>
  //     {e[0]}
  //   </div>;
  // });
  // ReactDOM.render(
  //   <div className={styles.Choose_Main}>{chooseElements}</div>
  //   , document.getElementById('chooseContainer'));
  return {
    performName: 'choose',
    duration: 1000 * 60 * 60 * 24,
    isOver: false,
    isHoldOn: false,
    stopFunction: () => {
    },
    blockingNext: () => true,
    blockingAuto: () => true,
    stopTimeout: undefined, // 暂时不用，后面会交给自动清除
  };
};
