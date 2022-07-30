import { ControllerStore } from "../../../../store/ControllerStore";
import * as PIXI from "pixi.js";

export const pixiSnow = (snowSpeed:number) => {
  const controllerStore = ControllerStore()
  // 动画参数
  // 设置缩放的系数
  const scalePreset = 0.09;
  const app = controllerStore.runtime_gamePlay.currentPixi;
  const container = new PIXI.Container();
  app.stage.addChild(container);
  // 创建纹理
  const texture = PIXI.Texture.from('./game/tex/snowFlake_min.png');
  // 将容器移到中心
  container.x = app.screen.width / 2;
  container.y = app.screen.height / 2;
  container.pivot.x = container.width / 2;
  container.pivot.y = container.height / 2;
  // 调整缩放
  container.scale.x = 1;
  container.scale.y = 1;
  // container.rotation = -0.2;
  const bunnyList:any = [];
  // 监听动画更新
  app.ticker.add((delta:number) => {
    // 获取长宽，用于控制雪花出现位置
    const stageWidth = 1600;
    const stageHeight = 900;
    // 创建对象
    const bunny = new PIXI.Sprite(texture);
    // 随机雪花大小
    let scaleRand = Math.random();
    if (scaleRand <= 0.5) {
      scaleRand = 0.5;
    }
    bunny.scale.x = scalePreset * scaleRand;
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
    container.addChild(bunny);
    // 控制每片雪花
    bunnyList.push(bunny);
    let count = 0;// 用于判断雪花往左还是往右飘，是2的倍数则往左
    for (const e of bunnyList) {
      count++;
      const randomNumber = Math.random();
      e['dropSpeed'] = e['acc'] *0.01 + e['dropSpeed'];
      e.y += delta * snowSpeed * e['dropSpeed'] * 0.3 + 0.7;
      const addX = count % 2 === 0;
      if (addX) {
        e.x += delta * randomNumber * 0.5;
        e.rotation += delta * randomNumber * 0.03;
      } else {
        e.x -= delta * randomNumber * 0.5;
        e.rotation -= delta * randomNumber * 0.03;
      }
      if(e.y >= 900)
      {
        container.removeChild(e)
        // e.visible = false
      }
    }
    // 控制同屏雪花数
    if (bunnyList.length >= 500) {
      bunnyList.unshift();
      container.removeChild(container.children[0]);
    }
  });
  return container;
};
