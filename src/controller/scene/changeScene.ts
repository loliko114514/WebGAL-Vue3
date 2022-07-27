import { ControllerStore } from "../../store/ControllerStore";
import { sceneFetcher } from "../../util/sceneFetcher";
import { nextSentence } from "../gamePlay/nextSentence";
import { sceneParser } from "../../util/parser/sceneParser"

/**
 * 切换场景
 * @param sceneUrl 场景路径
 * @param sceneName 场景名称
 */
 export const changeScene = (sceneUrl: string, sceneName: string) => {
  // 场景写入到运行时
  const controllerStore = ControllerStore()
  sceneFetcher(sceneUrl).then((rawScene) => {
    controllerStore.runtime_currentSceneData.currentScene = sceneParser(rawScene, sceneName, sceneUrl);
    controllerStore.runtime_currentSceneData.currentSentenceId = 0;
    console.log('现在切换场景，切换后的结果：', controllerStore.runtime_currentSceneData);
    nextSentence();
  });
};
