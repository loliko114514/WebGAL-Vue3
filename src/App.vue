<template>
<div ref="root" class="root">
  <Title />
  <Menu />
  <MainStage />
  <ButtomControlPanel />
  <ButtomControlPanelFilm />
  <Backlog />
</div>
</template>
<script setup lang="ts">
import Title from './components/UI/Title/Title.vue'
import Menu from './components/UI/Menu/Menu.vue'
import MainStage from './components/Stage/mainStage.vue'
import ButtomControlPanel from './components/UI/BottomControlPanel/ButtomControlPanel.vue'
import ButtomControlPanelFilm from './components/UI/BottomControlPanel/ButtomControlPanelFilm.vue'
import Backlog from './components/UI/Backlog/Backlog.vue'
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
  background-color: black;
}
*{
  font-family: 'WebgalUI',sans-serif;
  margin: 0;
  padding: 0;
  user-select:none;
}

</style>

