<template>
  <div class="d-flex flex-column align-center">
    <h1>Register</h1>
    <TextField class="mt-4" label="Email" type="email" :rule="['required','email']"  @updateModel="updateEmail"/>
    <TextField class="mt-4" label="Password" type="password" :rule="['required','minimum']"  @updateModel="updatePass1"/>
    <TextField class="mt-4" label="Confirm Password" type="password" :rule="[]" @updateModel="updatePass2"/>
    <div class="d-flex align-start" style="width: 30vw">
      <p class="text-red" style="font-size: 12px">{{matchError}}</p>
    </div>
    <Button class="mt-4" label="Register" color="sec" @click="signUp"/>
    <loading-dialog v-if="loading" message="Registering, Please Wait..."/>
    <error-dialog v-if="error" :error="errorVal" @retry="error=false"/>
  </div>
</template>

<script>
import TextField from "@/components/TextField";
import {inject, ref} from "vue";
import router from "@/router";
import {AuthService} from "@/services/auth";
import Button from "@/components/Button";
import LoadingDialog from "@/components/LoadingDialog";
import ErrorDialog from "@/components/ErrorDialog";
export default {
  name: "Register",
  components: {ErrorDialog, LoadingDialog, Button, TextField},
  setup(){
    const GStore=inject('GStore')
    const email=ref('')
    const pass1=ref('')
    const pass2=ref('')
    const loading=ref(false)
    const error=ref(false)
    const errorVal=ref({
      title: 'Error while registering',
      description: 'An error occurred'
    })
    const matchError=ref('')

    const service=new AuthService()

    function updateEmail(e){
      email.value=e
    }
    function updatePass1(e){
      pass1.value=e
    }
    function updatePass2(e){
      pass2.value=e
      if(pass1.value!==pass2.value){
        matchError.value='passwords do not match'
      }
      else{
        matchError.value=''
      }
    }

    async function signUp(){
      loading.value=true
      try {
        await service.register({email: email.value, password: pass1.value, password_confirmation: pass2.value})
        loading.value=false

        //global store to show successful registration message for 5 sec.
        GStore.flashMessage='A verification email has been sent to your email address'
        setTimeout(()=>{
          GStore.flashMessage=''
        },5000)

        //push to login if registration successful
        await router.push('/auth/login')
      }
      catch (e){
        loading.value=false
        error.value = true
      }
    }

    return{
      email,
      pass1,
      pass2,
      loading,
      error,
      errorVal,
      matchError,
      updateEmail,
      updatePass1,
      updatePass2,
      signUp
    }
  }
}
</script>
