<template>
  <v-card>
    <v-card-title>Reservation</v-card-title>
    <v-card-text>
      <div class="space-y-2">
        <div>
          <span class="text-caption text-medium-emphasis">Start Date</span>
          <div class="font-weight-medium">{{ formatDate(reservation.startDate) }}</div>
        </div>
        <div>
          <span class="text-caption text-medium-emphasis">End Date</span>
          <div class="font-weight-medium">{{ formatDate(reservation.endDate) }}</div>
        </div>
        <div>
          <span class="text-caption text-medium-emphasis">Status</span>
          <v-chip size="small" class="mt-1" :color="getStatusColor(reservation.status)">
            {{ reservation.status }}
          </v-chip>
        </div>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn size="small" color="primary" @click="$emit('edit', reservation)">Edit</v-btn>
      <v-btn size="small" color="error" @click="$emit('delete', reservation.id)">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Reservation } from '@/types'

export default defineComponent({
  name: 'ReservationCard',
  props: {
    reservation: {
      type: Object as () => Reservation,
      required: true,
    },
  },
  emits: ['edit', 'delete'],
  methods: {
    formatDate(dateString: string): string {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    },
    getStatusColor(status: string): string {
      const colors: Record<string, string> = {
        PENDING: 'warning',
        CONFIRMED: 'success',
        CANCELED: 'error',
        COMPLETED: 'info',
      }
      return colors[status] || 'default'
    },
  },
})
</script>
