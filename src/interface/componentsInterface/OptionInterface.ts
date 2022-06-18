/**
 * @interface INormalButton 普通按钮的参数
 */

 export interface INormalButton {
     textList: Array<string>
     functionList: Array<any>
     currentChecked: number
 }
 
 export interface ISlider {
     uniqueID: string
     initValue: number
 }
 