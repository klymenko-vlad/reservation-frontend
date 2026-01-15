<template>
  <div>
    <ReservationList
      :reservations="reservations"
      :is-loading="isLoading"
      @edit="openEditReservation"
      @delete="deleteReservation"
    />

    <ReservationForm
      :open="reservationFormOpen"
      :reservation="reservationFormEdit"
      @update:open="reservationFormOpen = $event"
      @submit="handleReservationFormSubmit"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Reservation } from '@/types'
import { deleteReservationById, updateReservationById } from '@/api/queries'
import ReservationList from '@/components/lists/ReservationList.vue'
import ReservationForm from '@/components/forms/ReservationForm.vue'

export default defineComponent({
  name: 'UserDashboard',
  components: {
    ReservationList,
    ReservationForm,
  },
  props: {
    reservations: {
      type: Array as () => Reservation[],
      required: true,
    },
  },
  emits: ['reservation-updated'],
  data() {
    return {
      isLoading: false,
      reservationFormOpen: false,
      reservationFormEdit: null as Reservation | null,
    }
  },
  methods: {
    openEditReservation(reservation: Reservation) {
      this.reservationFormEdit = reservation
      this.reservationFormOpen = true
    },
    async deleteReservation(id: string) {
      this.isLoading = true
      try {
        await deleteReservationById(id)
        this.$emit('reservation-updated')
      } finally {
        this.isLoading = false
      }
    },
    async handleReservationFormSubmit(formData: any) {
      this.isLoading = true
      try {
        if (this.reservationFormEdit) {
          await updateReservationById(this.reservationFormEdit.id, {
            startDate: new Date(formData.startDate).toISOString(),
            endDate: new Date(formData.endDate).toISOString(),
          })
        }
        this.reservationFormOpen = false
        this.reservationFormEdit = null
        this.$emit('reservation-updated')
      } finally {
        this.isLoading = false
      }
    },
  },
})
</script>
