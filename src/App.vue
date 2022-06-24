<template>
  <Menu v-if="guiStore.guiState.showMenuPanel"/>
  <Title />
</template>
<script setup lang="ts">
import Title from './components/Title.vue'
import Menu from './components/Menu/Menu.vue'
import { GuiStore } from './store/GuiStore'
import { ref } from 'vue'
import { h } from 'vue'
const guiStore = GuiStore()

</script>

<style lang="scss">
#app{
  overflow: hidden;
}

*{
  margin: 0;
  padding: 0;
  user-select:none;
}

</style>

