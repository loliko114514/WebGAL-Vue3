<template>
<div ref="root" class="root">
  <Menu v-if="guiStore.guiState.showMenuPanel"/>
  <Title />
</div>
</template>
<script setup lang="ts">
import Title from './components/Title.vue'
import Menu from './components/Menu/Menu.vue'
import { GuiStore } from './store/GuiStore'
import { onMounted, ref } from 'vue'
import { resize } from "./util/resize"
const guiStore = GuiStore()

const root = ref(HTMLElement.prototype)
onMounted(()=>{
  const rootDom:HTMLElement = root.value
  resize(rootDom)
  window.onresize = ()=>{
    resize(rootDom)
  }
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

