import { defineStore } from "pinia"
import { IStageState } from '../interface/stateInterface/stageInterface'
import { IGuiState,MenuPanelTag } from '../interface/stateInterface/guiInterface'

export const GuiStore = defineStore('GuiStore',{
    state:()=>{
      return {
        initState:<IStageState> {
          oldBgName: '',
          bgName: '',//背景文件地址（相对或绝对）
          figName: '',//立绘_中 文件地址（相对或绝对）
          figNameLeft: '',//立绘_左 文件地址（相对或绝对）
          figNameRight: '',//立绘_右 文件地址（相对或绝对）
          showText: '',//文字
          showName: '',//人物名
          command: '',//语句指令
          choose: [],//选项列表
          vocal: '',//语音 文件地址（相对或绝对）
          bgm: '',//背景音乐 文件地址（相对或绝对）
          miniAvatar: '',//小头像 文件地址（相对或绝对）
          GameVar: {}, //游戏内变量
          effects: [], //应用的效果
          PerformList: [] //要启动的演出列表
        },
        iGuiState:<IGuiState>{
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