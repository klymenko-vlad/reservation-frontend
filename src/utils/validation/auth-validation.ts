type VuetifyRule = (value: string) => boolean | string

export const required = (msg = 'This field is required'): VuetifyRule =>
  (v) => !!v || msg

export const email = (msg = 'Email must be valid'): VuetifyRule =>
  (v) => !v || /.+@.+\..+/.test(v) || msg

export const minLength = (min: number, msg?: string): VuetifyRule =>
  (v) => !v || v.length >= min || msg || `Must be at least ${min} characters`

export const emailRules = [required('Email is required'), email()]
export const passwordRules = [required('Password is required'), minLength(4)]
export const confirmPasswordRules = [required('Please confirm your password')]
