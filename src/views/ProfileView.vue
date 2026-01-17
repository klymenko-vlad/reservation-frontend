<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
import { getAllProperties, getAllReservations } from '@/api/queries'
import type { Property, Reservation } from '@/types'
import { PROPERTY_CATEGORIES, RESERVATION_STATUSES } from '@/constants/enums'
import HostDashboard from '@/components/dashboards/HostDashboard.vue'
import UserDashboard from '@/components/dashboards/UserDashboard.vue'

export default defineComponent({
  name: 'ProfileView',
  components: {
    HostDashboard,
    UserDashboard,
  },
  data() {
    return {
      properties: [] as Property[],
      reservations: [] as Reservation[],
      isLoading: false,
    }
  },
  computed: {
    ...mapState(useUserStore, ['id', 'role']),
    isHost(): boolean {
      return this.role === 'HOST'
    },
    propertyCategories() {
      return [...PROPERTY_CATEGORIES]
    },
    reservationStatuses() {
      return [...RESERVATION_STATUSES]
    },
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      try {
        if (this.isHost) {
          const result = await getAllProperties()
          this.properties = result as Property[]
        } else {
          const result = await getAllReservations()
          this.reservations = result as Reservation[]
        }
      } finally {
        this.isLoading = false
      }
    },
  },
  mounted() {
    this.fetchData()
  },
})
</script>

<template>
  <main class="pa-6">
    <h1 class="mb-6">Profile</h1>

    <HostDashboard
      v-if="isHost"
      :properties="properties"
      :property-categories="propertyCategories"
      @property-updated="fetchData"
    />
    <UserDashboard
      v-else
      :reservations="reservations"
      :reservation-statuses="reservationStatuses"
      @reservation-updated="fetchData"
    />
  </main>
</template>
