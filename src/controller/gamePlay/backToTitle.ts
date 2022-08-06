import { GuiStore } from "../../store/GuiStore";
import { stopAllPerform } from "../scene/restoreScene";
import { playBgm } from "../stage/playBgm";
import { stopAuto } from "./autoPlay";
import { stopFast } from "./fastSkip";

export const backToTitle = () => {
  const guiStore = GuiStore()
  playBgm(guiStore.guiState.titleBgm);
  stopAllPerform();
  stopAuto();
  stopFast();
  // 重新打开标题界面
  guiStore.guiState.showTitle = true
};
