<template>
  <div>
    <div v-if="isEmpty && !isLoading" class="text-center text-medium-emphasis py-8">
      <p>No properties found.</p>
      <p v-if="emptyMessage" class="text-sm mt-2">{{ emptyMessage }}</p>
    </div>
    <v-progress-circular v-else-if="isLoading" indeterminate color="primary" class="mx-auto" />
    <v-row v-else>
      <v-col v-for="property in properties" :key="property.id" cols="12" md="6" lg="4">
        <PropertyCard :property="property" @edit="$emit('edit', $event)" @delete="$emit('delete', $event)" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Property } from '@/types'
import PropertyCard from '@/components/cards/PropertyCard.vue'

export default defineComponent({
  name: 'PropertyList',
  components: {
    PropertyCard,
  },
  props: {
    properties: {
      type: Array as () => Property[],
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    emptyMessage: {
      type: String,
      default: '',
    },
  },
  emits: ['edit', 'delete'],
  computed: {
    isEmpty(): boolean {
      return this.properties.length === 0
    },
  },
})
</script>
