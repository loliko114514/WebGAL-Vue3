<template>
<div v-if="showIntro" class="introContainer">
  <div v-for="(e,i) in introArray" :key="'introtext' + i + Math.random().toString()"
    :style="{'animation-delay': `${1500 * i}ms`}"
    class="introElement">
    {{e}}
  </div>
</div>
  
</template>

<script setup lang='ts'>
import { computed } from '@vue/reactivity';
import { ControllerStore } from '../../store/ControllerStore';
import { GuiStore } from '../../store/GuiStore';

const controllerStore = ControllerStore()
const guiStore = GuiStore()
const introArray = computed(()=>controllerStore.introArray)
console.log("introArray",introArray)
const showIntro = computed(()=>guiStore.guiState.showIntro)
</script>

<style lang="scss" scoped>
.introContainer {
  box-sizing: border-box;
  padding: 3em 4em 3em 4em;
  font-size: 350%;
  position: absolute;
  z-index: 99;
  width: 1600px;
  height: 900px;
  background: rgba(0, 0, 0, 1);
  color: white;
}

.introElement {
  opacity: 0;
  animation: intro_showSoftly 1.5s ease-out forwards;
  font-family: "思源宋体", serif;
}

@keyframes intro_showSoftly {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>