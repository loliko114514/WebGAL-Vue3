import { ControllerStore } from "../../../../store/ControllerStore";
import * as PIXI from "pixi.js";

export const pixiRain = (rainSpeed: number, number: number) => {
  const controllerStore = ControllerStore()
  // 动画参数
  // 设置缩放的系数
  const scalePreset = 0.3;
  const app = controllerStore.runtime_gamePlay.currentPixi;
  const container = new PIXI.Container();
  app.stage.addChild(container);
  // 创建纹理
  const texture = PIXI.Texture.from('./game/tex/raindrop.png');
  // 将容器移到中心
  container.x = app.screen.width / 2;
  container.y = app.screen.height / 2;
  container.pivot.x = container.width / 2;
  container.pivot.y = container.height / 2;
  // 调整缩放
  container.scale.x = 1;
  container.scale.y = 1;
  // container.rotation = -0.2;
  const bunnyList: any = [];
  // 监听动画更新
  app.ticker.add((delta: any) => {
    // 获取长宽，用于控制雪花出现位置
    const stageWidth = 1600;
    const stageHeight = 900;
    for (let i = 0; i < number; i++) {
      // 创建对象
      const bunny = new PIXI.Sprite(texture);
      // 随机雨点大小
      let scaleRand = Math.random();
      if (scaleRand <= 0.5) {
        scaleRand = 0.5;
      }
      bunny.scale.x = scalePreset * scaleRand * 3;
      bunny.scale.y = scalePreset * scaleRand;
      // 设置锚点
      bunny.anchor.set(0.5);
      // 随机雪花位置
      bunny.x = Math.random() * stageWidth - 0.5 * stageWidth;
      bunny.y = 0 - 0.5 * stageHeight;
      // @ts-ignore
      bunny['dropSpeed'] = Math.random() * 2;
      // @ts-ignore
      bunny['acc'] = Math.random();
      bunny['alpha'] = Math.random();
      if (bunny['alpha'] >= 0.5) {
        bunny["alpha"] = 0.5;
      }
      if (bunny['alpha'] <= 0.2) {
        bunny['alpha'] = 0.2;
      }
      container.addChild(bunny);
      // 控制每片雨点
      bunnyList.push(bunny);
    }
    // 雨点落下
    for (const e of bunnyList) {
      e['dropSpeed'] = e['acc'] * 0.01 + e['dropSpeed'];
      e.y += delta * rainSpeed * e['dropSpeed'] * 1.1 + 3;
      if(e.y >= 900)
      {
        container.removeChild(e)
        // e.visible = false
      }
    }
    // 控制同屏雨点数
    if (bunnyList.length >= 500) {
      bunnyList.unshift();
      container.removeChild(container.children[0]);
    }
  });
  return container;
};


export default pixiRain;