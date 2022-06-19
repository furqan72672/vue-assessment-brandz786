<template>
  <v-btn id="btn"
         :class="[color==='pri'?'btn-primary':'btn-secondary',size==='sma'?'small':size==='med'?'medium':'large']"
         :disabled="disable">{{ label }}
  </v-btn>
</template>

<script>
export default {
  name: "Button",
  props: {
    label: {
      type:String,
      default:'Submit'
    },
    size:{
      //check that prop passed from parent is only one of the following
      //enum concept
      validator(value) {
        return ['sma', 'med', 'lar'].includes(value)
      },
      default: 'med'
    },
    color:{
      //check that prop passed from parent is only one of the following
      //enum concept
      validator(value) {
        return ['pri', 'sec'].includes(value)
      },
      default: 'pri'
    },
    disable:{
      type:Boolean,
      default:false
    }
  },
  setup(props){

  }
}
</script>

<style scoped>
.small{
  height: 35px;
  width: 8vw;
}
.medium{
  height: 35px;
  width: 10vw;
}
.large{
  height: 35px;
  width: 12vw;
 }
</style>
