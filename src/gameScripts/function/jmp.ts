import { nextSentence } from "../../controller/gamePlay/nextSentence";
import { commandType } from "../../interface/coreInterface/sceneInterface";
import { ControllerStore } from "../../store/ControllerStore";

export const jmp = (labelName: string) => {
  // 在当前场景中找到指定的标签。
  const controllerStore = ControllerStore()
  const currentLine = controllerStore.runtime_currentSceneData.currentSentenceId;
  let result = currentLine;
  controllerStore.runtime_currentSceneData.currentScene.sentenceList.forEach((sentence, index) => {
    if (sentence.command === commandType.label && sentence.content === labelName && index >= currentLine) {
      result = index;
    }
  });
  controllerStore.runtime_currentSceneData.currentSentenceId = result;
  setTimeout(nextSentence, 1);
};
