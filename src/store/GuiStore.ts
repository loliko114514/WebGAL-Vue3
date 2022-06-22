import { defineStore } from "pinia"
import { IGuiState,MenuPanelTag } from '../interface/stateInterface/guiInterface'

export const GuiStore = defineStore('GuiStore',{
    state:()=>{
      return {
        guiState:<IGuiState>{
          showStarter:true,//是否显示初始界面（用于使得bgm可以播放)
          showTitle: true,//是否显示标题界面
          showMenuPanel: false,//是否显示Menu界面
          currentMenuTag: MenuPanelTag.Option,//当前Menu界面的选项卡
          titleBg: 'Title',//标题背景图片
          titleBgm: 'Title'//标题背景音乐
        }
      }
    },
    actions:{
      
    }
})