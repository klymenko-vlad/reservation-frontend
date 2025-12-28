<template>
  <AuthForm
    :fields="fields"
    :buttonText="buttonText"
    :linkText="linkText"
    :linkTo="linkTo"
    :onSubmit="handleLogin"
    :loading="isLoading"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'pinia'
import AuthForm from '../components/AuthForm.vue'
import { login } from '@/api'
import { useToastStore } from '@/stores/toast'
import { emailRules, passwordRules } from '@/utils/validation/auth-validation'

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
      linkTo: '/register',
      isLoading: false,
    }
  },
  methods: {
    ...mapActions(useToastStore, ['success', 'error']),
    async handleLogin(form: Record<string, string>) {
      this.isLoading = true

      try {
        await login({ email: form.email!, password: form.password! })
        this.success('Login successful!')
        await this.$router.push('/profile')

      } catch (err) {
        const message = (err && typeof err === 'object' && 'message' in err)
          ? (err as { message: string }).message
          : 'Login failed'
        this.error(message)

      } finally {
        this.isLoading = false
      }
    },
  },
})
</script>
