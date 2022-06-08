<!-- <template>
  <v-switch :case="props.iconName">
  <template  #save>
    <Save theme="outline" size="1.2em" :fill="props.iconColor" strokeWidth="2"/>
  </template>
  <template  #load>
    <FolderOpen theme="outline" size="1.2em" :fill="props.iconColor" strokeWidth="2"/>
  </template>
  <template  #option>
    <SettingTwo theme="outline" size="1.2em" :fill="props.iconColor" strokeWidth="2"/>
  </template>
  <template  #title>
    <Home theme="outline" size="1.2em" fill="rgba(185,185,185,1)" strokeWidth="2"/>
  </template>
  <template  #exit>
    <Logout theme="outline" size="1.2em" fill="rgba(185,185,185,1)" strokeWidth="2"/>
  </template>
  </v-switch>
</template> -->

<script lang='ts'>
import  {FolderOpen, Home, Logout, Save, SettingTwo } from "@icon-park/vue"
import {defineComponent, h, render } from "vue";
import VSwitch from '../../SwitchTool/VSwitch.vue';
export default defineComponent({
  props:{
    iconName:String,
    iconColor:String
  },
  setup(props){
    props.iconName,
    props.iconColor
  },
  render(){
    console.log(this.iconName)
    switch(this.iconName){
      case "save":
        return h('Save',{theme:'outline',size:'1.2em',fill:this.iconColor,strokeWidth:'2'})
      case "load":
        return h('FolderOpen',{theme:'outline',size:'1.2em',fill:this.iconColor,strokeWidth:'2'})
      case "option":
        return h('SettingTwo',{theme:'outline',size:'1.2em',fill:this.iconColor,strokeWidth:'2'})
      case "title":
        return h('Home',{theme:'outline',size:'1.2em',fill:this.iconColor,strokeWidth:'2'})
      case "exit":
        return h('Logout',{theme:'outline',size:'1.2em',fill:this.iconColor,strokeWidth:'2'})
    }
  }
})
</script>

<style lang="scss" scoped>

</style>