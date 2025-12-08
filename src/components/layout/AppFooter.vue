<script lang="ts">
export default {
  name: 'AppHeader',
}
</script>

<template>
  <v-footer
    padless
    height="auto"
  >
    <v-col
      class="text-center"
      cols="12"
    >
      &copy; {{ new Date().getFullYear() }} StayFinder | All rights reserved.
    </v-col>
  </v-footer>
</template>

<style scoped>
</style>
