<template>
  <Menu-vue v-if="guiStore.guiState.showMenuPanel"/>
  <Title-vue/>
</template>
<script setup lang="ts">
  import TitleVue from './components/Title.vue'
  import MenuVue from './components/Menu/Menu.vue'
  import { GuiStore } from './store/GuiStore'
  import { ref } from 'vue'

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

