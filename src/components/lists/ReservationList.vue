<template>
  <div>
    <div v-if="isEmpty && !isLoading" class="text-center text-medium-emphasis py-8">
      <p>No reservations found.</p>
      <p v-if="emptyMessage" class="text-sm mt-2">{{ emptyMessage }}</p>
    </div>
    <v-progress-circular v-else-if="isLoading" indeterminate color="primary" class="mx-auto" />
    <v-row v-else>
      <v-col v-for="reservation in reservations" :key="reservation.id" cols="12" md="6" lg="4">
        <ReservationCard
          :reservation="reservation"
          @edit="$emit('edit', $event)"
          @delete="$emit('delete', $event)"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Reservation } from '@/types'
import ReservationCard from '@/components/cards/ReservationCard.vue'

export default defineComponent({
  name: 'ReservationList',
  components: {
    ReservationCard,
  },
  props: {
    reservations: {
      type: Array as () => Reservation[],
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
      return this.reservations.length === 0
    },
  },
})
</script>
