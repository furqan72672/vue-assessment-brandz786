<template>
  <div class="d-flex mt-10" style="width: 100%">
    <v-spacer></v-spacer>
    <div class="d-flex flex-column">
      <h1>Welcome Guest</h1>
      <h2>You are not logged in</h2>
    </div>
    <v-spacer></v-spacer>
    <div class="d-flex flex-column">
      <Button color="pri" label="Login" to="/login"/>
      <Button color="sec" label="Register" to="/register"/>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
export default {
  name: "Welcome",
  components: {Button}
}
</script>

<style scoped>

</style>
