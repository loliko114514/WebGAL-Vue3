import { IAsset } from "../../interface/coreInterface/sceneInterface";
import { ControllerStore } from "../../store/ControllerStore";

/**
 * 预加载函数
 * @param assetList 场景资源列表
 */
export const assetsPrefetcher = (assetList: Array<IAsset>) => {
  const settledAssets = ControllerStore().settledAssets
  for (const asset of assetList) {
    // 是否要插入这个标签
    let isInsert = true;
    // 判断是否已经存在
    settledAssets.forEach(settledAssetUrl => {
      if (settledAssetUrl === asset.url) {
        isInsert = false;
      }
    });
    if (!isInsert) {
      console.log('该资源已在预加载列表中，无需重复加载')
    } else {
      const newLink = document.createElement('link');
      newLink.setAttribute('rel', 'prefetch');
      newLink.setAttribute('href', asset.url);
      const head = document.getElementsByTagName('head');
      if (head.length) {
        head[0].appendChild(newLink);
      }
      settledAssets.push(asset.url);
    }
  }
};
