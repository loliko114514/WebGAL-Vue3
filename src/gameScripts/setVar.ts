import { compile } from "angular-expressions";
import { IPerform } from "../interface/coreInterface/performInterface";
import { ISentence } from "../interface/coreInterface/sceneInterface";
import { StageStore } from "../store/StageStore";

/**
 * 设置变量
 * @param sentence
 */
 export const setVar = (sentence: ISentence): IPerform => {
  // 先把表达式拆分为变量名和赋值语句
  if (sentence.content.match(/=/)) {
    const stageStore = StageStore()
    const key = sentence.content.split(/=/)[0];
    const valExp = sentence.content.split(/=/)[1];
    console.log(valExp)
    // 如果包含加减乘除号，则运算
    if (valExp.match(/[+\-*\/()]/)) {
      // 先取出运算表达式中的变量
      const valExpArr = valExp.split(/([+\-*\/()])/g); 
      // 将变量替换为变量的值，然后合成表达式字符串
      const valExp2 = valExpArr.map(e => {
        if (e.match(/[a-zA-Z]/)) {
          return getValueFromState(e).toString();
        } else return e;
      }).reduce((pre, curr) => pre + curr, '');
      const exp = compile(valExp2);
      const result = exp();
      stageStore.setStageVar(key,result as string)
    } else if (valExp.match(/true|false/)) {
      if (valExp.match(/true/)) {
        stageStore.setStageVar(key,true)
      }
      if (valExp.match(/false/)) {
        stageStore.setStageVar(key,false)
      }
    } else {
      if (!isNaN(Number(valExp))) {
        stageStore.setStageVar(key,Number(valExp))
        console.log('Number',valExp)
      } else{
        stageStore.setStageVar(key,valExp)
        console.log('string',valExp)
      }
    }
    console.log('设置变量：',stageStore.stageState.GameVar[key]);
  }
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

export function getValueFromState(key: string) {
  const stageStore = StageStore()
  let ret: number | string | boolean = 0;
  if (stageStore.stageState.GameVar.hasOwnProperty(key)) {
    ret = stageStore.stageState.GameVar[key];
  }
  return ret;
}
