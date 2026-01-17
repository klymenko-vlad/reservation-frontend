type VuetifyRule = (value: string) => boolean | string

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const required = (msg = 'This field is required'): VuetifyRule =>
  (v) => !!v || msg

export const email = (msg = 'Email must be valid'): VuetifyRule =>
  (v) => !v || EMAIL_REGEX.test(v) || msg

export const minLength = (min: number, msg?: string): VuetifyRule =>
  (v) => !v || v.length >= min || msg || `Must be at least ${min} characters`

export const emailRules = [required('Email is required'), email()]
export const passwordRules = [required('Password is required'), minLength(4)]

export const formRules = {
  required: (fieldName = 'This field') => (value: string) => {
    return !!value || `${fieldName} is required`
  },

  date: (value: string) => {
    return !!value || 'Date is required'
  },

  endDateAfterStart: (startDate: string) => (endDate: string) => {
    if (!startDate || !endDate) return true
    return new Date(endDate) > new Date(startDate) || 'End date must be after start date'
  },

  propertyName: (value: string) => {
    return (value && value.length >= 3) || 'Property name must be at least 3 characters'
  },

  propertyDescription: (value: string) => {
    return (value && value.length >= 10) || 'Description must be at least 10 characters'
  },

  price: (value: string) => {
    const num = Number(value)
    return num > 0 || 'Price must be greater than 0'
  },
}
