<script lang="ts">
export default {
  name: 'AppHeader',
}
</script>

<template>
  <v-app-bar color="primary" dark flat app>
    <v-toolbar-title class="d-flex align-center flex-row title-area">
      <v-btn to="/" variant="text" class="font-weight-bold text-h5" style="text-transform:none;">
        StayFinder
      </v-btn>
      <v-btn to="/hotels" variant="text" class="ml-4 text-subtitle-1 font-weight-regular subtitle" style="text-transform:none;">
        Hotels
      </v-btn>
    </v-toolbar-title>
    <v-spacer />
    <v-btn color="secondary" variant="outlined" to="/login">
      Sign In
    </v-btn>
  </v-app-bar>
</template>

<style scoped>
.title-area {
  gap: 1.5rem;
}
.subtitle {
  white-space: nowrap;
}
@media (max-width: 600px) {
  .title-area {
    gap: 0.5rem;
  }
  .subtitle {
    font-size: 0.9rem;
  }
}
</style>
