<template>
  <v-card :to="hotelDetailRoute" router hover rounded="lg" elevation="2" class="h-100">
    <v-img :src="property.imageUrl || '/favicon.ico'" height="180" alt="Property image" />
    <v-card-item>
      <v-card-title>{{ property.name }}</v-card-title>
      <v-card-subtitle>{{ property.location }}</v-card-subtitle>
    </v-card-item>
    <v-card-text>
      {{ truncateText(property.description) }}
    </v-card-text>
    <v-card-actions>
      <span class="font-weight-semibold text-primary">{{ formatPrice(property.priceFerNightCents, true) }}</span>
      <v-spacer />
      <v-btn text color="primary" :to="hotelDetailRoute">View</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Property } from '@/types'
import { formatPrice, truncateText } from '@/utils/format'
import { ROUTES } from '@/constants/routes'

export default defineComponent({
  name: 'FeaturedPropertyCard',
  props: {
    property: {
      type: Object as () => Property,
      required: true,
    },
  },
  computed: {
    hotelDetailRoute(): string {
      return ROUTES.HOTEL_DETAIL(this.property.id)
    },
  },
  methods: {
    formatPrice,
    truncateText,
  },
})
</script>
