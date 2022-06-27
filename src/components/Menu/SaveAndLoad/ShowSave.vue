<template>
  <div
    v-for="i in list"
    @click="controllerStore.saveGame(1)"
    :key="'saveElement'+i"
    class="Save_Load_content_element"
    :style="{'animation-delay':i*30+'ms'}"
    >
    <div class="Save_Load_content_element_top">
      <div class="Save_Load_content_element_top_index">{{saveData[i].index}}</div>
      <div class="Save_Load_content_element_top_date">{{saveData[i].saveTime}}</div>
    </div>
    <div class="Save_Load_content_miniRen">
      <img v-if="saveData[i].nowStageState.bgName!==''"
        class="Save_Load_content_miniRen_bg"
        alt="Save_img_preview"
        :src="saveData[i].nowStageState.bgName"
      />
      <div v-if="saveData[i].nowStageState.bgName!==''" :style="{'background':'rgba(0,0,0,0.6)','width':'100%', 'height': '100%'}"></div>
      <img v-if="saveData[i].nowStageState.figNameLeft!==''"
        class="Save_Load_content_miniRen_figure Save_Load_content_miniRen_figLeft"
        alt="Save_img_previewLeft"
        :src="saveData[i].nowStageState.figNameLeft"
      />
      <img v-if="saveData[i].nowStageState.figNameRight!==''"
        class="Save_Load_content_miniRen_figure Save_Load_content_miniRen_figRight"
        alt="Save_img_previewRight"
        :src="saveData[i].nowStageState.figNameRight"
      />
      <div v-if="saveData[i].nowStageState.figName!==''" 
        class="Save_Load_content_miniRen_figMiddle">
          <img class="Save_Load_content_miniRen_figure"
            alt="Save_img_preview"
            :src="saveData[i].nowStageState.figName" />
      </div>
    </div>
    <div class="styles.Save_Load_content_text">
      <div class="styles.Save_Load_content_speaker">{{saveData[i].nowStageState.showName}}</div>
      <div class="styles.Save_Load_content_text_padding">{{saveData[i].nowStageState.showText}}</div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref,reactive } from 'vue';
import { UserDataStore } from '../../../store/UserDataStore';
import { ControllerStore } from '../../../store/ControllerStore';
import { computed } from '@vue/reactivity';

const controllerStore = ControllerStore()
const userdataStore = UserDataStore()
let list = computed(()=>{
  const start = (userdataStore.userDataState.optionData.slPage-1)*10+1
  let list = new Array(10)
  for(let i=start;i<start+10;i++){
  list.push(i)
  }
  return list
})

let saveData = computed(()=>{
  return userdataStore.userDataState.saveData
})




</script>

<style lang="scss" scoped>
.Save_Load_content {
  height: 90%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}

.Save_Load_content_element {
  //background: linear-gradient(-45deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 100%);
  background: linear-gradient(-45deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.075));
  overflow: hidden;
  //border: 1px solid rgba(255, 255, 255, 1);
  width: 17.5%;
  height: 45%;
  //box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  animation: Elements_in 1s ease-out forwards, Elements_in_transform 1s ease-out;
  opacity: 0;
  border-radius: 4px;
  transition: transform 0.25s, box-shadow 0.25s;
  cursor: pointer;
}

.Save_Load_content_element:hover {
  //box-shadow: 0 0 25px 8px rgba(0, 0, 0, 0.1);
  transform: scale(1.05, 1.05) translate(-0.2em, -0.2em);
}


.Save_Load_content_element_top {
  font-family: "思源宋体", serif;
  width: 100%;
  height: 12%;
  display: flex;
}

.Save_Load_content_element_top_index {
  color: rgba(255, 255, 255, 1);
  text-align: center;
  font-size: 155%;
  height: 100%;
  width: 20%;
  background-color: #B28FCE;
}

.Load_content_elememt_top_index {
  background-color: #51A8DD;
}

.Save_Load_content_element_top_date {
  padding: 0.1em 0 0 0.5em;
  background-color: #77428D;
  color: rgba(255, 255, 255, 1);
  font-size: 145%;
  height: 100%;
  width: 80%;
}

.Load_content_element_top_date {
  background-color: #005CAF;
}

.Save_Load_content_text {
  font-family: "WebgalUI", sans-serif;
  letter-spacing: 0.05em;
  color: #373C38;
  background: linear-gradient(-45deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 1) 100%);
  //background: rgba(255,255,255,1);
  font-size: 120%;
  height: 40%;
  width: 100%;
  //box-sizing: border-box;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.Save_Load_content_text_padding {
  padding: 0.2em 0.75em 0.2em 0.75em;
}

.Save_Load_content_speaker {
  box-sizing: border-box;
  //margin: 0.35em 0 0 0;
  //background: rgba(0, 0, 0, 0.04);
  font-weight: bold;
  color: #77428D;
  padding: 0.35em 0.8em 0.25em 0.8em;
  width: 100%;
  //border-radius: 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.Load_content_speaker {
  color: #005caf;
}


.Load_content_text {
  background-color: rgba(0, 92, 175, 0.75);
}

.Save_Load_content_miniRen {
  width: 100%;
  height: 48%;
  position: relative;
}

.Save_Load_content_miniRen_bg {
  background-size: cover;
  height: 100%;
  width: 100%;
  background-position: center;
}

.Save_Load_content_miniRen_figure {
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  position: absolute;
  bottom: 0;
}

.Save_Load_content_miniRen_figLeft {
  bottom: 0;
  left: 0;
}

.Save_Load_content_miniRen_figRight {
  bottom: 0;
  right: 0;
}

.Save_Load_content_miniRen_figMiddle{
  display: 'flex';
  width: '100%';
  height: '100%';
  position: 'absolute';
  bottom: '0';
  justify-content: 'center';
}


@keyframes Elements_in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes Elements_in_transform {
  0% {
    transform: scale(1.05, 1.05) translate(-25px, -20px) rotateY(15deg) rotateX(-15deg);
  }
  100% {
    transform: scale(1, 1) translate(0, 0);
  }
}
</style>