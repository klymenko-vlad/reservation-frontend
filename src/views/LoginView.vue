<template>
  <AuthForm
    :fields="fields"
    :buttonText="buttonText"
    :linkText="linkText"
    :linkTo="linkTo"
    :onSubmit="handleLogin"
  />
</template>

<script lang="ts">
import AuthForm from '../components/AuthForm.vue';
export default {
  name: 'LoginView',
  components: { AuthForm },
  data() {
    return {
      fields: [
        { label: 'Email', model: 'email', type: 'email' },
        { label: 'Password', model: 'password', type: 'password' }
      ],
      buttonText: 'Login',
      linkText: "Don't have an account? Sign up",
      linkTo: '/register',
    };
  },
  methods: {
    handleLogin(form: Record<string, string>) {
      console.log('Login:', form);
    },
  },
};
</script>
