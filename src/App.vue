<template>
  <Suspense>
    <template #default>
      <v-app>
        <v-main>
          <router-view/>
        </v-main>
      </v-app>
    </template>
    <template #fallback>
      <div class="d-flex justify-center align-center" style="width: 100%;height: 100%">
        <v-progress-circular indeterminate size="50" color="orange"/>
      </div>
    </template>
  </Suspense>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
