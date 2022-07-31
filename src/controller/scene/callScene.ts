import { ControllerStore } from "../../store/ControllerStore";
import { sceneFetcher } from "../../util/sceneFetcher";
import { nextSentence } from "../gamePlay/nextSentence";
import { sceneParser } from "../../util/parser/sceneParser"
/**
 * 调用场景
 * @param sceneUrl 场景路径
 * @param sceneName 场景名称
 */
 export const callScene = (sceneUrl: string, sceneName: string) => {
  // 先将本场景压入场景栈
  const controllerStore = ControllerStore()
  controllerStore.runtime_currentSceneData.sceneStack.push({
    sceneName: controllerStore.runtime_currentSceneData.currentScene.sceneName,
    sceneUrl: controllerStore.runtime_currentSceneData.currentScene.sceneUrl,
    continueLine: controllerStore.runtime_currentSceneData.currentSentenceId,
  });
  // 场景写入到运行时
  sceneFetcher(sceneUrl).then((rawScene) => {
    controllerStore.runtime_currentSceneData.currentScene = sceneParser(rawScene, sceneName, sceneUrl);
    controllerStore.runtime_currentSceneData.currentSentenceId = 0;
    console.log('现在调用场景，调用结果：', controllerStore.runtime_currentSceneData);
    nextSentence();
  });
};
