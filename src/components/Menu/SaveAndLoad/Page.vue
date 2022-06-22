<template>
  <div 
  v-for="i in 20"
  @click="
  userdateStore.setSlPage(i)
  setStorage()
  "
  :key="'Save_element_page'+i"
  :class="`Save_Load_top_button ${userdateStore.userDataState.optionData.slPage===i?'Save_Load_top_button_on':''}`">
    <div class="Save_Load_top_button_text">{{i}}</div>
  </div>
</template>

<script setup lang='ts'>
import { UserDataStore } from '../../../store/UserDataStore';

const userdateStore = UserDataStore()

</script>

<style lang="scss" scoped>
.Save_Load_top_button {
  cursor: pointer;
  font-size: 200%;
  width: 65px;
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-bottom: 4px solid rgba(0, 0, 0, 0);
  transition: background-color 0.7s, border-bottom-width 0.7s;
}

.Save_Load_top_button_text {
  text-align: center;
  width: 100%;
  padding: 0 0 3px 0;
  border-left: 2px solid rgba(0, 0, 0, 0.1);
}

.Save_Load_top_button:first-child > div {
  border-left: 2px solid rgba(0, 0, 0, 0);
}

.Save_Load_top_button_on {
  font-weight: bold;
  border-bottom: 4px solid #77428D;
  color: #77428D;
  background-color: rgba(119, 66, 141, 0.05);
}

.Save_Load_top_button:hover {
  color: #77428D;
  font-weight: bold;
  border-bottom: 4px solid #77428D;
}
</style>