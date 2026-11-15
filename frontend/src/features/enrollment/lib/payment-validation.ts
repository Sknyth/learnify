export type PaymentField = 'name' | 'number' | 'expiry' | 'cvc'

export type PaymentErrors = Record<PaymentField, string>

export type PaymentValues = Record<PaymentField, string>

export const emptyPaymentErrors: PaymentErrors = {
  name: '',
  number: '',
  expiry: '',
  cvc: '',
}

export function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4)

  if (digits.length >= 2) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`
  }

  return digits
}

export function validatePaymentField(field: PaymentField, value: string) {
  const trimmed = value.trim()

  if (field === 'name') {
    if (!trimmed) return "Enter the cardholder's name"
    if (trimmed.length < 3) return 'The name is too short.'
    return ''
  }

  if (field === 'number') {
    const digits = value.replace(/\D/g, '')
    if (!digits) return 'Enter the card number'
    if (digits.length < 16) return 'The number is too short.'
    return ''
  }

  if (field === 'expiry') {
    if (!value) return 'Enter the card expiry date'
    if (value.length < 5) return 'Expiry date must be in MM/YY format'
    return ''
  }

  if (!trimmed) return 'Enter the card CVC'
  if (trimmed.length < 3) return 'CVC is too short'
  return ''
}

export function validatePayment(values: PaymentValues) {
  const errors: PaymentErrors = {
    name: validatePaymentField('name', values.name),
    number: validatePaymentField('number', values.number),
    expiry: validatePaymentField('expiry', values.expiry),
    cvc: validatePaymentField('cvc', values.cvc),
  }

  return {
    errors,
    isValid: Object.values(errors).every((error) => !error),
  }
}
