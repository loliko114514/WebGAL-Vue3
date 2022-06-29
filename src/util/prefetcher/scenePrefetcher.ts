/**
 * 场景预加载
 * @param sceneList 需要预加载的场景文件列表
 */
 import { sceneFetcher } from '../sceneFetcher';
 import { sceneParser } from '../parser/scenParser'; 
 import { ControllerStore } from '../../store/ControllerStore'; 
 
 export const scenePrefetcher = (sceneList: Array<string>): void => {
   // TODO: 实现场景预加载（主要是解析出子场景的资源，并预加载）
   const settledScene = ControllerStore().settledScene
   for (const e of sceneList) {
     if (!settledScene.includes(e)) {  
       sceneFetcher(e).then((r) => {
         sceneParser(r, e, e);
       });
     }else{
       console.log(`场景${e}已经加载过，无需再次加载`);
     }
   }
 };
 