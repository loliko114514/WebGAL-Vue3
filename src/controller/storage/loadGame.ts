import { ISaveData } from "../../interface/stateInterface/userDataInterface";
import { ControllerStore } from "../../store/ControllerStore";
import { UserDataStore } from "../../store/UserDataStore";
import { sceneFetcher } from "../../util/sceneFetcher";
import { sceneParser } from "../../util/parser/sceneParser"
import { cloneDeep } from "lodash";
import { stopAllPerform } from "../scene/restoreScene";
import { StageStore } from "../../store/StageStore";
import { GuiStore } from "../../store/GuiStore";
import { restorePerform } from "./jumpFromBacklog";

/**
 * 读取游戏存档
 * @param index 要读取的存档的档位
 */
 export const loadGame = (index: number) => {
  const userDataStore = UserDataStore()
  // 获得存档文件
  const loadFile: ISaveData = userDataStore.userDataState.saveData[index];
  console.log('读取的存档数据', loadFile);
  // 加载存档
  loadGameFromStageData(loadFile);
};

export function loadGameFromStageData(stageData: ISaveData) {
  const controllerStore = ControllerStore()
  const loadFile = stageData;
  // 重新获取并同步场景状态
  sceneFetcher(loadFile.sceneData.sceneUrl).then((rawScene) => {
    controllerStore.runtime_currentSceneData.currentScene = sceneParser(
      rawScene,
      loadFile.sceneData.sceneName,
      loadFile.sceneData.sceneUrl,
    );
  });
  controllerStore.runtime_currentSceneData.currentSentenceId = loadFile.sceneData.currentSentenceId;
  controllerStore.runtime_currentSceneData.sceneStack = cloneDeep(loadFile.sceneData.sceneStack);

  // 强制停止所有演出
  stopAllPerform();

  // 恢复backlog
  const newBacklog = loadFile.backlog;
  controllerStore.runtime_currentBacklog.splice(0, controllerStore.runtime_currentBacklog.length); // 清空原backlog
  for (const e of newBacklog) {
    controllerStore.runtime_currentBacklog.push(e);
  }

  // 恢复舞台状态
  const newStageState = cloneDeep(loadFile.nowStageState);
  const stageStore = StageStore()
  stageStore.resetStageState(newStageState)

  // 恢复演出
  const guiStore = GuiStore()
  guiStore.guiState.showTitle = false
  guiStore.guiState.showMenuPanel = false
  guiStore.guiState.showChoose = false
  restorePerform(); 
}
