<template>
  <div class="videoContainer" v-if="controllerStore.videoSrc!==''">
    <video  class="fullScreen_video" id="playVideoElement" :src="controllerStore.videoSrc"
      :autoPlay="true"/>
  </div>
</template>

<script setup lang='ts'>
import { ControllerStore } from '../../store/ControllerStore';
  const controllerStore = ControllerStore()
</script>

<style lang="scss" scoped>
.videoContainer {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  z-index: 11;
  background: rgba(0, 0, 0, 1);
}
.fullScreen_video {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  z-index: 11;
}
</style>