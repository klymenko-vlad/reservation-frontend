<template>
  <main class="pa-6">
    <h1 class="text-h4 mb-6">Hotels</h1>

    <section class="mt-4">
      <div v-if="isLoading" class="text-center text-medium-emphasis py-12">
        <v-progress-circular indeterminate size="40" class="mb-4" />
        <p>Loading properties…</p>
      </div>
      <div v-else-if="properties.length === 0" class="text-center text-medium-emphasis py-12">
        No properties found.
      </div>

      <v-row v-else>
        <v-col
          v-for="property in properties"
          :key="property.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <FeaturedPropertyCard :property="property" />
        </v-col>
      </v-row>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getAllProperties } from '@/api/queries'
import type { Property } from '@/types'
import FeaturedPropertyCard from '@/components/cards/FeaturedPropertyCard.vue'

export default defineComponent({
  name: 'HotelsView',
  components: {
    FeaturedPropertyCard,
  },
  data() {
    return {
      properties: [] as Property[],
      isLoading: false,
    }
  },
  methods: {
    async fetchProperties() {
      this.isLoading = true
      try {
        const data = await getAllProperties()
        this.properties = Array.isArray(data) ? data : []
      } catch {
        this.properties = []
      } finally {
        this.isLoading = false
      }
    },
  },
  mounted() {
    this.fetchProperties()
  },
})
</script>
