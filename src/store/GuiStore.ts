import { defineStore } from "pinia"
import { IGuiState,MenuPanelTag } from '../interface/stateInterface/guiInterface'

export const GuiStore = defineStore('GuiStore',{
    state:()=>{
      return {
        guiState:<IGuiState>{
          showBacklog: false,
          showStarter: true,
          showTitle: true,
          showMenuPanel: false,
          showTextBox: true,
          currentMenuTag: MenuPanelTag.Option,
          titleBg: '',
          titleBgm: '',
          showExtra: false,
        }
      }
    },
    actions:{
      setCurrentMenuTag(tag:MenuPanelTag){
        this.guiState.currentMenuTag=tag
      },
      setShowTitle(showTitle:boolean){
        this.guiState.showTitle = showTitle
      },
      setShowMenuPanel(showMenuPanel:boolean){
        this.guiState.showMenuPanel = showMenuPanel
      },
      settitleBg(url:string){
        this.guiState.titleBg = url
      },
      settitleBgm(url:string){
        this.guiState.titleBgm = url
      }
    }
})