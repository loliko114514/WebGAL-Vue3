<template>
    <div 
      v-for="i in props.textList.length"
      :key="props.textList[i-1] + i"
      :class="`NormalButton ${props.currentChecked===i-1?'NormalButtonChecked':''}`"
      @click="props.functionList[i-1]"
    >
      {{props.textList[i-1]}}
    </div>
</template>

<script setup lang='ts'>
  const props = defineProps<{
    textList: Array<string>
    functionList: Array<any>
    currentChecked: number
  }>()
  console.log('functionList',props.functionList)
</script>

<style lang="scss" scoped>
.NormalButton {
  font-size: 175%;
  box-sizing: border-box;
  padding: 0.2em 1em 0.2em 1em;
  background-color: rgba(50, 50, 50, 0.05);
  margin: 0 0.4em 0 0;
  color: rgba(160,170,160,1);
  cursor: pointer;
}

.NormalButton:hover {
  border-bottom: 2px solid rgba(81, 110, 65, 0.9);
  color: rgba(81, 110, 65, 0.9);
  font-weight: bold;
}

.NormalButtonChecked {
  background-color: rgba(81, 110, 65, 0.15);
  border-bottom: 2px solid rgba(81, 110, 65, 0.9);
  color: rgba(81, 110, 65, 0.9);
  font-weight: bold;
}
</style>