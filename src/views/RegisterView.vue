<template>
  <AuthForm
    ref="authForm"
    :fields="fields"
    :buttonText="buttonText"
    :linkText="linkText"
    :linkTo="linkTo"
    :onSubmit="handleSignUp"
    :loading="isLoading"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'pinia'
import AuthForm from '../components/AuthForm.vue'
import { createUser, login } from '@/api'
import { useToastStore } from '@/stores/toast'
import { emailRules, passwordRules, confirmPasswordRules } from '@/utils/validation/auth-validation'

export default defineComponent({
  components: { AuthForm },
  data() {
    return {
      buttonText: 'Sign Up',
      linkText: 'Already have an account? Log in',
      linkTo: '/login',
      isLoading: false,
    }
  },
  computed: {
    fields() {
      return [
        { label: 'Email', model: 'email', type: 'email', rules: emailRules },
        { label: 'Password', model: 'password', type: 'password', rules: passwordRules },
        {
          label: 'Confirm Password',
          model: 'confirmPassword',
          type: 'password',
          rules: [
            ...confirmPasswordRules,
            (v: string) => {
              const authForm = this.$refs.authForm as { form: Record<string, string> } | undefined
              if (!authForm) return true
              return v === authForm.form.password || 'Passwords do not match'
            },
          ],
        },
      ]
    },
  },
  methods: {
    ...mapActions(useToastStore, ['success', 'error']),
    async handleSignUp(form: Record<string, string>) {
      this.isLoading = true
      try {
        await createUser({ email: form.email!, password: form.password! })
        await login({ email: form.email!, password: form.password! })
        this.success('Account created successfully!')
        await this.$router.push('/profile')
      } catch (err) {
        const message = (err && typeof err === 'object' && 'message' in err)
          ? (err as { message: string }).message
          : 'Registration failed'
        this.error(message)
      } finally {
        this.isLoading = false
      }
    },
  },
})
</script>
