<template>
  <div>
    <div class="mb-6">
      <v-btn color="primary" size="large" @click="openCreateProperty">
        <v-icon start>mdi-plus</v-icon>
        Create Property
      </v-btn>
    </div>

    <PropertyList
      :properties="properties"
      :is-loading="isLoading"
      @edit="openEditProperty"
      @delete="deleteProperty"
    />

    <PropertyForm
      :open="propertyFormOpen"
      :property="propertyFormEdit"
      :property-categories="propertyCategories"
      @update:open="propertyFormOpen = $event"
      @submit="handlePropertyFormSubmit"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Property } from '@/types'
import { deletePropertyById, updatePropertyById, createProperty } from '@/api/queries'
import PropertyList from '@/components/lists/PropertyList.vue'
import PropertyForm from '@/components/forms/PropertyForm.vue'

export default defineComponent({
  name: 'HostDashboard',
  components: {
    PropertyList,
    PropertyForm,
  },
  props: {
    properties: {
      type: Array as () => Property[],
      required: true,
    },
    propertyCategories: {
      type: Array as () => string[],
      required: true,
    },
  },
  emits: ['property-updated'],
  data() {
    return {
      isLoading: false,
      propertyFormOpen: false,
      propertyFormEdit: null as Property | null,
    }
  },
  methods: {
    openCreateProperty() {
      this.propertyFormEdit = null
      this.propertyFormOpen = true
    },
    openEditProperty(property: Property) {
      this.propertyFormEdit = property
      this.propertyFormOpen = true
    },
    async deleteProperty(id: string) {
      this.isLoading = true
      try {
        await deletePropertyById(id)
        this.$emit('property-updated')
      } finally {
        this.isLoading = false
      }
    },
    async handlePropertyFormSubmit(formData: any) {
      this.isLoading = true
      try {
        if (this.propertyFormEdit) {
          await updatePropertyById(this.propertyFormEdit.id, formData)
        } else {
          await createProperty(formData)
        }
        this.propertyFormOpen = false
        this.propertyFormEdit = null
        this.$emit('property-updated')
      } finally {
        this.isLoading = false
      }
    },
  },
})
</script>
