<template>
  <v-card flat class="text-center bg-transparent">
    <v-card-item>
      <v-icon :color="color" size="36">{{ icon }}</v-icon>
      <div class="text-subtitle-1 font-weight-semibold mt-3 mb-1">{{ title }}</div>
      <div class="text-body-2 text-medium-emphasis">{{ description }}</div>
    </v-card-item>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FeatureCard',
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'primary',
    },
  },
})
</script>
