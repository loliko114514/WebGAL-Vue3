import { IBacklogItem } from "../../interface/coreInterface/runtimeInterface";
import { ControllerStore } from "../../store/ControllerStore";
import { StageStore } from "../../store/StageStore";
import { sceneFetcher } from "../../util/sceneFetcher";
import { runScript } from "../gamePlay/runScript";
import { sceneParser } from "../../util/parser/sceneParser";
import { cloneDeep } from "lodash";
import { stopAllPerform } from "../scene/restoreScene";
import { IStageState } from "../../interface/stateInterface/stageInterface";
import { GuiStore } from "../../store/GuiStore";
/**
 * 恢复演出
 */
 export const restorePerform = () => {
  const stageStore = StageStore()
  stageStore.stageState.PerformList.forEach(e => {
    runScript(e.script);
  });
};


/**
 * 从 backlog 跳转至一个先前的状态
 * @param index
 */
export const jumpFromBacklog = (index: number) => {
  const controllerStore = ControllerStore()
  const stageStore = StageStore()
  // 获得存档文件
  const backlogFile: IBacklogItem = controllerStore.runtime_currentBacklog[index];
  console.log('读取的backlog数据', backlogFile);
  // 重新获取并同步场景状态
  sceneFetcher(backlogFile.saveScene.sceneUrl).then((rawScene) => {
    controllerStore.runtime_currentSceneData.currentScene = sceneParser(
      rawScene,
      backlogFile.saveScene.sceneName,
      backlogFile.saveScene.sceneUrl,
    );
  });
  controllerStore.runtime_currentSceneData.currentSentenceId = backlogFile.saveScene.currentSentenceId;
  controllerStore.runtime_currentSceneData.sceneStack = cloneDeep(backlogFile.saveScene.sceneStack);

  // 强制停止所有演出
  stopAllPerform();

  // 弹出backlog项目到指定状态
  for (let i = controllerStore.runtime_currentBacklog.length - 1; i > index; i--) {
    controllerStore.runtime_currentBacklog.pop();
  }

  // 恢复舞台状态
  const newStageState: IStageState = cloneDeep(backlogFile.currentStageState);
  stageStore.resetStageState(newStageState)

  // 恢复演出
  restorePerform();

  const guiStore = GuiStore()
  // 关闭backlog界面
  guiStore.guiState.showBacklog = false
  guiStore.guiState.showChoose = false
  guiStore.guiState.showTextBox = true
}
