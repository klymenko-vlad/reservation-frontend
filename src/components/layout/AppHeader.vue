<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'
import { logout } from '@/api'
import { ROUTES } from '@/constants/routes'

export default defineComponent({
  name: 'AppHeader',
  data() {
    return {
      drawer: false,
      ROUTES,
    }
  },
  computed: {
    ...mapState(useUserStore, ['id', 'role']),
    isSignedIn(): boolean {
      return !!this.id
    },
    isUserRole(): boolean {
      return this.role === 'USER'
    },
  },
  methods: {
    ...mapActions(useUserStore, ['clear']),
    async handleLogout() {
      try {
        await logout()
      } finally {
        this.clear()
        await this.$router.push(ROUTES.LOGIN)
      }
    },
    closeDrawer() {
      this.drawer = false
    },
  },
})
</script>

<template>
  <div>
    <v-navigation-drawer v-model="drawer" temporary location="left">
      <v-list>
        <v-list-item to="/" @click="closeDrawer">
          <template #prepend>
            <v-icon>mdi-home</v-icon>
          </template>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-item to="/hotels" @click="closeDrawer">
          <template #prepend>
            <v-icon>mdi-office-building</v-icon>
          </template>
          <v-list-item-title>Hotels</v-list-item-title>
        </v-list-item>

        <v-divider class="my-2" />

        <v-list-item v-if="!isSignedIn" :to="ROUTES.LOGIN" @click="closeDrawer">
          <template #prepend>
            <v-icon>mdi-login</v-icon>
          </template>
          <v-list-item-title>Sign In</v-list-item-title>
        </v-list-item>

        <template v-else>
          <v-list-item :to="ROUTES.PROFILE" @click="closeDrawer">
            <template #prepend>
              <v-icon>mdi-account</v-icon>
            </template>
            <v-list-item-title>My Profile</v-list-item-title>
          </v-list-item>

          <v-list-item @click="handleLogout">
            <template #prepend>
              <v-icon>mdi-logout</v-icon>
            </template>
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary" flat app>
      <v-app-bar-nav-icon class="d-md-none" color="white" @click="drawer = !drawer" />

      <v-toolbar-title>
        <v-btn
          :to="ROUTES.HOME"
          variant="text"
          class="font-weight-bold text-h6 text-md-h5"
          style="text-transform: none"
        >
          StayFinder
        </v-btn>
      </v-toolbar-title>

      <v-btn
        :to="ROUTES.HOTELS"
        variant="text"
        v-if="isUserRole"
        class="d-none d-md-flex ml-4"
        style="text-transform: none"
      >
        Hotels
      </v-btn>

      <v-spacer />

      <div class="d-none d-md-flex ga-2">
        <v-btn v-if="!isSignedIn" variant="outlined" :to="ROUTES.LOGIN">Sign In</v-btn>
        <template v-else>
          <v-btn variant="outlined" :to="ROUTES.PROFILE">My Profile</v-btn>
          <v-btn color="error" variant="outlined" @click="handleLogout">Log Out</v-btn>
        </template>
      </div>
    </v-app-bar>
  </div>
</template>
