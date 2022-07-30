<template>
<div class="FullScreenPerform_main" :style="{'width': stageWidth, 'height': stageHeight, 'top': top}">
  <VideoContainer/>
  <IntroContainer/>
  <div id="pixiContianer"/>
  <ChooseContainer/>
</div>;
</template>

<script setup lang='ts'>
import ChooseContainer from './ChooseContainer.vue';
import VideoContainer from './VideoContainer.vue';
import IntroContainer from './IntroContainer.vue';
import { StageStore } from '../../store/StageStore';
import { computed } from '@vue/reactivity';
import { ref } from 'vue';

const stageState = StageStore().stageState
let stageWidth = ref('100%')
let stageHeight = computed(()=>{
  if(stageState.enableFilm !== ''){
    return '76%'
  }
  else{
    return '100%'
  }
})
let top = computed(()=>{
  if(stageState.enableFilm !== ''){
    return '12%'
  }
  else{
    return '0%'
  }
})
</script>

<style lang="scss" scoped>
.FullScreenPerform_main {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}

.FullScreenPerform_element {
  position: absolute;
  display: none;
  width: 100%;
  height: 100%;
  z-index: 11;
}

.fullScreen_video {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  z-index: 11;
}

@keyframes intro_showSoftly {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.videoContainer {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  z-index: 11;
  background: rgba(0, 0, 0, 1);
}

</style>