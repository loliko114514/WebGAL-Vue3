<template>
  <div class="Menu_main">
    <div class="Menu_TagContent">
      <template v-if="currentMenuTag===MenuPanelTag.Save">
        <div>tem1</div>
      </template>
      <template  v-if="currentMenuTag===MenuPanelTag.Load">
        <div>tem2</div>
      </template>
      <Options  v-if="currentMenuTag===MenuPanelTag.Option"/>
    </div>
    <MenuPanel/>
  </div>
</template>
  
<script setup lang='ts'>
import { ref } from 'vue';
import MenuPanel from './MenuPanel/MenuPanel.vue';
import VSwitch from '../SwitchTool/VSwitch.vue';
import Options from './Options/Options.vue';
import { GuiStore } from "../../store/GuiStore";
import { MenuPanelTag }from "../../interface/stateInterface/guiInterface"

const guiStore = GuiStore()
const currentMenuTag = ref(guiStore.iGuiState.currentMenuTag)
console.log('currentMenuTag',currentMenuTag)
</script>
   
<style  lang="scss" scoped>
.Menu_main {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 16;
  //backdrop-filter: blur(1px);
  animation: Menu_ShowSoftly 0.5s forwards;
  background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
}

.Menu_TagContent {
  width: 100%;
  height: 90%;
}


@keyframes Menu_ShowSoftly {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>