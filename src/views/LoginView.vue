<template>
  <AuthForm
    :fields="fields"
    :buttonText="buttonText"
    :linkText="linkText"
    :linkTo="linkTo"
    @submit="handleLogin"
    :loading="isLoading"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'pinia'
import AuthForm from '../components/AuthForm.vue'
import { login } from '@/api'
import { useToastStore } from '@/stores/toast'
import { useUserStore } from '@/stores/user'
import { emailRules, passwordRules } from '@/utils/validation'
import { ROUTES } from '@/constants/routes'

export default defineComponent({
  components: { AuthForm },
  data() {
    return {
      fields: [
        { label: 'Email', model: 'email', type: 'email', rules: emailRules },
        { label: 'Password', model: 'password', type: 'password', rules: passwordRules },
      ],
      buttonText: 'Login',
      linkText: "Don't have an account? Sign up",
      linkTo: ROUTES.REGISTER,
      isLoading: false,
    }
  },
  methods: {
    ...mapActions(useToastStore, ['success']),
    ...mapActions(useUserStore, ['fetchUser']),
    async handleLogin(form: Record<string, string>) {
      this.isLoading = true
      try {
        await login({ email: form.email!, password: form.password! })
        await this.fetchUser()
        this.success('Login successful!')
        await this.$router.push(ROUTES.PROFILE)
      } finally {
        this.isLoading = false
      }
    },
  },
})
</script>
