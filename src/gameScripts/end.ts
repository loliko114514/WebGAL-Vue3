import { resetStage } from "../controller/stage/resetStage";
import { IPerform } from "../interface/coreInterface/performInterface";
import { fileType, ISentence } from "../interface/coreInterface/sceneInterface";
import { ControllerStore } from "../store/ControllerStore";
import { GuiStore } from "../store/GuiStore";
import { assetSetter } from "../util/assetSetter";
import { sceneFetcher } from "../util/sceneFetcher";
import { sceneParser } from "../util/parser/sceneParser"
/**
 * 结束游戏
 * @param sentence
 */
 export const end = (sentence: ISentence): IPerform => {
  resetStage(true);
  // 重新获取初始场景
  const controllerStore = ControllerStore()
  const guiStore = GuiStore()
  const sceneUrl: string = assetSetter('start.txt', fileType.scene);
  // 场景写入到运行时
  sceneFetcher(sceneUrl).then((rawScene) => {
    controllerStore.runtime_currentSceneData.currentScene = sceneParser(rawScene, 'start.txt', sceneUrl);
  });
  guiStore.guiState.showTitle = true
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