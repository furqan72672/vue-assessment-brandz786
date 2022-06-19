<template>
  <v-form class="d-flex flex-column align-center">
    <h1>{{ $route.params.id ? 'Manage' : 'Create' }}</h1>
    <v-text-field class="mt-4" label="Title" variant="outlined" hide-details="auto" density="compact" v-model="title"
                  style="width: 30vw"></v-text-field>
    <v-textarea class="mt-4" label="Description" variant="outlined" hide-details="auto" density="compact" v-model="desc"
                style="width: 30vw"></v-textarea>
    <Button label="Save" class="mt-4" :disable="title===originalTitle && desc===originalDesc" @click="save"></Button>
  </v-form>
  <loading-dialog v-if="loading" :message="[$route.params.id?'Updating':'Creating']+', Please Wait...'"/>
  <error-dialog v-if="error" :error="errorVal" @retry="error=false"/>
</template>

<script>
import {ref} from "vue";
import Button from "@/components/Button";
import {TodoService} from "@/services/todos";
import {useRoute} from "vue-router";
import router from "@/router";
import LoadingDialog from "@/components/LoadingDialog";
import ErrorDialog from "@/components/ErrorDialog";

export default {
  name: "Manage",
  components: {ErrorDialog, LoadingDialog, Button},
  async setup() {
    const loading=ref(false)
    const error=ref(false)

    const title = ref('')
    const desc = ref('')
    const originalTitle = ref('')
    const originalDesc = ref('')
    const service=new TodoService()
    const route=useRoute()
    const errorVal=ref({
      title:`Couldn't create Todo`,
      description:'An error occurred while creating Todo'
    })

    if(route.params.id){
      errorVal.value={
        title:`Couldn't update Todo`,
        description:'An error occurred while updating Todo'
      }
      try{
        const res = (await service.getOne(route.params.id)).item
        originalTitle.value=title.value=res.title
        originalDesc.value=desc.value=res.description
      }
      catch (e){
        console.log(e)
      }
    }

    async function save(){
      loading.value=true

      //if editing a current todo
      if(route.params.id){
        try{
          await service.update(route.params.id,{title:title.value,description:desc.value})
          return await router.push('/')
        }
        catch (e) {
          loading.value=false
          error.value=true
        }
      }

      //if creating new todo
      else{
        try{
          await service.create({title:title.value,description:desc.value})
          await router.push('/')
        }
        catch (e) {
          loading.value=false
          error.value=true
        }
      }
    }

    return {
      title,
      desc,
      originalTitle,
      originalDesc,
      loading,
      error,
      errorVal,
      save
    }
  }
}
</script>

<style scoped>

</style>
