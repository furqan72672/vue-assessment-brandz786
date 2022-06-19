<template>
   <v-form class="d-flex flex-column align-center" @submit="signIn">
     <div v-if="GStore.flashMessage" class="flash-message-div">
       <span class="flash-message">{{GStore.flashMessage}}</span>
     </div>
     <h1>Login</h1>
     <TextField class="mt-4" label="Email" type="email" @updateModel="updateEmail" :rule="['required','email']"/>
     <TextField class="mt-4" label="Password" type="password" @updateModel="updatePass" :rule="['required','minimum']"/>
     <Button class="mt-4" label="Sign In" @click="signIn"/>
   </v-form>
  <loading-dialog v-if="loading" message="Authenticating, Please Wait..."/>
  <error-dialog v-if="error" :error="errorVal" @retry="error=false"/>
</template>

<script>
import TextField from "@/components/TextField";
import {ref} from "vue";
import Button from "@/components/Button";
import {AuthService} from "@/services/auth";
import router from "@/router";
import LoadingDialog from "@/components/LoadingDialog";
import ErrorDialog from "@/components/ErrorDialog";
export default {
  name: "Login",
  components: {ErrorDialog, LoadingDialog, Button, TextField},
  inject:['GStore'],
  setup(){
    const email=ref('')
    const pass=ref('')
    const loading=ref(false)
    const error=ref(false)
    const errorVal=ref({
      title: 'Error while signing in',
      description: 'Email or Password is incorrect!'
    })
    const service=new AuthService()

    function updateEmail(e){
      email.value=e
    }

    function updatePass(e){
      pass.value=e
    }

    async function signIn(){
      loading.value=true
      try {
        let res = await service.login({email: email.value, password: pass.value})
        localStorage.setItem('token', res.user.token)
        loading.value=false
        await router.push('/')
      }
      catch (e){
        loading.value=false
        error.value = true
      }
    }

    return{
      email,
      pass,
      loading,
      error,
      errorVal,
      updateEmail,
      updatePass,
      signIn
    }
  }
}
</script>

<style scoped>
.flash-message-div{
  display: flex;
  background: #f2f0a6;
  width: 100%;
  justify-content: center;
}
.flash-message{
  font-size: 30px;
}
</style>
