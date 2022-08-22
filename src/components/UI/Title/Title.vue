<template>
  <div v-if="guiStore.guiState.showTitle" class="Title_main" :style="{'background-image':`url(${titleBg})`}" >
    <div
        id="play_title_bgm_target"
        @click="() => {
          playBgm(guiStore.guiState.titleBgm);
        }"
      />
    <div class="Title_buttonList">
      <div v-for="(item,i) in titlelist" class="Title_button" id="leftTitleButton" @click="item.fun()" @mouseenter="()=>{item.hover = true}" @mouseleave="()=>{item.hover = false}">
        <div class="Title_button_text" :class="{Title_button_text_hover:item.hover}">{{item.text}}</div>
        <div class="border" :class="{border_hover:item.hover}">{{item.text}}</div>
      </div>
    </div>
  </div>
</template>                
  
<script setup lang='ts'>
import TitleButton from './TitleButton.vue';
import { GuiStore } from '../../../store/GuiStore'
import { ControllerStore } from '../../../store/ControllerStore';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { nextSentence } from '../../../controller/gamePlay/nextSentence';
import { playBgm } from '../../../controller/stage/playBgm';
import { StageStore } from '../../../store/StageStore';
const guiStore = GuiStore()
const stageStore = StageStore()
const controllerStore = ControllerStore()
const titleBg = computed(()=>guiStore.$state.guiState.titleBg)
const beginGame = ():void=>{
  stageStore.stageState.bgm = ''
  guiStore.guiState.showTitle = false
  if(controllerStore.runtime_currentSceneData.currentSentenceId === 0&&
  controllerStore.runtime_currentSceneData.currentScene.sceneName === 'start.txt'){
    nextSentence()
  }
}
const continueGame = ():void=>{
  console.log("继续游戏")
}
const showMenuOption = ():void=>{
  guiStore.guiState.showMenuPanel = true
}
const onLoadGame = ():void=>{
  console.log("读取存档")
}
const exit = ():void=>{
  console.log("退出游戏")
}
interface TitleSelect {
  hover:boolean,
  fun:Function,
  text:string
}
const titlelist:TitleSelect[] = reactive([
  {
    hover:false,
    fun:beginGame,
    text:"开始游戏"
  },
  {
    hover:false,
    fun:continueGame,
    text:"继续游戏"
  },
  {
    hover:false,
    fun:showMenuOption,
    text:"游戏选项"
  },
  {
    hover:false,
    fun:onLoadGame,
    text:"读取存档"
  },
  {
    hover:false,
    fun:exit,
    text:"退出游戏"
  },
])


</script>
  
<style lang="scss" scoped>
.Title_main{
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 13;
  background-repeat: no-repeat;
  background-size:cover;
}



.Title_buttonList{
    font-family: "思源宋体", serif;
    display: flex;
    position: absolute;
    top: 40%;
    left: 12%;
    height: 50%;
    // background: rgba(0, 0, 0, 0.4);
    width: 20%;
    flex-flow:column;
    letter-spacing: 0.25em;
    transition: background 0.7s;
}

// .Title_buttonList:hover {
//     background: rgba(0, 0, 0, 0.6);
// }

.Title_button {
    position: relative;
    font-weight: bold;
    // text-align: center;
    flex: 0 1 auto;
    height: 12%;
    width: 100%;
    cursor: pointer;
    //margin: 0 0.5em 0 0.5em;
    transition: background-color 0.3s, transform 0.3s, text-shadow 0.3s;
    //text-shadow: 0 0 10px rgba(0, 0, 0, 0.75);
  }

// .Title_button:hover {
//     //background-color: rgba(255, 255, 255, 0.1);
//     text-shadow: 0 0 10px rgba(255, 255, 255, 1);
//     transform: scale(1.025, 1.025) translate(0, -0.05em);
// }


.Title_button_text {
    font-size: 215%;
    color: transparent;
    background: linear-gradient(135deg, #115abe 0%, #115abe 100%);
    -webkit-background-clip: text;
    padding: 0 0.5em 0 0.5em;
    font-weight:900;
    position:relative;
    top: 0;
    left: 0;
    z-index: 1;
}
.Title_button_text_hover{
  color: transparent;
  background: linear-gradient(135deg, #fdfbfb 0%, #fdfbfb 100%);
  -webkit-background-clip: text;
}
.border{
  font-size: 215%;
  padding: 0 0.5em 0 0.5em;
  font-weight:900;
  position:relative;
  top: 0;
  left: 0;
  -webkit-text-stroke:3px #fdfbfb;
  text-shadow: 0 0 10px #fdfbfb;
  z-index: 0;
  position:absolute;
  top: 0;
  left: 0;
  
}
.border_hover{
  -webkit-text-stroke:3px #115abe;
  text-shadow: 0 0 10px #115abe;
  
}
</style>
