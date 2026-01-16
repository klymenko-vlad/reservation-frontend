<script lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { mapActions, mapState } from 'pinia'
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
    <AppHeader />
    <v-main>
      <RouterView />
    </v-main>
    <AppFooter />
    <v-snackbar
      :model-value="show"
      :timeout="timeout"
      :color="type"
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
