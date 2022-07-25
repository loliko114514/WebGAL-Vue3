<template>
<div ref="root" class="root">
  <Title v-if="guiStore.guiState.showTitle"/>
  <Menu v-if="guiStore.guiState.showMenuPanel"/>
  <MainStage />
</div>
</template>
<script setup lang="ts">
import Title from './components/UI/Title.vue'
import Menu from './components/UI/Menu/Menu.vue'
import MainStage from './components/Stage/mainStage.vue'
import { GuiStore } from './store/GuiStore'
import { ControllerStore } from './store/ControllerStore'
import { onMounted, ref } from 'vue'
import { resize } from "./util/resize"
import { initializeScript } from './controller/initializeScript'

const guiStore = GuiStore()
const controllerStore = ControllerStore()
const root = ref(HTMLElement.prototype)
onMounted(()=>{
  const rootDom:HTMLElement = root.value
  resize(rootDom)
  window.onresize = ()=>{
    resize(rootDom)
  }
  initializeScript()
})

</script>

<style lang="scss">
#app{
  overflow: hidden;
  height: 100vh;
  width: 100vw;
}
.root{
  height: 900px;
  width: 1600px;
}
*{
  margin: 0;
  padding: 0;
  user-select:none;
}

</style>

