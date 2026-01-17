<template>
  <v-dialog v-model="isOpen" max-width="400" @update:model-value="$emit('update:open', $event)">
    <v-card>
      <v-card-title>{{ isEditMode ? 'Edit Property' : 'Create Property' }}</v-card-title>
      <v-card-text>
        <v-form v-model="formValid">
          <v-text-field
            v-model="form.name"
            label="Name"
            required
            :rules="[
              formRules.required('Name'),
              formRules.propertyName,
            ]"
          />
          <v-text-field
            v-model="form.description"
            label="Description"
            required
            :rules="[
              formRules.required('Description'),
              formRules.propertyDescription,
            ]"
          />
          <v-text-field
            v-model="form.priceFerNightCents"
            label="Price (₴)"
            type="number"
            required
            :rules="[
              formRules.required('Price'),
              formRules.price,
            ]"
          />
          <v-select
            v-model="form.category"
            :items="propertyCategories"
            label="Category"
            required
            :rules="[formRules.required('Category')]"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn variant="text" @click="$emit('update:open', false)">Cancel</v-btn>
        <v-btn color="primary" @click="handleSubmit" :disabled="!formValid">
          {{ isEditMode ? 'Save' : 'Create' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Property } from '@/types'
import { formRules } from '@/utils/validation'

export default defineComponent({
  name: 'PropertyForm',
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    property: {
      type: Object as () => Property | null,
      default: null,
    },
    propertyCategories: {
      type: Array as () => string[],
      required: true,
    },
  },
  emits: ['update:open', 'submit'],
  data() {
    return {
      formValid: false,
      form: {
        name: '',
        description: '',
        priceFerNightCents: '',
        category: null as 'HOTEL' | 'APARTMENT' | 'HOUSE' | 'ROOM' | null,
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
    isEditMode(): boolean {
      return !!this.property
    },
  },
  watch: {
    property(newProperty: Property | null) {
      if (newProperty) {
        this.populateForm(newProperty)
      }
    },
    open(newVal: boolean) {
      if (!newVal) {
        this.resetForm()
      }
    },
  },
  methods: {
    populateForm(property: Property) {
      this.form = {
        name: property.name,
        description: property.description,
        priceFerNightCents: property.priceFerNightCents.toString(),
        category: property.category,
      }
    },
    handleSubmit() {
      if (this.formValid) {
        this.$emit('submit', {
          ...this.form,
          priceFerNightCents: Number(this.form.priceFerNightCents),
        })
        this.resetForm()
      }
    },
    resetForm() {
      this.form = {
        name: '',
        description: '',
        priceFerNightCents: '',
        category: null,
      }
      this.formValid = false
    },
  },
})
</script>
