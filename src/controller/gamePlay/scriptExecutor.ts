import { cloneDeep } from "lodash";
import { IBacklogItem, sceneEntry } from "../../interface/coreInterface/runtimeInterface";
import { commandType, ISentence } from "../../interface/coreInterface/sceneInterface";
import { IStageState } from "../../interface/stateInterface/stageInterface";
import { ControllerStore } from "../../store/ControllerStore";
import { StageStore } from "../../store/StageStore";
import { nextSentence } from "./nextSentence";
import { runScript } from "./runScript";

/**
 * 语句执行器
 * 执行语句，同步场景状态，并根据情况立即执行下一句或者加入backlog
 */
export const scriptExecutor = ()=>{
  const controllerStore = ControllerStore()
// 超过总语句数量，则从场景栈拿出一个需要继续的场景，然后继续流程。若场景栈清空，则停止流程
if (controllerStore.runtime_currentSceneData.currentSentenceId > controllerStore.runtime_currentSceneData.currentScene.sentenceList.length - 1) {
  if (controllerStore.runtime_currentSceneData.sceneStack.length !== 0) {
    const sceneToRestore: sceneEntry | undefined = controllerStore.runtime_currentSceneData.sceneStack.pop();
    if (sceneToRestore !== undefined) {
      restoreScene(sceneToRestore);
    }
  }
  return;
}
const currentScript: ISentence =
controllerStore.runtime_currentSceneData.currentScene.sentenceList[controllerStore.runtime_currentSceneData.currentSentenceId];
// 判断这个脚本要不要执行
let runThis = true;
let isHasWhenArg = false;
let whenValue = '';
currentScript.args.forEach(e => {
  if (e.key === 'when') {
    isHasWhenArg = true;
    whenValue = e.value.toString();
  }
});
// 如果语句有 when
// if (isHasWhenArg) {
//   // 先把变量解析出来
//   const valExpArr = whenValue.split(/([+\-*\/()><=!]|>=|<=)/g);
//   const valExp = valExpArr.map(e => {
//     if (e.match(/[a-zA-Z]/)) {
//       if (e.match(/true/) || e.match(/false/)) {
//         return e;
//       }
//       return getValueFromState(e).toString();
//     } else return e;
//   }).reduce((pre, curr) => pre + curr, '');
//   runThis = strIf(valExp);
// }
// 执行语句
if (!runThis) {
  controllerStore.runtime_currentSceneData.currentSentenceId++;
  nextSentence();
  return;
}
runScript(currentScript);
let isNext = false; // 是否要进行下一句
currentScript.args.forEach((e) => {
  // 判断是否有下一句的参数
  if (e.key === 'next' && e.value) {
    isNext = true;
  }
});

let isSaveBacklog = currentScript.command === commandType.say; // 是否在本句保存backlog（一般遇到对话保存）
// 检查当前对话是否有 notend 参数
currentScript.args.forEach(e => {
  if (e.key === 'notend' && e.value === true) {
    isSaveBacklog = false;
  }
});
let currentStageState: IStageState;

// 执行至指定 sentenceID
// if (runToSentence >= 0 && runtime_currentSceneData.currentSentenceId < runToSentence) {
//   runtime_currentSceneData.currentSentenceId++;
//   scriptExecutor(runToSentence);
//   return;
// }

// 执行“下一句”
if (isNext) {
  controllerStore.runtime_currentSceneData.currentSentenceId++;
  scriptExecutor();
  return;
}

/**
 * 为了让 backlog 拿到连续执行了多条语句后正确的数据，放到下一个宏任务中执行（我也不知道为什么这样能正常，有能力的可以研究一下
 */
setTimeout(() => {
  // 同步当前舞台数据
  currentStageState = StageStore().stageState
  console.log('本条语句执行结果', currentStageState);
  // 保存 backlog
  if (isSaveBacklog) {
    const newStageState = cloneDeep(currentStageState);
    newStageState.PerformList.forEach(ele => {
      ele.script.args.forEach(argelement => {
        if (argelement.key === 'concat') {
          argelement.value = false;
          ele.script.content = newStageState.showText;
        }
      });
    });
    const backlogElement: IBacklogItem = {
      currentStageState: newStageState,
      saveScene: {
        currentSentenceId: controllerStore.runtime_currentSceneData.currentSentenceId,// 当前语句ID
        sceneStack: cloneDeep(controllerStore.runtime_currentSceneData.sceneStack), // 场景栈
        sceneName: controllerStore.runtime_currentSceneData.currentScene.sceneName, // 场景名称
        sceneUrl: controllerStore.runtime_currentSceneData.currentScene.sceneUrl, // 场景url
      }
    };
    controllerStore.runtime_currentBacklog.push(backlogElement);
  }
}, 0);
controllerStore.runtime_currentSceneData.currentSentenceId++;
}

function restoreScene(sceneToRestore: sceneEntry) {
  throw new Error("Function not implemented.");
}
