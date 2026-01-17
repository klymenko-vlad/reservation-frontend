<template>
  <v-dialog v-model="isOpen" max-width="400" @update:model-value="$emit('update:open', $event)">
    <v-card>
      <v-card-title>Edit Reservation</v-card-title>
      <v-card-text>
        <v-form v-model="formValid">
          <v-text-field
            v-model="form.startDate"
            label="Start Date"
            type="date"
            required
            :rules="[formRules.date]"
          />
          <v-text-field
            v-model="form.endDate"
            label="End Date"
            type="date"
            required
            :rules="[
              formRules.date,
              formRules.endDateAfterStart(form.startDate),
            ]"
          />
          <v-select
            v-model="form.status"
            :items="reservationStatuses"
            label="Status"
            required
            :rules="[formRules.required('Status')]"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn variant="text" @click="$emit('update:open', false)">Cancel</v-btn>
        <v-btn color="primary" @click="handleSubmit" :disabled="!formValid">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Reservation } from '@/types'
import { formRules } from '@/utils/validation'

export default defineComponent({
  name: 'ReservationForm',
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    reservation: {
      type: Object as () => Reservation | null,
      default: null,
    },
    reservationStatuses: {
      type: Array as () => string[],
      required: true,
    },
  },
  emits: ['update:open', 'submit'],
  data() {
    return {
      formValid: false,
      form: {
        startDate: '',
        endDate: '',
        status: null as 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED' | null,
      },
      formRules,
    }
  },
  computed: {
    isOpen: {
      get(): boolean {
        return this.open
      },
      set(value: boolean) {
        this.$emit('update:open', value)
      },
    },
  },
  watch: {
    reservation(newReservation: Reservation | null) {
      if (newReservation) {
        this.populateForm(newReservation)
      }
    },
    open(newVal: boolean) {
      if (!newVal) {
        this.resetForm()
      }
    },
  },
  methods: {
    populateForm(reservation: Reservation) {
      this.form = {
        startDate: reservation.startDate,
        endDate: reservation.endDate,
        status: reservation.status,
      }
    },
    handleSubmit() {
      if (this.formValid) {
        this.$emit('submit', { ...this.form })
        this.resetForm()
      }
    },
    resetForm() {
      this.form = {
        startDate: '',
        endDate: '',
        status: null,
      }
      this.formValid = false
    },
  },
})
</script>
