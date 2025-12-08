<script lang="ts">
import type { PropType } from 'vue';

interface AuthField {
  label: string;
  model: string;
  type: string;
}

export default {
  name: 'AuthForm',
  props: {
    fields: {
      type: Array as PropType<AuthField[]>,
      required: true,
      default: () => [],
    },
    buttonText: {
      type: String,
      required: true,
    },
    linkText: {
      type: String,
      required: true,
    },
    linkTo: {
      type: String,
      required: true,
    },
    onSubmit: {
      type: Function as PropType<(form: Record<string, string>) => void>,
      required: true,
    },
  },
  data() {
    const form: Record<string, string> = {};
    (this.fields as AuthField[]).forEach((field) => {
      form[field.model] = '';
    });
    return {
      form,
    };
  },
  methods: {
    handleSubmit() {
      this.onSubmit(this.form);
    },
  },
};
</script>

<template>
  <v-card class="mx-auto my-12" max-width="400">
    <v-card-title class="text-h5 text-center">{{ buttonText }}</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="handleSubmit">
        <div v-for="field in fields" :key="field.model" class="mb-4">
          <v-text-field
            v-model="form[field.model]"
            :label="field.label"
            :type="field.type"
            required
          />
        </div>
        <v-btn type="submit" color="primary" block>{{ buttonText }}</v-btn>
      </v-form>
      <div class="mt-4 text-center">
        <router-link :to="linkTo">{{ linkText }}</router-link>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
</style>
