<template>
  <v-app id="inspire">
    <router-view />
    <v-snackbar v-model="$store.state.notify.show" :color="$store.state.notify.type" :timeout="3000">
      {{$store.state.notify.mess}}
      <v-btn
        flat
        @click="$store.state.notify.show = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,

    }),
    props: {
      source: String
    }
  }
</script>