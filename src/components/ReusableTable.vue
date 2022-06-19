<template>
  <v-table class="elevation-8 pa-4" style="min-height: 80vh; min-width: 80vw">
    <template v-slot:top v-if="top">
      <div class="d-flex flex-column mx-4 mt-4">
        <div class="d-flex align-center">
          <span class="text-black" style="font-size: 25px">{{ tableName }}</span>
          <v-spacer></v-spacer>
          <v-btn color="#243a88" class="text-white" @click="$emit('addNew')">+ Add New</v-btn>
        </div>
        <div class="d-flex mt-2">
          <v-spacer></v-spacer>
          <TextField label="Search" type="text" :rule="[]" @updateModel="updateModel"></TextField>
        </div>
      </div>
    </template>
    <template v-slot:default>
      <thead>
      <tr>
<!--        populate headers through header prop passed from parent-->
        <th class="text-left text-grey-darken-1" v-for="(header,i) in headers" :key="i">
          {{ header.name }}
        </th>
        <th v-if="actionsAllowed" class="text-right text-grey-darken-1">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="items&&items.length>0" v-for="item in items" :key="item.name">

<!--        populate items with their props which are same as headers-->
        <td v-for="(header,i) of headers" :key="i" @click="$emit('itemClicked',item)">{{ item[header.value] }}</td>
        <div class="d-flex justify-end">

<!--          delete button-->
          <v-btn v-if="deleteProp" icon size="xx-small" elevation="0" class="bg-transparent"
                 @click="$emit('deleteClicked',item)">
            <v-icon size="x-small" color="red">mdi-delete</v-icon>
          </v-btn>
        </div>
      </tr>
      <div v-else class="d-flex justify-center">
        <p>No data to show</p>
      </div>
      </tbody>
    </template>
  </v-table>
</template>

<script>


import {ref} from "vue";
import TextField from "@/components/TextField";

export default {
  name: 'ReusableTable',
  components: {
    TextField
  },
  props: {
    actionsAllowed: {
      type: Boolean,
      default: true,
    },
    tableName: {
      type: String,
      default: ''
    },
    headers: {
      type: Array,
      // required:true
    },
    items: {
      type: Array,
      // required:true
    },
    top: {
      type: Boolean,
      default: true
    },
    editProp: Boolean,
    deleteProp: Boolean
  },

  setup(props,{emit}) {
    const query=ref('')
    function updateModel(e){
      query.value=e
      emit('valueChanged',e)
    }
    return{
      updateModel
    }
  }

}
</script>

<style>
.v-input--density-compact .v-field--variant-contained, .v-input--density-compact .v-field--variant-filled {
  box-sizing: border-box;
  border: 1px solid grey;
  border-radius: 5px;
  background: #F5F5F5;
  width: 100%;
  height: 7vh;
  padding: 0 10px;
}
</style>
