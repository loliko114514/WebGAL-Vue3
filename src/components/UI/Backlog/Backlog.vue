<template>
  <div v-if="guiStore.guiState.showBacklog" class="Backlog_main" >
    <div class="backlog_top">
      <n-icon class="backlog_top_icon" color="#ffffff" size="4em" :component="ArrowBackOutline" @click="()=>{
        guiStore.guiState.showBacklog = false;
        guiStore.guiState.showTextBox = true;
      }"/>
      <div class="backlog_title">回想</div>
    </div>
    <div class="backlog_content">
      <div v-for="(backlogItem,i) in backlogItemList"
       class="backlog_item"
       :style="{'animationDelay':`${20 * (controllerStore.runtime_currentBacklog.length - i)}ms`}"
       :key="'backlogItem' + backlogItem.currentStageState.showText + backlogItem.saveScene.currentSentenceId"
       >
        <div class="backlog_func_area">
          <div v-if="backlogItem.currentStageState.showName !== ''" class="backlog_item_content_name">
            {{backlogItem.currentStageState.showName}}
          </div>
          <div class="backlog_item_button_list">
            <div @click="(e)=>{
            jumpFromBacklog(i);
            e.preventDefault();
            e.stopPropagation();
            }"
            class="backlog_item_button_element">
              <n-icon size = "23" color="#ffffff" :component="ArrowUndoOutline"></n-icon>
            </div>
            <div @click="backlogvocal(i)" class="backlog_item_button_element">
              <n-icon size="23" color="#ffffff" :component="VolumeMediumOutline"/>
            </div>
          </div>
        </div>
        <div class="backlog_item_content">
          <span class="backlog_item_content_text">{{backlogItem.currentStageState.showText}}</span>
        </div>
        <audio :id="'backlog_audio_play_element_' + i" :src="backlogItem.currentStageState.vocal"/>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { NIcon } from 'naive-ui'
import { ArrowBackOutline,
ArrowUndoOutline,
VolumeMediumOutline
 } from '@vicons/ionicons5'
import { ControllerStore } from '../../../store/ControllerStore';
import { GuiStore } from '../../../store/GuiStore';
import { jumpFromBacklog } from '../../../controller/storage/jumpFromBacklog';
import { UserDataStore } from '../../../store/UserDataStore';
import { computed } from '@vue/reactivity';
import { isTemplateElement } from '@babel/types';

const guiStore = GuiStore()
const controllerStore = ControllerStore()
const backlogItemList = computed(()=>{
  let list = []
  for (let item of controllerStore.runtime_currentBacklog){
    list.unshift(item)
  }
  return list
}) 
const backlogvocal = (i:number)=>{
  const backlog_audio_element: any = document.getElementById('backlog_audio_play_element_' + i);
  if (backlog_audio_element) {
    backlog_audio_element.currentTime = 0;
    const userDataStore = UserDataStore()
    const mainVol = userDataStore.userDataState.optionData.volumeMain;
    backlog_audio_element.volume = mainVol * 0.01 * userDataStore.userDataState.optionData.vocalVolume * 0.01;
    backlog_audio_element.play();
  }
}
</script>

<style lang="scss" scoped>
.Backlog_main {
  font-family: "思源宋体", serif;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.7);
  padding: 2em 0 2em 0;
  animation: backlog_soft_in 0.7s ease-out forwards;
  box-sizing: border-box;
}


.backlog_top {
  padding: 0 0 0 1em;
  display: flex;
  height: 10%;
}

.backlog_top_icon {
  padding: 10px 10px 0 10px;
  border-radius: 50px;
  transform: translate(0, -11px);
}

.backlog_top_icon:hover {
  background: rgba(255, 255, 255, 0.25);
  animation: backlog_icon_softin 0.25s ease-out forwards;
}

@keyframes backlog_icon_softin {
  0% {
    background: rgba(255, 255, 255, 0);
  }
  100% {
    background: rgba(255, 255, 255, 0.25);
  }
}


.backlog_title {
  height: 100%;
  line-height: 100%;
  font-size: 360%;
  font-weight: bold;
  color: transparent;
  background: linear-gradient(150deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 35%, rgba(165, 212, 228, 1) 100%);
  -webkit-background-clip: text;
}

.backlog_content {
  position: absolute;
  height: 80%;
  padding: 1em 5.6em 1em 5.6em;
  overflow: auto;
  display: flex;
  flex-flow: column-reverse;
  font-weight: normal;
  width: 100%;
  box-sizing: border-box;
}


.backlog_item {
  display: flex;
  color: white;
  font-size: 165%;
  opacity: 0;
  animation: backlog_item_in 0.5s ease-out forwards;
  margin: 1.25em 0 0 0;
  width: 100%;
}

.backlog_func_area {
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  width: 17.5%;
}

.backlog_item_content_name {
  //font-weight: bold;
  //color: transparent;
  //background: linear-gradient(150deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 55%, rgb(210, 243, 255) 100%);
  //-webkit-background-clip: text;
  //width: 20%;
  margin: 0 0 0 0;
  overflow-wrap: break-word;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.175);
  border-radius: 7px;
  padding: 0.2em 0.5em 0.25em 0.5em;
  font-size: 115%;
  width: 100%;
  text-align: center;
}

.backlog_item_content {
  //display: flex;
  font-size: 115%;
  width: 82.5%;
  box-sizing: border-box;
  padding: 0.2em 0 0 1em;
}

.backlog_item_button_list {
  display: flex;
  //padding: 0 2em 0 0.3em;
  flex-flow: row;
  align-items: flex-start;
  margin: 0.35em 0 0 0;
}

.backlog_item_button_element {
  cursor: pointer;
  padding: 0 15px 0 15px;
  margin: 0 0 0 0.5em;
  background: rgba(255, 255, 255, 0.075);
  border-radius: 7px;
  display: flex;
  //border: 1px solid rgba(255, 255, 255, 0.15);
  //box-shadow: 0 0 15px rgba(255, 255, 255, 0.25);
}

.backlog_item_button_element:hover {
  background: rgba(255, 255, 255, 0.25);
  //border: 1px solid rgba(255, 255, 255, 0);
  //box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
}


.backlog_item_content_text {
  //width: 80%;
  box-sizing: border-box;
}


@keyframes backlog_soft_in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes backlog_item_in {
  0% {
    opacity: 0;
    transform: scale(1.05, 1.05) translate(-15px, 10px) rotateX(-5deg) rotateY(-5deg);
    background-color: rgba(255, 255, 255, 0.2);
  }
  100% {
    opacity: 1;
    transform: scale(1, 1) translate(0, 0);
  }
}

</style>