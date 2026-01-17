<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { getPropertyById } from '@/api/queries'
import { useUserStore } from '@/stores/user'
import type { Property } from '@/types'
import { formatPrice } from '@/utils/format'
import { ROUTES } from '@/constants/routes'

export default defineComponent({
  name: 'HotelDetailView',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      property: null as Property | null,
      isLoading: false,
    }
  },
  computed: {
    ...mapState(useUserStore, ['id']),
  },
  methods: {
    formatPrice,
    async fetchProperty() {
      this.isLoading = true
      try {
        const data = await getPropertyById(this.id)
        this.property = data as Property
      } catch {
        this.property = null
      } finally {
        this.isLoading = false
      }
    },
    onBookClick() {
      if (!this.id) {
        this.$router.push({ name: 'login', query: { redirect: this.$route.fullPath } })
      } else if (this.property?.id) {
        this.$router.push(ROUTES.HOTEL_BOOK(this.property.id))
      }
    },
  },
  watch: {
    id: {
      immediate: true,
      handler(newId: string) {
        if (newId) {
          this.fetchProperty()
        }
      },
    },
  },
})
</script>

<template>
  <main class="pa-3" style="min-height: 100vh">
    <div v-if="isLoading" class="d-flex flex-column align-center justify-center py-16 ga-4">
      <v-progress-circular indeterminate size="64" />
      <p class="text-h6">Loading hotel details…</p>
    </div>

    <div v-else-if="property" class="py-6">
      <v-container>
        <v-row>
          <v-col cols="12" md="8">
            <v-card class="h-auto">
              <v-card-item>
                <v-card-title class="text-h4">{{ property.name || 'Untitled Hotel' }}</v-card-title>
              </v-card-item>

              <v-card-text>
                <h3 class="text-h6 mb-4">Description</h3>
                <p class="text-body-1">{{ property.description || 'No description available.' }}</p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="sticky-booking-card">
              <v-card-text class="text-center">
                <div class="mb-4">
                  <div class="text-h3 font-weight-bold">{{ formatPrice(property.priceFerNightCents) }}</div>
                  <div class="text-caption text-medium-emphasis">per night</div>
                </div>

                <v-divider class="my-4" />

                <v-btn
                  block
                  size="large"
                  color="primary"
                  class="mb-2"
                  @click="onBookClick"
                >
                  Book Now
                </v-btn>

                <p class="text-caption mt-2">
                  You won't be charged yet
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div v-else class="pa-6">
      <v-alert type="warning">
        Hotel not found.
      </v-alert>
    </div>
  </main>
</template>

<style scoped>
.sticky-booking-card {
  position: sticky;
  top: 24px;
}
</style>
