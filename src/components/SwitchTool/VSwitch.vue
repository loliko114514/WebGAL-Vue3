<script lang='ts'>
  import { defineComponent ,h } from 'vue';
  import  {FolderOpen, Home, Logout, Save, SettingTwo } from "@icon-park/vue"
  import { Slots } from 'vue';
  export default defineComponent({
    props:["case"],
    setup(props,{slots}){
      console.log(slots)
      return()=>{
        if(slots[props.case]){
          return slots[props.case]!()
        }
      }
    },
  })
</script>
  
<style>
  
</style>