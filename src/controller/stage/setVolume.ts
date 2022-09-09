import { UserDataStore } from "../../store/UserDataStore";

/**
 * 设置音量
 */
 export const setVolume = () => {
  const userDataStore = UserDataStore()
  const mainVol = userDataStore.userDataState.optionData.volumeMain;
  const vocalVol = mainVol * 0.01 * userDataStore.userDataState.optionData.vocalVolume * 0.01;
  const bgmVol = mainVol * 0.01 * userDataStore.userDataState.optionData.bgmVolume * 0.01;
  console.log(`设置背景音量：${bgmVol},语音音量：${vocalVol}`);
  const bgmElement: any = document.getElementById('currentBgm');
  if (bgmElement) {
    bgmElement.volume = bgmVol.toString();
  }
  const vocalElement: any = document.getElementById('currentVocal');
  if (bgmElement) {
    vocalElement.volume = vocalVol.toString();
  }
};