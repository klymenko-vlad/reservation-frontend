<template>
  <v-card>
    <v-card-title>{{ property.name }}</v-card-title>
    <v-card-text>
      <div class="text-body2">{{ property.description }}</div>
      <div class="mt-3">
        <div class="font-weight-medium">{{ property.priceFerNightCents }}₴/night</div>
        <div class="text-caption text-medium-emphasis">{{ property.category }}</div>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn size="small" color="primary" @click="$emit('edit', property)">Edit</v-btn>
      <v-btn size="small" color="error" @click="$emit('delete', property.id)">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Property } from '@/types'

export default defineComponent({
  name: 'PropertyCard',
  props: {
    property: {
      type: Object as () => Property,
      required: true,
    },
  },
  emits: ['edit', 'delete'],
})
</script>
