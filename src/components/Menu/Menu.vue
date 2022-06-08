<template>
  <div class="Menu_main">
    <div class="Menu_TagContent">
      <v-switch :case="name">
        <template #tem1>
          <div>tem1</div>
        </template>
        <template #tem2>
          <div>tem2</div>
        </template>
      </v-switch>
    </div>
    <MenuPanel/>
  </div>
</template>
  
<script setup lang='ts'>
import { ref } from 'vue';
import MenuPanel from './MenuPanel/MenuPanel.vue';
import VSwitch from '../SwitchTool/VSwitch.vue';
const name = ref('tem1')
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