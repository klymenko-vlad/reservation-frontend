<template>
  <v-main class="d-flex flex-column" style="min-height: 100vh">
    <section class="bg-purple-lighten-5">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="7">
            <h1 class="text-h3 text-md-h2 font-weight-bold mb-3">
              {{ role === 'HOST' ? 'Manage your properties with ease' : 'Find your perfect stay' }}
            </h1>
            <p class="text-h6 text-medium-emphasis mb-5">
              {{
                role === 'HOST'
                  ? 'Join our community of hosts and start earning today by listing your property on StayFinder.'
                  : 'Discover and book unique accommodations around the world with StayFinder.'
              }}
            </p>
            <div class="d-flex flex-wrap ga-3">
              <v-btn v-if="role === 'USER'" size="large" color="primary" :to="ROUTES.HOTELS"
                >Explore Hotels</v-btn
              >
              <v-btn v-if="!role" size="large" variant="outlined" :to="ROUTES.REGISTER"
                >Start your vacation</v-btn
              >
            </div>
          </v-col>
          <v-col cols="12" md="5" class="d-flex align-center justify-center">
            <v-img
              src="https://media.leonardo-hotels.com/static.leonardo-hotels.com/image/leonardohotelbucharestcitycenter_room_comfortdouble2_2022_4000x2600_7e18f254bc75491965d36cc312e8111f.jpg"
              height="320"
              cover
              rounded="lg"
              elevation="4"
              class="w-100"
              alt="Leonardo Hotel Bucharest City Center"
            />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="py-8" v-if="role !== 'HOST'">
      <v-container>
        <h2 class="text-h5 font-weight-semibold mt-8 mb-5">Featured properties</h2>
        <v-row>
          <v-col v-for="prop in featured" :key="prop.id" cols="12" sm="6" md="4">
            <FeaturedPropertyCard :property="prop" />
          </v-col>
          <v-col v-if="!loading && featured.length === 0" cols="12">
            <v-alert type="info">No properties found.</v-alert>
          </v-col>
          <v-col v-if="loading" cols="12">
            <div class="d-flex align-center justify-center ga-3 text-medium-emphasis py-8">
              <v-progress-circular indeterminate size="40" />
              <span class="text-h6">Loading…</span>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="py-12 bg-purple-lighten-5">
      <v-container>
        <h2 class="text-h5 font-weight-semibold mt-8 mb-5">Why StayFinder?</h2>
        <v-row>
          <v-col v-for="feature in features" :key="feature.title" cols="12" sm="6" md="3">
            <FeatureCard
              :icon="feature.icon"
              :title="feature.title"
              :description="feature.description"
            />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section v-if="role !== 'HOST'" class="py-8">
      <v-container>
        <v-card rounded="xl" elevation="2" class="pa-8 pa-md-10 mt-8 bg-gradient-purple">
          <v-row align="center" justify="space-between">
            <v-col cols="12" md="8">
              <h2 class="text-h4 font-weight-bold mb-3">Ready to explore?</h2>
              <p class="text-h6 text-medium-emphasis ma-0">
                Discover unique stays and experiences. Your next adventure is just a click away.
              </p>
            </v-col>
            <v-col cols="12" md="auto" class="d-flex justify-center justify-md-end">
              <v-btn
                size="x-large"
                color="primary"
                :to="ROUTES.HOTELS"
                elevation="2"
                class="w-100 w-md-auto"
                >Get started</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </section>
  </v-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getAllProperties } from '@/api/queries'
import type { Property } from '@/types'
import FeaturedPropertyCard from '@/components/cards/FeaturedPropertyCard.vue'
import FeatureCard from '@/components/cards/FeatureCard.vue'
import { useUserStore } from '@/stores/user.ts'
import { mapState } from 'pinia'
import { ROUTES } from '@/constants/routes'

interface Feature {
  icon: string
  title: string
  description: string
}

export default defineComponent({
  name: 'HomeView',
  components: {
    FeaturedPropertyCard,
    FeatureCard,
  },
  computed: {
    ...mapState(useUserStore, ['role']),
  },
  data() {
    return {
      featured: [] as Property[],
      loading: false,
      ROUTES,
      features: [
        {
          icon: 'mdi-currency-usd',
          title: 'Transparent Pricing',
          description: 'No hidden fees. What you see is what you pay.',
        },
        {
          icon: 'mdi-shield-check',
          title: 'Verified Stays',
          description: 'All properties are quality-checked for your peace of mind.',
        },
        {
          icon: 'mdi-flash',
          title: 'Instant Booking',
          description: 'Book your stay in seconds, no waiting for approval.',
        },
        {
          icon: 'mdi-account-heart',
          title: 'Support 24/7',
          description: 'Our team is here for you, day and night.',
        },
      ] as Feature[],
    }
  },
  methods: {
    async fetchFeatured() {
      this.loading = true
      try {
        const all = await getAllProperties()
        this.featured = Array.isArray(all) ? all.slice(0, 3) : []
      } catch {
        this.featured = []
      } finally {
        this.loading = false
      }
    },
  },
  mounted() {
    this.fetchFeatured()
  },
})
</script>

<style scoped>
/* Only keeping minimal styles for gradient background */
.bg-gradient-purple {
  background: linear-gradient(90deg, #f3eafe 0%, #e3f0ff 100%);
}
</style>
