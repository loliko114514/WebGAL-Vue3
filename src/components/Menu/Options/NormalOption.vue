<template>
  <div  class="styles.NormalOption">
    <div class="styles.NormalOption_title">{{props.title}}</div>
    <div class="styles.NormalOption_buttonList">{{props.children}}</div>
  </div>
</template>

<script setup lang='ts'>
  const props = defineProps<{
    title:String
    children?:String
  }>()
</script>

<style lang="scss" scoped>

</style>