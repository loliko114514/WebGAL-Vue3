<template>
   <n-icon v-if="props.iconName==='save'" :color="props.iconColor.toString()" size="32" :component="SaveOutline" />
   <n-icon v-if="props.iconName==='load'" :color="props.iconColor.toString()" size="32" :component="FolderOpenOutline" />
   <n-icon v-if="props.iconName==='option'" :color="props.iconColor.toString()" size="32" :component="SettingsOutline" />
   <n-icon v-if="props.iconName==='title'" color="rgba(185, 185, 185, 1)" size="32" :component="HomeOutline" />
   <n-icon v-if="props.iconName==='exit'" color="rgba(185, 185, 185, 1)" size="32" :component="ExitOutline" />
</template>

<script setup lang='ts'>
import { SaveOutline, FolderOpenOutline, SettingsOutline, HomeOutline, ExitOutline } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
  const props = defineProps<{
    iconColor:String
    iconName:String
  }>()
  console.log(props.iconColor+' '+props.iconName)

</script>

<style lang="scss" scoped>

</style>