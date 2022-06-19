<template>
  <div class="modal">
    <v-card class="d-flex align-center pa-8" rounded>
      <v-card-title style="padding: 0;margin-right: 10px">{{message}}</v-card-title>
      <v-progress-circular indeterminate></v-progress-circular>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'LoadingDialog',
  props: {
    show:Boolean,
    message:String
  }
}
</script>
