<script lang="ts">
import {RouterView} from 'vue-router'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from "@/components/layout/AppFooter.vue";

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    RouterView,
  },
}
</script>

<template>
  <v-app>
    <AppHeader/>
    <v-main>
      <RouterView/>
    </v-main>
    <AppFooter/>
  </v-app>
</template>

<style scoped>
</style>
