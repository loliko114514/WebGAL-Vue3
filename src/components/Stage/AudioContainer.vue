<template>
  <div>
    <audio id="currentBgm" :src="stageStore.stageState.bgm" :loop="true" :autoPlay="true"/>
    <audio id="currentVocal" :src="stageStore.stageState.vocal"/>
  </div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue';
import { playBgm } from '../../controller/stage/playBgm';
import { GuiStore } from '../../store/GuiStore';
import { StageStore } from '../../store/StageStore';

const stageStore = StageStore()
const guiStore = GuiStore()
</script>

<style lang="scss" scoped>
</style>