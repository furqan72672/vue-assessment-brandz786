<template>
  <div class="d-flex flex-column align-center justify-center mt-4">
    <div class="d-flex justify-space-between" style="width: 100%">
      <div style="width: 60%" class="d-flex justify-end">
        <h1>My Todos</h1>
      </div>
      <div style="width: 40%" class="d-flex justify-end">
        <Button label="Logout" color="sec" @click="logout"></Button>
      </div>
    </div>
    <ReusableTable :items="items" :headers="headers" :actions-allowed="true" :delete-prop="true"
                   @itemClicked="itemDetails" @addNew="newTodo" @deleteClicked="deleteItem" @valueChanged="search"
                   v-model="searchTerm" table-name="Todos"/>
  </div>
  <loading-dialog v-if="loading" :message="loadingMessage"/>
  <error-dialog v-if="error" :error="errorVal" @retry="error=false"/>
</template>

<script>
import ReusableTable from "@/components/ReusableTable";
import {onBeforeMount, ref} from "vue";
import {TodoService} from "@/services/todos";
import router from "@/router";
import LoadingDialog from "@/components/LoadingDialog";
import ErrorDialog from "@/components/ErrorDialog";
import Button from "@/components/Button";
import {AuthService} from "@/services/auth";

export default {
  name: "Dashboard",
  components: {Button, ErrorDialog, LoadingDialog, ReusableTable},
  async setup() {
    const loading = ref(false)
    const error = ref(false)
    const errorVal = ref({})
    const searchTerm=ref('')
    const loadingMessage=ref('Deleting, Please Wait...')
    const headers = ref([{name: 'Title', value: 'title'}, {name: 'Description', value: 'description'}])
    const items = ref([])
    const service = new TodoService()
    const authService=new AuthService()

    //function to load todos data
    async function load(){
      try {
        items.value = (await service.getAll()).items.data
      }
      catch (e) {
        error.value = true
        errorVal.value = {
          title: `Couldn't fetch Todos`,
          description: 'An error occurred while getting Todos'
        }
      }
    }
    await load()

    //on click, to manage todos page
    function itemDetails(e) {
      router.push(`/todo/${e.id}`)
    }

    //create new todo
    function newTodo() {
      router.push('/todo')
    }

    //delete a todo
    async function deleteItem(e) {
      loading.value=true
      try {
        const res=await service.delete(e.id)
        console.log(res)
        await load()
        loading.value=false
      } catch (e) {
        errorVal.value = {
          title: `Couldn't delete Todo`,
          description: 'An error occurred while deleting Todo'
        }
        loading.value=false
        error.value=true
      }
    }

    //function called when you input value in search field
    function search(e){
      // searchTerm.value=e
      console.log(e)
      // items.value=[]
      // originalItems.value.forEach(item=>{
      //   if(item.title.includes(e)){
      //     items.value.push(item)
      //   }
      // })
    }

    async function logout(){
      loadingMessage.value='Logging you out, Please Wait...'
      loading.value=true
      try{
        await authService.logout({token:localStorage.getItem('token')})
        localStorage.removeItem('token')
        console.log(localStorage.getItem('token'))
        loading.value=false
        await router.push('/auth/login')
      }
      catch{
        errorVal.value = {
          title: `Error while logging out`,
          description: 'An error occurred while logging out'
        }
        loading.value=false
        error.value=true
      }
    }

    return {
      headers,
      items,
      loading,
      error,
      errorVal,
      searchTerm,
      loadingMessage,
      itemDetails,
      newTodo,
      deleteItem,
      search,
      logout,
    }
  }
}
</script>

<style scoped>

</style>
