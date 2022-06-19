<template>
  <div class="modal">
    <v-card class="d-flex flex-column align-center pa-8">
      <v-card-title>{{error.title}}</v-card-title>
      <v-card-subtitle>{{error.description}}</v-card-subtitle>
      <v-card-actions>
        <v-btn @click="$emit('retry')">Retry</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ErrorDialog",
  props: {
    show:Boolean,
    error:Object
  }
}
</script>
