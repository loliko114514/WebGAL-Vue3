<template>
<div id="textBoxMain" class="TextBox_main">
    <div :style="{'fontSize': size}">
      <span v-for="(e, index) in textArray" :id="index * textDelay+''" :class="`${index<prevLength?'TextBox_textElement_Settled':'TextBox_textElement_start'}`"
        :key="stageStore.stageState.currentDialogKey + index"
        :style="{'animationDelay': `${(index * textDelay - prevLength * textDelay)>=0?(index * textDelay - prevLength * textDelay):0}ms`}">{{e}}</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed } from '@vue/reactivity';
import { ControllerStore } from '../../store/ControllerStore';
import { StageStore } from '../../store/StageStore';
import { UserDataStore } from '../../store/UserDataStore';

const controllerStore = ControllerStore()
const userDataStore = UserDataStore()
const stageStore = StageStore()
const textDelay = computed(()=>{return controllerStore.textInitialDelay - 20 * userDataStore.userDataState.optionData.textSpeed})
const size = computed(()=>{return userDataStore.userDataState.optionData.textSize * 50 + 200 + '%'})
const textArray = computed(()=>{return stageStore.stageState.showText.split('')})
let prevLength = computed(()=>stageStore.stageState.currentConcatDialogPrev.length)
</script>

<style lang="scss" scoped>
.TextBox_EventHandler {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 6;
  top: 0;
}

.TextBox_main {
  font-family: "思源宋体", serif;
  font-style: italic;
  position: absolute;
  z-index: 6;
  width: 100%;
  height: 12%;
  //background: linear-gradient(transparent,
  //    rgba(0, 0, 0, .25) 25%,
  //    rgba(0, 0, 0, .35) 75%,
  //    rgba(0, 0, 0, .6)),
  //linear-gradient(90deg, transparent 0,
  //        rgba(0, 0, 0, .35) 25%,
  //        rgba(0, 0, 0, .35) 75%,
  //        transparent);
  background-color: black;
  bottom: 0;
  color: white;
  //padding: 1em 18em 2em 18em;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  align-items: center;
  animation: showSoftly 0.7s ease-out forwards;
  letter-spacing: 0.2em;
  justify-content: center;
}

@keyframes showSoftly {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.TextBox_textElement {
  opacity: 0;
  animation: showSoftly 1000ms forwards;
}

.TextBox_textElement_start {
  animation: TextDelayShow 700ms ease-out forwards;
  opacity: 0;
}

.TextBox_textElement_Settled {
  opacity: 1;
}

.TextBox_showName {
  font-size: 85%;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  min-width: 50%;
  padding: 0 0.2em 0.2em 0.3em;
  margin: 0 0 0.2em 0;
}

@keyframes TextDelayShow {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.miniAvatarContainer {
  position: absolute;
  height: 80%;
  width: 17%;
  bottom: 0;
  left: 0.5em;
}

.miniAvatarImg {
  max-height: 100%;
  max-width: 100%;
  position: absolute;
  bottom: 0;
}

</style>