<template>
  <div class="ToCenter">
    <div v-if="showTextBox && enableFilm" class="main">
      <span v-if="showTextBox" className="singleButton" @click="() => setComponentVisibility('showTextBox', false)">
        <PreviewCloseOne class="button" theme="outline" size="30" fill="#f5f5f7" strokeWidth={3.5}/>
        <span class="button_text">隐藏</span>
      </span>
      {!GUIStore.showTextBox && (
        <span className={styles.singleButton} onClick={() => setComponentVisibility('showTextBox', true)}>
          <PreviewOpen className={styles.button} theme="outline" size="30" fill="#f5f5f7" strokeWidth={3.5}/>
          <span className={styles.button_text}>显示</span>
        </span>
      )}
      <span className={styles.singleButton} onClick={() => {
        setComponentVisibility('showBacklog', true);
        setComponentVisibility('showTextBox', false);
      }}>
        <AlignTextLeftOne className={styles.button} theme="outline" size="30" fill="#f5f5f7" strokeWidth={3.5}/>
        <span className={styles.button_text}>回想</span>
      </span>
      <span className={styles.singleButton} onClick={() => {
        let VocalControl: any = document.getElementById('currentVocal');
        if (VocalControl !== null) {
          VocalControl.currentTime = 0;
          VocalControl.pause();
          VocalControl.play();
        }
      }}>
        <ReplayMusic className={styles.button} theme="outline" size="30" fill="#f5f5f7" strokeWidth={3.5}/>
        <span className={styles.button_text}>重播</span>
      </span>
      <span id="Button_ControlPanel_auto" className={styles.singleButton} onClick={switchAuto}>
        <PlayOne className={styles.button} theme="outline" size="30" fill="#f5f5f7" strokeWidth={3.5}/>
        <span className={styles.button_text}>自动</span>
      </span>
      <span id="Button_ControlPanel_fast" className={styles.singleButton} onClick={switchFast}>
        <DoubleRight className={styles.button} theme="outline" size="30" fill="#f5f5f7" strokeWidth={3.5}/>
        <span className={styles.button_text}>快进</span>
      </span>
      <span
        className={styles.singleButton}
        onClick={() => {
          setMenuPanel(MenuPanelTag.Save);
          setComponentVisibility('showMenuPanel', true);
        }}
      >
        <Save className={styles.button} theme="outline" size="30" fill="#f5f5f7" strokeWidth={3.5}/>
        <span className={styles.button_text}>存档</span>
      </span>
      <span
        className={styles.singleButton}
        onClick={() => {
          setMenuPanel(MenuPanelTag.Load);
          setComponentVisibility('showMenuPanel', true);
        }}
      >
        <FolderOpen className={styles.button} theme="outline" size="30" fill="#f5f5f7" strokeWidth={3.5}/>
        <span className={styles.button_text}>读档</span>
      </span>
      <span
        className={styles.singleButton}
        onClick={() => {
          setMenuPanel(MenuPanelTag.Option);
          setComponentVisibility('showMenuPanel', true);
        }}
      >
        <SettingTwo className={styles.button} theme="outline" size="30" fill="#f5f5f7" strokeWidth={3.5}/>
        <span className={styles.button_text}>选项</span>
      </span>
      <span
        className={styles.singleButton}
        onClick={() => {
          backToTitle();
        }}
      >
        <Home className={styles.button} theme="outline" size="30" fill="#f5f5f7" strokeWidth={3.5}/>
        <span className={styles.button_text}>标题</span>
      </span>
    </div>}
  </div>
</template>

<script setup lang='ts'>
import { GuiStore } from '../../../store/GuiStore.js';
import { computed } from '@vue/reactivity';
import { StageStore } from '../../../store/StageStore.js';

const guiStore = GuiStore()
const stageStore = StageStore()
const enableFilm = computed(()=>stageStore.stageState.enableFilm)
const showTextBox = computed(()=>guiStore.guiState.showTextBox)
</script>

<style lang="scss" scoped>
</style>