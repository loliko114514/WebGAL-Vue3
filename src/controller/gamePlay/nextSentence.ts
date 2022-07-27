import { cloneDeep } from "lodash";
import { IRunPerform } from "../../interface/coreInterface/performInterface";
import { ControllerStore } from "../../store/ControllerStore";
import { GuiStore } from "../../store/GuiStore";
import { StageStore } from "../../store/StageStore";
import { infoFetcher } from "../../util/coreInitialFunction/infoFetcher"
import { scriptExecutor } from "./scriptExecutor";

/**
 * 进行下一句
 */
 export const nextSentence = () => {

  const guiStore = GuiStore()
  const controllerStore = ControllerStore()
  const stageStore = StageStore()
    // 如果当前显示标题，那么不进行下一句
  if (guiStore.guiState.showTitle) {
    return;
  }

  // 第一步，检查是否存在 blockNext 的演出
  let isBlockingNext = false;
  controllerStore.runtime_gamePlay.performList.forEach((e) => {
    if (e.blockingNext() && !e.isOver)
      // 阻塞且没有结束的演出
      isBlockingNext = true;
  });
  if (isBlockingNext) {
    // 有阻塞，提前结束
    console.log('next 被阻塞！');
    return;
  }

  // 检查是否处于演出完成状态，不是则结束所有普通演出（保持演出不算做普通演出）
  let allSettled = true;
  controllerStore.runtime_gamePlay.performList.forEach((e) => {
    if (!e.isHoldOn) allSettled = false;
  });
  if (allSettled) {
    // 所有普通演出已经结束
    // 清除状态表的演出序列（因为这时候已经准备进行下一句了）
    const stageState = stageStore.stageState
    const newStageState = cloneDeep(stageState);
    for (let i = 0; i < newStageState.PerformList.length; i++) {
      const e: IRunPerform = newStageState.PerformList[i];
      if (!e.isHoldOn) {
        newStageState.PerformList.splice(i, 1);
        i--;
      }
    }
    stageStore.stageState = newStageState
    scriptExecutor();
    return;
  }

  // 不处于 allSettled 状态，清除所有普通演出，强制进入settled。
  console.log('提前结束被触发，现在清除普通演出');
  let isGoNext = false;
  for (let i = 0; i < controllerStore.runtime_gamePlay.performList.length; i++) {
    const e = controllerStore.runtime_gamePlay.performList[i];
    if (!e.isHoldOn) {
      if (e.goNextWhenOver) {
        isGoNext = true;
      }
      e.stopFunction();
      clearTimeout(e.stopTimeout);
      controllerStore.runtime_gamePlay.performList.splice(i, 1);
      i--;
    }
  }
  if (isGoNext) {
    nextSentence();
  }
};
