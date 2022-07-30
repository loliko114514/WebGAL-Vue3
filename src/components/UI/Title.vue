<template>
    <div class="Title_main" :style="{'background-image':`url(${titleBg})`}" >
      <div
          id="play_title_bgm_target"
          @click="() => {
            playBgm(guiStore.guiState.titleBgm);
          }"
        />
      <div class="Title_buttonList">
        <div class="Title_button" id="leftTitleButton" @click="hideTitle()">
          <div class="Title_button_text Title_button_text_up">开始游戏</div>
          <div class="Title_button_text">START</div>
        </div>
        <div class="Title_button" @click="continueGame()">
          <div class="Title_button_text Title_button_text_up">继续游戏</div>
          <div class="Title_button_text">CONTINUE</div>
        </div>
        <div class="Title_button" @click="showMenuOption()">
          <div class="Title_button_text Title_button_text_up">游戏选项</div>
          <div class="Title_button_text">OPTIONS</div>
        </div>
        <div class="Title_button" @click="onLoadGame()">
          <div class="Title_button_text Title_button_text_up">读取存档</div>
          <div class="Title_button_text">LOAD</div>
        </div>
        <div class="Title_button" @click="exit()">
          <div class="Title_button_text Title_button_text_up">退出游戏</div>
          <div class="Title_button_text">EXIT</div>
        </div>
      </div>
    </div>
</template>                
  
<script setup lang='ts'>
import { GuiStore } from '../../store/GuiStore'
import { ControllerStore } from '../../store/ControllerStore';
import { computed, onMounted, ref, watch } from 'vue';
import { nextSentence } from '../../controller/gamePlay/nextSentence';
import { playBgm } from '../../controller/stage/playBgm';
const guiStore = GuiStore()
const controllerStore = ControllerStore()
const titleBg = computed(()=>guiStore.$state.guiState.titleBg)
  const hideTitle = ():void=>{
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
    guiStore.setShowMenuPanel(true)
  }
  const onLoadGame = ():void=>{
    console.log("读取存档")
  }
  const exit = ():void=>{
    console.log("退出游戏")
  }


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
    bottom: 0;
    height: 12%;
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
    justify-content: space-evenly;
    justify-items: center;
    align-items: center;
    flex-flow: row;
    letter-spacing: 0.25em;
    transition: background 0.7s;
}

.Title_buttonList:hover {
    background: rgba(0, 0, 0, 0.6);
}

.Title_button {
    font-weight: bold;
    text-align: center;
    flex: 0 1 auto;
    cursor: pointer;
    //margin: 0 0.5em 0 0.5em;
    padding: 0.2em 1em 0.2em 1em;
    transition: background-color 0.3s, transform 0.3s, text-shadow 0.3s;
    //text-shadow: 0 0 10px rgba(0, 0, 0, 0.75);
}

.Title_button:hover {
    //background-color: rgba(255, 255, 255, 0.1);
    text-shadow: 0 0 10px rgba(255, 255, 255, 1);
    transform: scale(1.025, 1.025) translate(0, -0.05em);
}


.Title_button_text {
    font-size: 165%;
    color: transparent;
    background: linear-gradient(135deg, #fdfbfb 0%, #dcddde 100%);
    -webkit-background-clip: text;
    padding: 0 0.5em 0 0.5em;
}

.Title_button_text_up {
    font-size: 215%;
    //border-bottom: 2px solid rgba(255, 255, 255, 0.75);
}
</style>
