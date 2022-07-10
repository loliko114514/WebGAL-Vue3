import { commandType } from "./sceneInterface";

export interface IConfigInterface {
  scriptString: string,
  scriptType: commandType,
  scriptFunction: Function
}
