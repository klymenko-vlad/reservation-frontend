<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title>Book Your Stay</v-card-title>
          <v-card-text>
            <v-form v-model="formValid" @submit.prevent="submitBooking">
              <v-text-field
                v-model="startDate"
                label="Start Date"
                type="date"
                required
                :rules="[formRules.date]"
              />
              <v-text-field
                v-model="endDate"
                label="End Date"
                type="date"
                required
                :rules="[
                  formRules.date,
                  formRules.endDateAfterStart(startDate),
                ]"
              />
              <v-btn
                type="submit"
                color="primary"
                :loading="loading"
                :disabled="!formValid || loading"
                block
                class="mt-4"
              >
                Confirm Booking
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'pinia'
import { createReservation } from '@/api/queries'
import { useToastStore } from '@/stores/toast'
import { formRules } from '@/utils/validation'
import type { CreateReservationDto } from '@/api/generated'

export default defineComponent({
  name: 'BookingView',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      startDate: '',
      endDate: '',
      loading: false,
      formValid: true,
      formRules,
    }
  },
  methods: {
    ...mapActions(useToastStore, ['success']),
    async submitBooking() {
      if (!this.formValid) return
      this.loading = true
      try {
        const payload: CreateReservationDto = {
          propertyId: this.id,
          startDate: new Date(this.startDate).toISOString(),
          endDate: new Date(this.endDate).toISOString(),
          status: 'CONFIRMED',
        }
        await createReservation(payload)
        this.success('Booking confirmed!')
        this.resetForm()
      } finally {
        this.loading = false
      }
    },
    resetForm() {
      this.startDate = ''
      this.endDate = ''
      this.formValid = true
    },
  },
})
</script>
