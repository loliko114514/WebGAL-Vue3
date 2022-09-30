import localforage from "localforage";
import { IUserData } from "../../interface/stateInterface/userDataInterface";
import { ControllerStore } from "../../store/ControllerStore";
import { UserDataStore } from "../../store/UserDataStore";

/**
 * 写入本地存储
 */
export const setStorage = debounce(()=>{
  const controllerStore = ControllerStore()
  const userDataState = UserDataStore().userDataState
  const userData = JSON.parse(JSON.stringify(userDataState))  // 去除proxy代理属性
  localforage.setItem(controllerStore.gameInfo.gameKey,userData).then(() => {
    console.log('写入本地存储')
  });  
},100)

/**
 * 从本地存储获取数据
 */
 export const getStorage = debounce(()=>{
  const userDataStore = UserDataStore()
  const controllerStore = ControllerStore()
  localforage.getItem(controllerStore.gameInfo.gameKey).then((newUserData) => {
    // 如果没有数据或者属性不完全，重新初始化
    if (!newUserData || !checkUserDataProperty(newUserData)) {
      console.log('现在重置数据');
      setStorage();
      return;
    }
    userDataStore.resetUserData(newUserData as IUserData)
  });  
},100)


/**
 * 同步本地存储
 */
 export const syncStorageFast = ()=>{
  const userDataStore = UserDataStore()
  const controllerStore = ControllerStore()
  const userDataState = userDataStore.userDataState
  const userData = JSON.parse(JSON.stringify(userDataState))  // 去除proxy代理属性
  localforage.setItem(controllerStore.gameInfo.gameKey,userData).then(()=>{
    localforage.getItem(controllerStore.gameInfo.gameKey).then((newUserData) => {
      // 如果没有数据，初始化
      if (!newUserData) {
        setStorage();
        return;
      }
      userDataStore.resetUserData(newUserData as IUserData)
    })
  })
}

/**
 * 防抖函数
 * @param func 要执行的函数
 * @param wait 防抖等待时间
 */
function debounce<T, K>(func: (...args: T[]) => K, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;

  function context(...args: T[]): K {
    clearTimeout(timeout);
    let ret!: K;
    timeout = setTimeout(() => {
      ret = func.apply(context, args);
    }, wait);
    return ret;
  }
  return context;
}

/**
     * 检查用户数据属性是否齐全
     * @param userData 需要检查的数据
     */
function checkUserDataProperty(userData: any) {
  const userDatakey = UserDataStore().userDataState
  let result = true;
  for (const key in userDatakey) {
    if (!userData.hasOwnProperty(key)) {
      result = false;
    }
  }
  return result;
}