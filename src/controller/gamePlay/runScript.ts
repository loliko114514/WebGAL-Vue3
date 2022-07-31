import { say } from "../../gameScripts/say";
import { scriptConfig } from "../../gameScripts/config/scriptConfig";
import { initPerform, IPerform } from "../../interface/coreInterface/performInterface";
import { ISentence } from "../../interface/coreInterface/sceneInterface";
import { StageStore } from "../../store/StageStore";
import { cloneDeep } from "lodash"
import { storeToRefs } from "pinia";
import { ControllerStore } from "../../store/ControllerStore";
import { unmountPerform } from "../perform/unmountPerform";
import { nextSentence } from "./nextSentence";

/**
 * 规范函数的类型
 * @type {(sentence: ISentence) => IPerform}
 */
 export const runScript = (script: ISentence)=>{
  type scriptFunction = (sentence: ISentence) => IPerform
  let perform: IPerform = initPerform;
  let funcToRun: scriptFunction = say; // 默认是say

  // 建立语句类型到执行函数的映射
  const scriptToFuncMap = new Map();
  scriptConfig.forEach(e => {
    scriptToFuncMap.set(e.scriptType, e.scriptFunction);
  });

  // 根据脚本类型切换函数
  if (scriptToFuncMap.has(script.command)) {
    funcToRun = scriptToFuncMap.get(script.command) as scriptFunction;
    console.log('script.command',script.command)
  }

  // 调用脚本对应的函数
  perform = funcToRun(script);

  // 语句不执行演出
  if (perform.performName === 'none') {
    return;
  }

  // 同步演出状态
  const stageStore = StageStore()
  const stageState = stageStore.stageState
  const newStageState = cloneDeep(stageState);
  newStageState.PerformList.push({isHoldOn: perform.isHoldOn, script: script});
  stageStore.resetStageState(newStageState)

  // 时间到后自动清理演出
  perform.stopTimeout = setTimeout(() => {
    // perform.stopFunction();
    perform.isOver = true;
    if (!perform.isHoldOn) {
      // 如果不是保持演出，清除
      unmountPerform(perform.performName);
      if (perform.goNextWhenOver) {
        // nextSentence();
        goNextWhenOver();
      }
    }
  }, perform.duration);
  const controllerStore = ControllerStore()
  controllerStore.runtime_gamePlay.performList.push(perform);
}

function goNextWhenOver() {
  const controllerStore = ControllerStore()
  let isBlockingAuto = false;
  controllerStore.runtime_gamePlay.performList.forEach((e) => {
    if (e.blockingAuto() && !e.isOver)
      // 阻塞且没有结束的演出
      isBlockingAuto = true;
  });
  if (isBlockingAuto) {
    // 有阻塞，提前结束
    setTimeout(goNextWhenOver, 100);
  } else {
    nextSentence();
  }
}
