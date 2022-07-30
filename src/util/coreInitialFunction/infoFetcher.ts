import axios from "axios";
import { getStorage } from "../../controller/storage/storageController";
import { fileType } from "../../interface/coreInterface/sceneInterface";
import { ControllerStore } from "../../store/ControllerStore";
import { GuiStore } from "../../store/GuiStore";
import { assetSetter } from "../assetSetter";

declare global {
  interface Window {
      renderPromise?: Function;
  }
}

export const infoFetcher= (url:string) => {
  const guiStore = GuiStore()
  const controllerStore = ControllerStore()
  axios.get(url).then((r)=>{
    let gameConfigRaw: Array<string> = r.data.split('\n'); // 游戏配置原始数据
    gameConfigRaw = gameConfigRaw.map((e) => e.split(';')[0]);
    const gameConfig: Array<Array<string>> = gameConfigRaw.map((e) => e.split(':')); // 游戏配置数据
    console.log('获取到游戏信息', gameConfig);
    // 按照游戏的配置开始设置对应的状态
    if (guiStore.guiState) {
      gameConfig.forEach((e) => {
        // 设置标题背景
        if (e[0] === 'Title_img') {
          const url: string = assetSetter(e[1], fileType.background);
          guiStore.settitleBg(url)
        }
        // 设置标题背景音乐
        if (e[0] === 'Title_bgm') {
          const url: string = assetSetter(e[1], fileType.bgm);
          guiStore.settitleBgm(url)
        }
        if (e[0] === 'Game_name') {
          controllerStore.gameInfo.gameName = e[1];
          document.title = e[1];
        }
        if (e[0] === 'Game_key') {
          controllerStore.gameInfo.gameKey = e[1];
          getStorage();
        }
      });
    }
    window?.renderPromise?.();
    delete window.renderPromise;
  })
}