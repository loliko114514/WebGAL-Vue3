<template>
  <div class="MenuPanel_main">
    <MenuPanelButton iconName="save" :buttonOnClassName="SaveTagOn" :iconColor="SaveIconColor"
      :tagColor="SaveTagColor"
      :clickFunc="()=>{
        guistate.currentMenuTag = MenuPanelTag.Save
      }" 
      tagName="存档" key="saveButton"/>
    <MenuPanelButton iconName="load" :buttonOnClassName="LoadTagOn" :iconColor="LoadIconColor"
      :tagColor="LoadTagColor"
      :clickFunc="() => {
        guistate.currentMenuTag = MenuPanelTag.Load
      }"
      tagName="读档" key="loadButton"/>
    <MenuPanelButton iconName="option" :buttonOnClassName="OptionTagOn" :iconColor="OptionIconColor"
      :tagColor="OptionTagColor"
      :clickFunc="() => {
        guistate.currentMenuTag = MenuPanelTag.Option
      }"
      tagName="选项" key="optionButton"/>
    <MenuPanelButton iconName="title"
      :clickFunc="() => {
        guistate.showTitle=true
        guistate.showMenuPanel=false
      }"
      tagName="标题" key="titleIcon"/>
    <MenuPanelButton iconName="exit"
      :clickFunc="() => {
        guistate.showMenuPanel=false
      }"
      tagName="返回" key="exitIcon"/>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { GuiStore } from '../../../store/GuiStore'
import { MenuPanelTag } from '../../../interface/stateInterface/guiInterface'
import MenuPanelButton from './MenuPanelButton.vue';
  const guistate = GuiStore().guiState
    // 设置Menu按钮的高亮
  const SaveTagOn = guistate.currentMenuTag === MenuPanelTag.Save ? ` ${undefined}` : ``;
  const LoadTagOn = guistate.currentMenuTag === MenuPanelTag.Load ? ` ${undefined}` : ``;
  const OptionTagOn = guistate.currentMenuTag === MenuPanelTag.Option ? ` ${undefined}` : ``;

  // 设置Menu按钮的颜色
  const SaveTagColor = guistate.currentMenuTag === MenuPanelTag.Save ? `rgba(74, 34, 93, 0.9)` : `rgba(8, 8, 8, 0.3)`;
  const LoadTagColor = guistate.currentMenuTag === MenuPanelTag.Load ? `rgba(11, 52, 110, 0.9)` : `rgba(8, 8, 8, 0.3)`;
  const OptionTagColor = guistate.currentMenuTag === MenuPanelTag.Option ? `rgba(81, 110, 65, 0.9)` : `rgba(8, 8, 8, 0.3)`;

  // 设置Menu图标的颜色
  const SaveIconColor = guistate.currentMenuTag === MenuPanelTag.Save ? `rgba(74, 34, 93, 0.9)` : `rgba(185, 185, 185, 1)`;
  const LoadIconColor = guistate.currentMenuTag === MenuPanelTag.Load ? `rgba(11, 52, 110, 0.9)` : `rgba(185, 185, 185, 1)`;
  const OptionIconColor = guistate.currentMenuTag === MenuPanelTag.Option ? `rgba(81, 110, 65, 0.9)` : `rgba(185, 185, 185, 1)`;
</script>

<style lang="scss" scoped>
.MenuPanel_main {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 1);
    //box-shadow: 0 0 45px 15px rgba(0, 0, 0, 0.05);
}

</style>