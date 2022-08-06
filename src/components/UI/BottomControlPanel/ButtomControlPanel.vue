<template>
  <div class="ToCenter">
    <div v-if="showTextBox && !enableFilm" class="main">
      <span class="singleButton" @click="() => guiStore.guiState.showTextBox = false">
        <n-icon class="button" size="30" color="#f5f5f7" :component="EyeOffOutline"/>
        <span class="button_text">隐藏</span>
      </span>
      <span class="singleButton" @click="() => {
        guiStore.guiState.showBacklog = true
        guiStore.guiState.showTextBox = false
      }">
        <n-icon class="button" size="30" color="#f5f5f7" :component="DocumentTextOutline"/>
        <span class="button_text">回想</span>
      </span>
      <span class="singleButton" @click="replay()">
        <n-icon class="button"  size="30" color="#f5f5f7" :component="ReloadCircleOutline"/>
        <span class="button_text">重播</span>
      </span>
      <span id="Button_ControlPanel_auto" class="singleButton" @click="switchAuto()">
        <n-icon class="button" size="30" color="#f5f5f7" :component="PlayCircleOutline"/>
        <span class="button_text">自动</span>
      </span>
      <span id="Button_ControlPanel_fast" class="singleButton" @click="switchFast()">
        <n-icon class="button" size="30" color="#f5f5f7" :component="PlayForwardCircleOutline"/>
        <span class="button_text">快进</span>
      </span>
      <span
        class="singleButton"
        @click="showMenu(MenuPanelTag.Save)"
      >
        <n-icon class="button"  size="30" color="#f5f5f7" :component="SaveOutline" />
        <span class="button_text">存档</span>
      </span>
      <span
        class="singleButton"
        @click="showMenu(MenuPanelTag.Load)"
      >
        <n-icon class="button" size="30" color="#f5f5f7" :component="FolderOpenOutline"/>
        <span class="button_text">读档</span>
      </span>
      <span
        class="singleButton"
        @click="showMenu(MenuPanelTag.Option)"
      >
        <n-icon class="button" size="30" color="#f5f5f7" :component="SettingsOutline"/>
        <span class="button_text">选项</span>
      </span>
      <span
        class="singleButton"
        @click="() => {
          backToTitle();
        }"
      >
        <n-icon class="button" size="30" color="#f5f5f7" :component="HomeOutline"/> 
        <span class="button_text">标题</span>
      </span>
    </div>}
  </div>
</template>

<script setup lang='ts'>
import { NIcon } from 'naive-ui'
import { EyeOffOutline,
DocumentTextOutline,
ReloadCircleOutline,
PlayCircleOutline,
PlayForwardCircleOutline,
SaveOutline,
FolderOpenOutline,
SettingsOutline,
HomeOutline
 } from '@vicons/ionicons5'
import { GuiStore } from '../../../store/GuiStore';
import { computed } from '@vue/reactivity';
import { StageStore } from '../../../store/StageStore';
import { MenuPanelTag } from '../../../interface/stateInterface/guiInterface';
import { backToTitle } from '../../../controller/gamePlay/backToTitle';
import { switchAuto } from '../../../controller/gamePlay/autoPlay';
import { switchFast } from '../../../controller/gamePlay/fastSkip';

const guiStore = GuiStore()
const stageStore = StageStore()
const enableFilm = computed(()=>stageStore.stageState.enableFilm)
const showTextBox = computed(()=>guiStore.guiState.showTextBox)
const showMenu = (Tag:MenuPanelTag)=>{
  guiStore.guiState.currentMenuTag = Tag
  guiStore.guiState.showMenuPanel = true
}
const replay = ()=>{
  let VocalControl: any = document.getElementById('currentVocal');
  if (VocalControl !== null) {
    VocalControl.currentTime = 0;
    VocalControl.pause();
    VocalControl.play(); 
  }
}
</script>

<style lang="scss" scoped>
.ToCenter {
  display: flex;
  justify-content: center;
}

.main {
  //border-bottom: 2px solid rgba(255,255,255,0.25);
  position: absolute;
  bottom: 0.3em;
  z-index: 9;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  //background-color: rgba(150, 150, 150, 0.25);
  padding: 0.15em 1.75em 0.15em 1.75em;
  //background: linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.25) 100%);
  //border-radius: 10px;
}

.button {
  position: relative;
  top: 2px;
  padding: 0 3px 0 0;
}

.button_text {
  position: relative;
  bottom: 4px;
}

.button_on {
  height: 100%;
  display: inline-block;
  color: white;
  font-size: 150%;
  padding: 0.2em 0.6em 0 0.45em;
  transition: background-color 0.5s;
  background: rgba(255, 255, 255, 0.3);
}

.singleButton {
  //border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  height: 100%;
  display: inline-block;
  color: white;
  font-size: 150%;
  padding: 0.2em 0.6em 0 0.45em;
  transition: background-color 0.5s;
  cursor: pointer;
}

.singleButton:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

</style>