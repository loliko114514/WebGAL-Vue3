<template>
  <div class="Save_Load_main">
    <div class="Save_Load_top">
      <div class="Save_Load_title">
        <div class="Save_title_text">存档</div>
      </div>
      <div class="Save_Load_top_buttonList">
        <Page/>
      </div>
    </div>
    <div
      class="Save_Load_content"
      :id="'Save_content_page_' + userdataStore.userDataState.optionData.slPage"
    >
      <ShowSave v-if="userdataStore.userDataState.saveData.length!==0"/>
    </div>
  </div>
</template>

<script setup lang='ts'>
import ShowSave from './ShowSave.vue';
import Page from './Page.vue';
import { UserDataStore } from '../../../store/UserDataStore';

const userdataStore = UserDataStore()

</script>

<style lang="scss" scoped>
.Save_Load_main {
  height: 90%;
  width: 100%;
  position: absolute;
  cursor: default;
}

.Save_Load_top {
  height: 10%;
  width: 100%;
  display: flex;
  background-color: rgba(255, 255, 255, 1);
  //box-shadow: 0 0 1.5em 0.1em rgba(0, 0, 0, 0.05);
  animation: Elements_in ease-out 1s forwards;
  //border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.Save_Load_title {
  font-family: "思源宋体", serif;
  letter-spacing: 0.1em;
  width: auto;
  height: 100%;
  font-size: 275%;
  margin: 0 0 0 0.8em;
  padding: 0 0.8em 0 0.8em;
  box-sizing: border-box;
  //border-bottom: 4px solid #77428D;
  display: flex;
  justify-content: center;
}

.Save_title_text {
  height: 100%;
  font-size: 125%;
  font-weight: bold;
  color: transparent;
  background: linear-gradient(135deg, #77428D 0%, #B28FCE 100%);
  text-shadow: 2px 2px 15px rgba(255, 255, 255, 0.5);
  -webkit-background-clip: text;
}
.Save_Load_top_buttonList {
  height: 100%;
  display: flex;
  padding: 0 0 0 2em;
}
.Save_Load_content {
  height: 90%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}

</style>
