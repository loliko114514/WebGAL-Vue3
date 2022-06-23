<template>
  <div class="textPreviewMain">
    <span 
      v-for="(e,i) in previewText"
      :id="'text'+i" 
      class="singleText"
      :style="{ 'animation-delay' : textDelay*i + 'ms'}"
      >
    {{e}}
    </span>
  </div>
</template>


<script setup lang='ts'>
import { webgal_env } from '../../../env/webgal_env';
import { ref,watch } from 'vue';

import { UserDataStore } from '../../../store/UserDataStore';
import { computed } from '@vue/reactivity';

const userdataStore=UserDataStore()
// let textDelay = ref(webgal_env.textInitialDelay - 20*userdataStore.userDataState.optionData.textSpeed)
// let size = ref(50*userdataStore.userDataState.optionData.textSize+200+'%')
const previewText = '现在预览的是文本框字体大小和播放速度的情况，您可以根据您的观感调整上面的选项。'
let textDelay = computed(()=>{
  return webgal_env.textInitialDelay - 20*userdataStore.userDataState.optionData.textSpeed
})
let size = computed(()=>{
  return ref(50*userdataStore.userDataState.optionData.textSize+200+'%')
})


</script>

<style lang="scss" scoped>
.textPreviewMain {
  position: relative;
  z-index: 1;
  padding: 1em 1.5em 1em 1.5em;
  background: rgba(0, 0, 0, 0.35);
  color: rgb(255, 255, 255);
  min-height: 170px;
}

.singleText {
  font-family: "思源宋体", serif;
  animation: TextDelayShow 1000ms forwards;
  opacity: 0;
  transition: font-size 1s;
  font-size: v-bind(size);
  animation-delay: 0ms;
}

@keyframes TextDelayShow {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>