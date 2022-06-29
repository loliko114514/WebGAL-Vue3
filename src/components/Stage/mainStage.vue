<template>
  <div class="MainStage_main">
    <div class="MainStage_main_container" :style="{'width':'100%','height':'100%','top':'0'}">
      <div :key="'bgOld' + stageState.oldBgName"
        id="MainStage_bg_OldContainer"
        class="MainStage_oldBgContainer"
        :style="{'background-image':`url(${stageState.oldBgName})`,'background-size':'cover'}"/>
      <div :key="'bgMain' + stageState.bgName"
        id="MainStage_bg_MainContainer"
        class="styles.MainStage_bgContainer" 
        :style="{'background-image':`url(${stageState.bgName})`,'background-size':'cover'}"/>
      <FigureContainer/>  
    </div>
    <FullScreenPerform/>
    <TextBox v-if="guiStore.guiState.showTextBox && stageStore.stageState.enableFilm===''"/>
    <TextBoxFilm v-if="guiStore.guiState.showTextBox && stageStore.stageState.enableFilm!==''"/>
    <AudioContainer/>
    <div @click="()=>{
      if(!guiStore.guiState.showTextBox){
        guiStore.setShowTextBox(true)
        return
      }
      controllerStore.nextSentence()
    }"
    id="FullScreenClick"
    class="FullScreenClick"/>
  </div>
</template>

<script setup lang='ts'>
import FigureContainer  from './FigureContainer.vue'
import TextBox from './TextBox.vue'
import TextBoxFilm from './TextBoxFilm.vue'
import AudioContainer from './AudioContainer.vue';
import { GuiStore } from '../../store/GuiStore';
import { StageStore } from '../../store/StageStore';
import { ControllerStore } from '../../store/ControllerStore';
import { computed } from 'vue';
const stageStore = StageStore()
const controllerStore = ControllerStore()
const guiStore = GuiStore()
const stageState = computed(()=>stageStore.stageState)


</script>

<style lang="scss" scoped>
.FullScreenClick{
  width: 100%;
  height: 100%; 
  position: absolute; 
  z-index: 12;
  top:0;
}
.MainStage_main {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  //animation: MainStage_showBgSoftly 100ms forwards;
  opacity: 1;
  overflow: hidden;
}

.MainStage_main_container {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
}

.MainStage_bgContainer {
  top: 0;
  position: absolute;
  background-size: cover;
  width: 100%;
  height: 100%;
  z-index: 1;
  animation: MainStage_showBgSoftly 1s forwards ease-in-out;
}

.MainStage_bgContainer_Settled {
  top: 0;
  position: absolute;
  background-size: cover;
  width: 100%;
  height: 100%;
  animation: MainStage_showBgSoftly 1ms forwards;
  z-index: 1;
}

.MainStage_oldBgContainer {
  background-size: cover;
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  animation: MainStage_oldBgFadeout 3s forwards;
}

.MainStage_oldBgContainer_Settled {
  background-size: cover;
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
}

@keyframes MainStage_showBgSoftly {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes MainStage_oldBgFadeout {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

</style>