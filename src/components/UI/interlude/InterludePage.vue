<template>
  <div class="interludepage" v-if="guiStore.guiState.showinterlude">

  </div>
</template>

<script setup lang='ts'>
import { GuiStore } from '../../../store/GuiStore';

const guiStore = GuiStore()

</script>

<style lang="scss" scoped>
.interludepage{
  position:absolute;
  background-color: black;
  height: 900px;
  width: 1600px;
  animation: fadeinout 3s linear forwards;
  z-index: 999;
  opacity:0;
}
@keyframes fadeinout{
  0% { opacity: 0; }
  40% { opacity:1; }  
  60% { opacity:1; }  
  100% { opacity: 0; }
}
</style> 