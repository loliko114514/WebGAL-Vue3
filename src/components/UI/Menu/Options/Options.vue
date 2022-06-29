<template>
  <div class="Options_main">
    <div class="Options_top">
      <div class="Options_title">
        <div class="Option_title_text">选项</div>
      </div>
    </div>

    <div class="Options_main_content">
      <div class="Options_main_content_half">
        <NormalOption key="option0" title="文字显示速度">
          <NormalButton 
          :textList="['慢', '中', '快']" 
          :functionList="[
            ()=>{userdataStore.setTextSpeed(PlaySpeed.slow)
              controllerStore.setStorage()},
            ()=>{userdataStore.setTextSpeed(PlaySpeed.normal)
            controllerStore.setStorage()},
            ()=>{userdataStore.setTextSpeed(PlaySpeed.fast)
            controllerStore.setStorage()},
          ]"
          :currentChecked="userdataStore.userDataState.optionData.textSpeed"></NormalButton>
        </NormalOption>
        <NormalOption key="option1" title="自动播放速度">
          <NormalButton 
          :textList="['慢', '中', '快']" 
          :functionList="[
            ()=>{userdataStore.setAutoSpeed(PlaySpeed.slow)
            controllerStore.setStorage()},
            ()=>{userdataStore.setAutoSpeed(PlaySpeed.normal)
            controllerStore.setStorage()},
            ()=>{userdataStore.setAutoSpeed(PlaySpeed.fast)
            controllerStore.setStorage()},
          ]"
          :currentChecked="userdataStore.userDataState.optionData.autoSpeed"></NormalButton>
        </NormalOption>
        <NormalOption key="option2" title="文本大小">
          <NormalButton 
          :textList="['小', '中', '大']" 
          :functionList="[
            ()=>{userdataStore.setTextSize(TextSize.small)
            controllerStore.setStorage()},
            ()=>{userdataStore.setTextSize(TextSize.medium)
            controllerStore.setStorage()},
            ()=>{userdataStore.setTextSize(TextSize.large)
            controllerStore.setStorage()},
          ]"
          :currentChecked="userdataStore.userDataState.optionData.textSize"></NormalButton>
        </NormalOption>
        <NormalOption key="option3" title="文本显示预览">
          <TextPreview />
        </NormalOption>
      </div>

      <div>
        <NormalOption key="option4" title="主音量">
          <OptionSlider :initValue="userdataStore.userDataState.optionData.volumeMain"
            uniqueID="主音量" :onChange="(event:any) => {
              userdataStore.userDataState.optionData.volumeMain = parseInt(event.target.value)
              controllerStore.setStorage();
              userdataStore.setVolume();
            }"
          />
        </NormalOption>
        <NormalOption key="option5" title="语音音量">
          <OptionSlider :initValue="userdataStore.userDataState.optionData.volumeMain"
            uniqueID="语音音量" :onChange="(event:any) => {
              userdataStore.userDataState.optionData.vocalVolume = parseInt(event.target.value)
              controllerStore.setStorage();
              userdataStore.setVolume();
            }"
          />
        </NormalOption>
        <NormalOption key="option6" title="背景音乐音量">
          <OptionSlider :initValue="userdataStore.userDataState.optionData.volumeMain"
            uniqueID="背景音乐音量" :onChange="(event:any) => {
              userdataStore.userDataState.optionData.bgmVolume = parseInt(event.target.value)
              controllerStore.setStorage();
              userdataStore.setVolume();
            }"
          />
        </NormalOption>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import NormalOption from './NormalOption.vue';
import NormalButton from './NormalButton.vue';
import OptionSlider from './OptionSlider.vue';
import TextPreview from './TextPreview.vue';
import { PlaySpeed,TextSize } from '../../../../interface/stateInterface/userDataInterface'
import { UserDataStore } from '../../../../store/UserDataStore'
import { ControllerStore } from '../../../../store/ControllerStore';
import { ref } from 'vue';

const userdataStore = UserDataStore()
const controllerStore = ControllerStore()
</script>

<style lang="scss" scoped>
.Options_main {
  position: absolute;
  cursor: default;
  height: 90%;
  width: 100%;
  background: rgba(255, 255, 255, 0.65);
}
.Options_top {
  height: 15%;
  width: 100%;
  display: flex;
  align-items: flex-start;
}
.Options_title {
  font-family: "思源宋体", serif;
  letter-spacing: 0.1em;
  font-size: 225%;
  margin: 0.5em 0 0.5em 0;
  padding: 0.2em 2em 0.2em 1.1em;
  box-sizing: border-box;
  //background-color: rgba(255, 255, 255, 0.99);
  //border-right: .2em solid rgba(81, 110, 65, 0.9);
  //box-shadow: .1em .1em .8em .2em rgba(0, 0, 0, 0.07);
}
.Option_title_text {
  font-size: 165%;
  font-weight: bold;
  color: transparent;
  background: linear-gradient(to left, #227D51, rgba(81, 110, 65, 1));
  -webkit-background-clip: text;
  animation: Elements_in ease-out 0.7s forwards;
}

.Option_title_text_shadow {
  position: absolute;
  color: rgba(0, 0, 0, 0);
  -webkit-text-stroke: 3px rgba(0, 0, 0, 1);
  z-index: -1;
}

.Option_title_text_ts {
  position: absolute;
  color: rgba(0, 0, 0, 0);
  text-shadow: 0.04em 0.04em rgba(81, 110, 65, 0.9),
  0.05em 0.05em rgba(81, 110, 65, 0.9),
  0.06em 0.06em rgba(81, 110, 65, 0.9),
  0.07em 0.07em rgba(81, 110, 65, 0.9);
  //0.08em 0.08em rgba(81, 110, 65, 0.9),
  //0.09em 0.09em rgba(81, 110, 65, 0.9),
  //0.10em 0.10em rgba(81, 110, 65, 0.9),
  //0.11em 0.11em rgba(81, 110, 65, 0.9),
  //0.12em 0.12em rgba(81, 110, 65, 0.9);
  z-index: -1;
}
.Options_main_content {
  height: 85%;
  display: flex;
}
.Options_main_content_half {
  width: 50%;
  display: flex;
  flex-flow: row;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  padding: 1em 1em 1em 1em;
}

</style>