<template>
  <div class="MainStage_main">
    <div class="MainStage_main_container" :style="{'width':'100%','height':stageHeight,'top':top}">
      <div :key="'bgOld' + stageState.oldBgName"
        id="MainStage_bg_OldContainer"
        class="MainStage_oldBgContainer"
        :style="{'background-image':`url(${stageState.oldBgName})`,'background-size':'cover'}"/>
      <div :key="'bgMain' + stageState.bgName"
        id="MainStage_bg_MainContainer"
        class="MainStage_bgContainer" 
        :style="{'background-image':`url(${stageState.bgName})`,'background-size':'cover'}"/>
      <FigureContainer/>  
    </div>
    <FullScreenPerform/>
    <TextBox v-if="showTextBox && stageState.enableFilm===''"/>
    <TextBoxFilm v-if="showTextBox && stageState.enableFilm!==''"/>
    <AudioContainer/>
    <div @click="()=>{
      if(!guiStore.guiState.showTextBox){
        guiStore.setShowTextBox(true)
        return
      }
      // stopAll()
      nextSentence()
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
import FullScreenPerform from './FullScreenPerform.vue';
import { GuiStore } from '../../store/GuiStore';
import { StageStore } from '../../store/StageStore';
import { computed } from 'vue';
import { nextSentence } from '../../controller/gamePlay/nextSentence';
const stageStore = StageStore()
const guiStore = GuiStore()
const showTextBox = computed(()=>guiStore.guiState.showTextBox)
const stageState = computed(()=>stageStore.stageState)
let stageHeight = computed(()=>{
  if(stageState.value.enableFilm!==''){
    return '76%'
  }else{
    return '100%'
  }
})
let top = computed(()=>{
  if(stageState.value.enableFilm!==''){
    return '12%'
  }else{
    return '0'
  }
})


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