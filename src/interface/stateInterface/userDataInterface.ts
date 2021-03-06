import { IBacklogItem, sceneEntry } from '../coreInterface/runtimeInterface';
import { IStageState } from './stageInterface';
/**
 * 播放速度的枚举类型
 */
 export enum PlaySpeed {
  slow, // 慢
  normal, // 中
  fast, // 快
}

export enum TextSize {
  small,
  medium,
  large,
}

/**
 * @interface IOptionData 用户设置数据接口
 */
 export interface IOptionData {
  slPage: number // 存读档界面所在页面
  volumeMain: number // 主音量
  textSpeed: PlaySpeed // 文字速度
  autoSpeed: PlaySpeed // 自动播放速度
  textSize: TextSize
  vocalVolume: number // 语音音量
  bgmVolume: number // 背景音乐音量
}

/**
 * 场景存档接口
 * @interface ISaveScene
 */
 export interface ISaveScene {
  currentSentenceId: number // 当前语句ID
  sceneStack: Array<sceneEntry> // 场景栈
  sceneName: string // 场景名称
  sceneUrl: string // 场景url
}

/**
* @interface ISaveData 存档文件接口
*/
export interface ISaveData {
  nowStageState: IStageState
  backlog: Array<IBacklogItem> // 舞台数据
  index: number // 存档的序号
  saveTime: string // 保存时间
  sceneData: ISaveScene // 场景数据
}

/**
 * @interface IUserData 用户数据接口
 */
 export interface IUserData {
  saveData: Array<ISaveData> // 用户存档数据
  optionData: IOptionData // 用户设置选项数据
}

export interface IAppreciationAsset {
  name: string;
  url: string;
  series:string;
}

export interface ISetOptionDataPayload {
  key: keyof IOptionData;
  value: any;
}

export interface ISetUserDataPayload {
  key: keyof IUserData;
  value: any;
}