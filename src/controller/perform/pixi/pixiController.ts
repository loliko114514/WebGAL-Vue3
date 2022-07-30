import * as PIXI from "pixi.js";
import { ControllerStore } from "../../../store/ControllerStore";


export const pixiController = (active: boolean) => {
  const controllerStore = ControllerStore()
  if (active) {
    let app = new PIXI.Application({
      backgroundAlpha: 0
    });
    // 清空原节点
    const pixiContainer = document.getElementById('pixiContianer');
    if (pixiContainer) {
      pixiContainer.innerHTML = '';
      pixiContainer.appendChild(app.view);
    }

    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    // @ts-ignore
    app.renderer.autoResize = true;
    const appRoot = document.getElementById('app');
    console.log(appRoot!.clientWidth+"   "+appRoot!.clientHeight)
    if (appRoot) {
      app.renderer.resize(1600,900);
    }
    app.renderer.view.style.zIndex = '5';
    controllerStore.runtime_gamePlay.currentPixi = app;
  } else {
    // 清空原节点
    const pixiContainer = document.getElementById('pixiContianer');
    if (pixiContainer) {
      pixiContainer.innerHTML = '';
    }
  }
};
