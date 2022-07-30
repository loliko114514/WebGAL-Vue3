<template>
<div class="FigureContainer_main">
    <div class="figContainerLeft figContainer" id="figLeftContainer">
        <img v-if="stageState.figNameLeft !== ''" class="figurePic" :src="stageState.figNameLeft" alt="fig_left"/>
    </div>
    <div class="figContainerCenter figContainer" id="figCenterContainer">

        <img v-if="stageState.figName !== ''" class="figurePic" :src="stageState.figName" alt="fig_center"/>
    </div>
    <div class="figContainerRight figContainer" id="figRightContainer">
        <img v-if="stageState.figNameRight !== ''" class="figurePic" :src="stageState.figNameRight" alt="fig_right"/>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { StageStore } from '../../store/StageStore';
import { computed } from 'vue';
const stageState = computed(()=>StageStore().stageState)
</script>

<style lang="scss" scoped>
.FigureContainer_main {
  z-index: 4;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
}

.figurePic {
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
  object-fit: cover;
  animation: centerIn 0.5s ease-in-out forwards;
}

.figContainer {
  width: 98%;
  left: 1%;
  right: 1%;
  position: absolute;
  display: flex;
  top: 5px;
  bottom: 0;
  z-index: 4;
}

.figContainerLeft {
  justify-content: left;
}

.figContainerCenter {
  justify-content: center;
}

.figContainerRight {
  justify-content: right;
}

</style>