 <template>
    <div v-if="enableFilm" class="tag" @click="() => {
      changePanel()
    }">
      <n-icon size="32" color="#fff" :component="ListOutline"/>
    </div>
    <div v-if="showPanel" class="container">
      <span class="singleButton" @click="() => {
        guiStore.guiState.showBacklog = true
        guiStore.guiState.showTextBox = false
        changePanel()
      }">
        <span class="button_text">剧情回想 / BACKLOG</span>
      </span>
      <span class="singleButton" @click="() => {
        changePanel()
        replay()
      }">
        <span class="button_text">重播语音 / REPLAY VOICE</span>
      </span>
      <span id="Button_ControlPanel_auto" class="singleButton" @click="()=>{switchAuto();
      changePanel();}">
        <span class="button_text">自动模式 / AUTO</span>
      </span>
      <span id="Button_ControlPanel_fast" class="singleButton" @click="()=>{switchFast();
      changePanel();}">
        <span class="button_text">快进 / FAST</span>
      </span>
      <span
        class="singleButton"
        @click="() => {
          changePanel()
          guiStore.guiState.currentMenuTag = MenuPanelTag.Save
          guiStore.guiState.showMenuPanel = true
        }"
      >
        <span class="button_text">存档 / SAVE</span>
      </span>
      <span
        class="singleButton"
        @click="() => {
          changePanel()
          guiStore.guiState.currentMenuTag = MenuPanelTag.Load
          guiStore.guiState.showMenuPanel = true
        }"
      >
        <span class="button_text">读档 / LOAD</span>
      </span>
      <span
        class="singleButton"
        @click="() => {
          changePanel()
          guiStore.guiState.currentMenuTag = MenuPanelTag.Option
          guiStore.guiState.showMenuPanel = true
        }"
      >
        <span class="button_text">选项 / OPTIONS</span>
      </span>
      <span
        class="singleButton"
        @click="() => {
          changePanel()
          backToTitle();
        }"
      >
        <span class="button_text">标题 / TITLE</span>
      </span>
    </div> 
 </template>
 
<script setup lang='ts'>
import { NIcon } from 'naive-ui'
import { ListOutline } from '@vicons/ionicons5'
import { computed } from 'vue';
import { GuiStore } from '../../../store/GuiStore';
import { StageStore } from '../../../store/StageStore';
import { switchAuto } from '../../../controller/gamePlay/autoPlay';
import { switchFast } from '../../../controller/gamePlay/fastSkip';
import { MenuPanelTag } from '../../../interface/stateInterface/guiInterface';
import { backToTitle } from '../../../controller/gamePlay/backToTitle';


const guiStore = GuiStore()
const stageStore = StageStore()
const enableFilm = computed(()=>stageStore.stageState.enableFilm)
const showPanel = computed(()=>guiStore.guiState.showPanel)
const replay = ()=>{
  let VocalControl: any = document.getElementById('currentVocal');
  if (VocalControl !== null) {
    VocalControl.currentTime = 0;
    VocalControl.pause();
    VocalControl.play(); 
  }
}
const changePanel = ()=>{
  guiStore.guiState.showPanel = !guiStore.guiState.showPanel;
}
</script>
 
 <style lang="scss" scoped>
 .tag {
  position: absolute;
  top: 2.5%;
  left: 2.5%;
  color: white;
  z-index: 10;
  padding: 10px 10px 5px 10px;
  border-radius: 100px;
  transition: background-color 0.33s;
}

.tag:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.container {
  color: white;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9;
  padding: 7em 5em 5em 10em;
  opacity: 0;
  animation: showContainer 1s forwards;
  transition: background-color 0.33s;
}

.singleButton {
  padding: 0.5em 0 0.5em 0;
}

.button_text {
  font-family: "思源宋体", serif;
  font-size: 250%;
  letter-spacing: 0.07em;
  transition: text-shadow 0.33s;
}

.button_text:hover{
  text-shadow: 0 0 15px rgba(255,255,255,1);
}

@keyframes showContainer {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

 </style>