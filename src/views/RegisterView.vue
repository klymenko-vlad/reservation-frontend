<template>
  <AuthForm
    :fields="fields"
    :buttonText="buttonText"
    :linkText="linkText"
    :linkTo="linkTo"
    :onSubmit="handleSignUp"
  />
</template>

<script lang="ts">
import AuthForm from '../components/AuthForm.vue';
export default {
  name: 'RegisterView',
  components: { AuthForm },
  data() {
    return {
      fields: [
        { label: 'Email', model: 'email', type: 'email' },
        { label: 'Password', model: 'password', type: 'password' },
        { label: 'Confirm Password', model: 'confirmPassword', type: 'password' }
      ],
      buttonText: 'Sign Up',
      linkText: 'Already have an account? Log in',
      linkTo: '/login',
    };
  },
  methods: {
    handleSignUp(form: Record<string, string>) {
      console.log('Sign Up:', form);
    },
  },
};
</script>
