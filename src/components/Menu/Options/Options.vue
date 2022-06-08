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
            ()=>{
              
            }
          ]"></NormalButton>
        </NormalOption>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import NormalOption from './NormalOption.vue';
import NormalButton from './NormalButton.vue';
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