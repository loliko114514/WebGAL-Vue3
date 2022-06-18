<template>
  <div class="styles.Options_main">

    <div class="styles.Options_top">
      <div class="styles.Options_title">
        <div class="styles.Option_title_text">选项</div>
      </div>
    </div>

    <div class="Options_main_content">
      <div class="Options_main_content_half">
        <NormalOption key="option0" title="文字显示速度">
          <NormalButton 
          :textList="['慢', '中', '快']" 
          :functionList="[
            ()=>{userdataStore.setTextSpeed(PlaySpeed.slow)
              userdataStore.setStorage()},
            ()=>{userdataStore.setTextSpeed(PlaySpeed.normal)
            userdataStore.setStorage()},
            ()=>{userdataStore.setTextSpeed(PlaySpeed.fast)
            userdataStore.setStorage()},
          ]"
          :currentChecked="userdataStore.initState.optionData.textSpeed"></NormalButton>
        </NormalOption>
        <NormalOption key="option1" title="自动播放速度">
          <NormalButton 
          :textList="['慢', '中', '快']" 
          :functionList="[
            ()=>{userdataStore.setAutoSpeed(PlaySpeed.slow)
            userdataStore.setStorage()},
            ()=>{userdataStore.setAutoSpeed(PlaySpeed.normal)
            userdataStore.setStorage()},
            ()=>{userdataStore.setAutoSpeed(PlaySpeed.fast)
            userdataStore.setStorage()},
          ]"
          :currentChecked="userdataStore.initState.optionData.autoSpeed"></NormalButton>
        </NormalOption>
        <NormalOption key="option2" title="文本大小">
          <NormalButton 
          :textList="['小', '中', '大']" 
          :functionList="[
            ()=>{userdataStore.setTextSize(TextSize.small)
            userdataStore.setStorage()},
            ()=>{userdataStore.setTextSize(TextSize.medium)
            userdataStore.setStorage()},
            ()=>{userdataStore.setTextSize(TextSize.large)
            userdataStore.setStorage()},
          ]"
          :currentChecked="userdataStore.initState.optionData.textSize"></NormalButton>
        </NormalOption>
        <NormalOption key="option3" title="文本显示预览">
          <TextPreview />
        </NormalOption>
      </div>

      <div>
        <NormalOption key="option4" title="主音量">
          <OptionSlider :initValue="userdataStore.initState.optionData.volumeMain"
            uniqueID="主音量" :onChange="(event:any) => {
              userdataStore.initState.optionData.volumeMain = parseInt(event.target.value)
              userdataStore.setStorage();
              userdataStore.setVolume();
            }"
          />
        </NormalOption>
        <NormalOption key="option5" title="语音音量">
          <OptionSlider :initValue="userdataStore.initState.optionData.volumeMain"
            uniqueID="语音音量" :onChange="(event:any) => {
              userdataStore.initState.optionData.vocalVolume = parseInt(event.target.value)
              userdataStore.setStorage();
              userdataStore.setVolume();
            }"
          />
        </NormalOption>
        <NormalOption key="option6" title="背景音乐音量">
          <OptionSlider :initValue="userdataStore.initState.optionData.volumeMain"
            uniqueID="背景音乐音量" :onChange="(event:any) => {
              userdataStore.initState.optionData.bgmVolume = parseInt(event.target.value)
              userdataStore.setStorage();
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
import { PlaySpeed,TextSize } from '../../../interface/stateInterface/userDataInterface'
import { UserDataStore } from '../../../store/UserDataStore'
import { ref } from 'vue';

const userdataStore = UserDataStore()

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