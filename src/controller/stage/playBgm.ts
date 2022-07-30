import { StageStore } from "../../store/StageStore";

export function playBgm(url: string): void {
  console.log("播放音乐被调用")
  const stageStore = StageStore()
  stageStore.stageState.bgm = url
}
