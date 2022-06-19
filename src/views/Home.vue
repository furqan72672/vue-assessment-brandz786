<template>
  <Dashboard v-if="tokenStatus"/>
  <Welcome v-else/>
</template>

<script>


import Dashboard from "@/components/Dashboard";
import Welcome from "@/components/Welcome";
export default{
  name:'Home',
  components: {Welcome, Dashboard},
  setup(){
    let tokenStatus=false
    function checkToken(){

      //check token in storage and show page accordingly
      if(localStorage.getItem('token')){
        console.log(localStorage.getItem('token'))
        tokenStatus=true
      }
    }

    //start checking on page load
    checkToken()

    return{
      tokenStatus
    }
  }
}
</script>
