import { fileType } from "../interface/coreInterface/sceneInterface";
import { ControllerStore } from "../store/ControllerStore";
import { assetSetter } from "../util/assetSetter";
import { infoFetcher } from "../util/coreInitialFunction/infoFetcher";
import { sceneParser } from "../util/parser/sceneParser";
import { sceneFetcher } from "../util/sceneFetcher";
import { pixiController } from "./perform/pixi/pixiController";

/**
 * 引擎初始化函数
 */
 export const initializeScript = (): void => {
  // // 打印初始log信息
  // logger.info('WebGAL 4.2.7');
  // logger.info('Github: https://github.com/MakinoharaShoko/WebGAL ');
  // logger.info('Made with ❤ by MakinoharaShoko');


  // 获得 userAnimation
  // loadStyle('./game/userAnimation.css');
  // 获取游戏信息
  infoFetcher('./game/config.txt');
  // 获取start场景
  const sceneUrl: string = assetSetter('start.txt', fileType.scene);
  // 场景写入到运行时
  const controllerStore = ControllerStore()
  sceneFetcher(sceneUrl).then((rawScene) => {
    controllerStore.runtime_currentSceneData.currentScene = sceneParser(rawScene, 'start.txt', sceneUrl);
  });
  /**
   * 设置音量
   */
  // setVolume();
  /**
   * 启动Pixi
   */
  pixiController(true);

  /**
   * 如果有 Service Worker ，则卸载所有 Service Worker
   */
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister().then(() => {
          console.log('已卸载 Service Worker');
        });
      }
    });
  }

  /**
   * 绑定工具函数
   */
  // bindExtraFunc();
  // webSocketFunc();
};

function loadStyle(url: string) {
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url;
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(link);
}


