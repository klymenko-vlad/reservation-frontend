<script lang="ts">
import {RouterView} from 'vue-router'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from "@/components/layout/AppFooter.vue";
import { mapState, mapActions } from 'pinia'
import { useToastStore } from '@/stores/toast'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    RouterView,
  },
  computed: {
    ...mapState(useToastStore, ['show', 'message', 'type', 'timeout']),
    snackbarColor(): string {
      const colors: Record<string, string> = {
        success: 'success',
        error: 'error',
        warning: 'warning',
        info: 'info',
      }
      return colors[this.type] || 'info'
    },
  },
  methods: {
    ...mapActions(useToastStore, ['hide']),
    onSnackbarUpdate(value: boolean) {
      if (!value) {
        this.hide()
      }
    },
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
    <v-snackbar
      :model-value="show"
      :timeout="timeout"
      :color="snackbarColor"
      location="top"
      @update:model-value="onSnackbarUpdate"
    >
      {{ message }}
      <template #actions>
        <v-btn variant="text" @click="hide">Close</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<style scoped>
</style>
