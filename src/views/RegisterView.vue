<template>
  <AuthForm
    :fields="fields"
    :buttonText="buttonText"
    :linkText="linkText"
    :linkTo="linkTo"
    @submit="handleSignUp"
    @update:form="form = $event"
    :loading="isLoading"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'pinia'
import AuthForm from '../components/AuthForm.vue'
import { createUser, login } from '@/api'
import { useToastStore } from '@/stores/toast'
import {
  emailRules,
  passwordRules,
  required,
} from '@/utils/validation'
import { ROUTES } from '@/constants/routes'

export default defineComponent({
  components: { AuthForm },
  data() {
    return {
      buttonText: 'Sign Up',
      linkText: 'Already have an account? Log in',
      linkTo: ROUTES.LOGIN,
      isLoading: false,
      form: {} as Record<string, string>,
    }
  },
  computed: {
    fields() {
      return [
        { label: 'Email', model: 'email', type: 'email', rules: emailRules },
        {
          label: 'Password',
          model: 'password',
          type: 'password',
          rules: passwordRules,
        },
        {
          label: 'Confirm Password',
          model: 'confirmPassword',
          type: 'password',
          rules: [
            required('Please confirm your password'),
            (v: string) => v === this.form.password || 'Passwords do not match',
          ],
        },
        { label: 'First Name', model: 'name', type: 'text', rules: [] },
        { label: 'Last Name', model: 'lastName', type: 'text', rules: [] },
        {
          label: 'Role',
          model: 'role',
          type: 'select',
          options: [
            { title: 'User', value: 'USER' },
            { title: 'Host', value: 'HOST' },
          ],
          rules: [required('Role is required')],
        },
      ]
    },
  },
  methods: {
    ...mapActions(useToastStore, ['success']),
    async handleSignUp(form: Record<string, string>) {
      this.isLoading = true
      try {
        await createUser({
          email: form.email!,
          password: form.password!,
          name: form.name!,
          lastName: form.lastName!,
          role: form.role! as 'USER' | 'HOST',
        })
        await login({ email: form.email!, password: form.password! })
        this.success('Account created successfully!')
        await this.$router.push(ROUTES.PROFILE)
      } finally {
        this.isLoading = false
      }
    },
  },
})
</script>
