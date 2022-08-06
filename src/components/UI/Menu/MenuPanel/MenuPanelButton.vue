<template>
  <div :class="buttonClassName"
    :style="`color: ${props.tagColor}`"
    @click="()=>{props.clickFunc()}"
  >
    <div class="MenuPanel_button_icon">
      <MenuIconMap :iconName="props.iconName" :iconColor="props.iconColor!"/>
    </div>
    {{props.tagName}}
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import MenuIconMap from "./MenuIconMap.vue"

interface IMenuPanel {
  clickFunc?: any // 点击事件触发的函数
  buttonOnClassName?: string // 按钮激活（在当前按钮对应页面）时的className
  tagColor?: string // 标签颜色
  iconColor?: string // 图标颜色
  tagName?: string // 标签显示名称
  iconName: string // 图标名称
}
  const props = defineProps<IMenuPanel>()
  let buttonClassName = ref("MenuPanel_button")
  if(props.buttonOnClassName){
    buttonClassName = ref(buttonClassName.value + props.buttonOnClassName)
  }
</script>

<style lang="scss" scoped>
.MenuPanel_button {
    padding: 0.35em 0 0 0 ;
    display: flex;
    justify-content: center;
    font-size: 200%;
    text-align: center;
    font-weight: bold;
    width: 15%;
    cursor: pointer;
    color: rgba(8, 8, 8, 0.3);
    overflow: hidden;
    border-right: 1.5px solid rgba(0, 0, 0, 0.15);
    transition: text-shadow 0.7s, backgroud 0.7s;
}

.MenuPanel_button:hover {
    background: radial-gradient(50% 50%, rgba(180, 181, 182, 0.25) 0%,rgba(180, 181, 182, 0.1) 75%, rgba(0, 0, 0, 0) 100%);
}

.MenuPanel_button:last-child {
    border-right: none;
}

.MenuPanel_button_icon {
    transform: translate(0, 0.05em);
    padding: 0.10em 0.15em 0 0;
    margin: 0.10em 0.15em 0 0;
}

</style>