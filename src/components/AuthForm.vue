<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

type ValidationRule = (value: string) => boolean | string

interface AuthField {
  label: string
  model: string
  type: string
  rules?: ValidationRule[]
  options?: { title: string; value: string }[]
}

export default defineComponent({
  name: 'AuthForm',
  props: {
    fields: {
      type: Array as PropType<AuthField[]>,
      required: true,
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
    loading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: '',
    },
  },
  emits: ['submit', 'update:form'],
  data() {
    const form: Record<string, string> = {}
    this.fields.forEach((field) => {
      form[field.model] = field.type === 'select' && field.options?.[0]
        ? field.options[0].value
        : ''
    })
    return {
      form,
      isFormValid: false,
    }
  },
  methods: {
    initializeForm(): Record<string, string> {
      const form: Record<string, string> = {}
      this.fields.forEach((field) => {
        form[field.model] = field.type === 'select' && field.options?.[0]
          ? field.options[0].value
          : ''
      })
      return form
    },
    async handleSubmit() {
      const formRef = this.$refs.formRef as { validate: () => Promise<{ valid: boolean }> }
      const { valid } = await formRef.validate()

      if (valid) {
        this.$emit('submit', this.form)
      }
    },
  },
  watch: {
    fields: {
      handler() {
        this.form = this.initializeForm()
      },
      deep: true,
    },
    form: {
      handler(newForm) {
        this.$emit('update:form', newForm)
      },
      deep: true,
    },
  },
})
</script>

<template>
  <v-card class="mx-auto my-12" max-width="400">
    <v-card-title class="text-h5 text-center">{{ buttonText }}</v-card-title>
    <v-card-text>
      <v-form ref="formRef" v-model="isFormValid" @submit.prevent="handleSubmit">
        <div v-for="field in fields" :key="field.model" class="mb-4">
          <template v-if="field.type === 'select' && field.options">
            <v-select
              v-model="form[field.model]"
              :label="field.label"
              :items="field.options"
              :disabled="loading"
              :rules="field.rules || []"
            />
          </template>
          <template v-else>
            <v-text-field
              v-model="form[field.model]"
              :label="field.label"
              :type="field.type"
              :disabled="loading"
              :rules="field.rules || []"
            />
          </template>
        </div>
        <v-alert v-if="error" type="error" class="mb-4" density="compact">
          {{ error }}
        </v-alert>
        <v-btn type="submit" color="primary" block :loading="loading" :disabled="loading">
          {{ buttonText }}
        </v-btn>
      </v-form>
      <div class="mt-4 text-center">
        <router-link :to="linkTo">{{ linkText }}</router-link>
      </div>
    </v-card-text>
  </v-card>
</template>
