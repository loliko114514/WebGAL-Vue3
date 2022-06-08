/**
 * @interface IGuiState GUI状态接口
 */
export interface IGuiState {
    showStarter:boolean,//是否显示初始界面（用于使得bgm可以播放)
    showTitle: boolean, //是否显示标题界面
    showMenuPanel: boolean, //是否显示Menu界面
    currentMenuTag: MenuPanelTag,//当前Menu界面的选项卡
    titleBgm: string,////标题背景图片
    titleBg: string//标题背景音乐
}

export enum MenuPanelTag {
  Save,//“保存”选项卡
  Load,//“读取”选项卡
  Option//“设置”选项卡
}