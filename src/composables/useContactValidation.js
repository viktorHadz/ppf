import { reactive } from 'vue'

export function useContactValidation(form) {
  const errors = reactive({
    name: '',
    phone: '',
    email: '',
    carMake: '',
    message: '',
    promoCode: '',
    consent: '',

    selectedService: '',
    tint: '',
    detailingType: '',
    folioType: '',
    coverage: '',
    package: '',
    customDetails: '',
  })

  const dirty = reactive(Object.fromEntries(Object.keys(errors).map((k) => [k, false])))

  const trim = (v) => (v ?? '').toString().trim()

  const required = (label, v) => (trim(v) ? '' : `${label} е задължително поле`)
  const requiredBool = (label, v) => (v === true ? '' : `${label} е задължително поле`)

  const len = (label, v, min, max) => {
    const s = trim(v)
    if (!s) return ''
    if (s.length < min) return `${label} трябва да е поне ${min} символа`
    if (s.length > max) return `${label} трябва да е до ${max} символа`
    return ''
  }

  const isEmail = (v) => {
    const s = trim(v)
    if (!s) return ''
    return /^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/i.test(s) ? '' : 'Невалиден имейл адрес'
  }

  const isPhone = (v) => {
    const s = trim(v)
    if (!s) return ''
    const digits = s.replace(/\D/g, '')
    return digits.length >= 8 && digits.length <= 15 ? '' : 'Невалиден телефонен номер'
  }

  const SERVICE = {
    PPF: 'ppf',
    DARKENING: 'darkening',
    DETAILING: 'detailing',
    INSURANCE: 'insurance',
    OTHER: 'other',
  }

  const ALLOWED = new Set(Object.values(SERVICE))

  // ---------- service clearing ----------
  function clearPPF() {
    form.folioType = ''
    form.coverage = ''
    form.package = ''
    form.customDetails = ''

    errors.folioType = ''
    errors.coverage = ''
    errors.package = ''
    errors.customDetails = ''

    dirty.folioType = false
    dirty.coverage = false
    dirty.package = false
    dirty.customDetails = false
  }

  function clearDarkening() {
    form.tint = ''
    errors.tint = ''
    dirty.tint = false
  }

  function clearDetailing() {
    form.detailingType = ''
    errors.detailingType = ''
    dirty.detailingType = false
  }

  function clearServiceSelectionsExcept(nextService) {
    if (nextService !== SERVICE.PPF) clearPPF()
    if (nextService !== SERVICE.DARKENING) clearDarkening()
    if (nextService !== SERVICE.DETAILING) clearDetailing()
  }

  function setService(nextService) {
    if (!ALLOWED.has(nextService)) return
    if (form.selectedService === nextService) return

    clearServiceSelectionsExcept(nextService)

    form.selectedService = nextService
    dirty.selectedService = true
    validateField('selectedService')
  }

  // ---------- validation ----------
  function validateField(field) {
    switch (field) {
      // base
      case 'name':
        errors.name = required('Името', form.name) || len('Името', form.name, 2, 60)
        break

      case 'phone':
        errors.phone =
          required('Телефонът', form.phone) ||
          isPhone(form.phone) ||
          len('Телефонът', form.phone, 1, 60)
        break

      case 'email':
        errors.email =
          required('Имейлът', form.email) ||
          isEmail(form.email) ||
          len('Имейлът', form.email, 1, 60)
        break

      case 'carMake':
        errors.carMake = len('Марка/модел', form.carMake, 1, 60)
        break

      case 'message':
        // make it required (your UI basically assumes it is)
        errors.message = len('Съобщението', form.message, 10, 2000)
        break

      case 'promoCode':
        errors.promoCode = len('Промо кодът', form.promoCode, 1, 20)
        break

      case 'consent':
        errors.consent = requiredBool('Съгласието', form.consent)
        break

      // service selection
      case 'selectedService':
        errors.selectedService = required('Тип на запитване', form.selectedService)
        break

      // service blocks required when service selected
      case 'folioType':
        errors.folioType =
          form.selectedService === SERVICE.PPF ? required('Тип фолио', form.folioType) : ''
        break

      case 'coverage':
        errors.coverage =
          form.selectedService === SERVICE.PPF ? required('Покритие', form.coverage) : ''
        break

      case 'package':
        errors.package = form.selectedService === SERVICE.PPF ? required('Пакет', form.package) : ''
        break

      case 'customDetails': {
        const needs = form.selectedService === SERVICE.PPF && trim(form.package) === 'custom'
        errors.customDetails = needs
          ? required('Персонално', form.customDetails) ||
            len('Персонално', form.customDetails, 5, 250)
          : ''
        break
      }

      case 'tint':
        errors.tint =
          form.selectedService === SERVICE.DARKENING ? required('Тип затъмняване', form.tint) : ''
        break

      case 'detailingType':
        errors.detailingType =
          form.selectedService === SERVICE.DETAILING
            ? required('Тип детайлинг', form.detailingType)
            : ''
        break
    }

    return !errors[field]
  }

  function validateAll() {
    const fields = [
      'name',
      'phone',
      'email',
      'message',
      'promoCode',
      'carMake',
      'consent',
      'selectedService',
    ]

    if (form.selectedService === SERVICE.PPF) {
      fields.push('folioType', 'coverage', 'package')
      if (trim(form.package) === 'custom') fields.push('customDetails')
    }

    if (form.selectedService === SERVICE.DARKENING) fields.push('tint')
    if (form.selectedService === SERVICE.DETAILING) fields.push('detailingType')

    let ok = true
    for (const f of fields) {
      dirty[f] = true
      if (!validateField(f)) ok = false
    }
    return ok
  }

  function onBlur(field) {
    // dirties only if user types something
    if (field === 'message') {
      if (!trim(form.message)) return
    }
    if (field === 'promoCode') {
      if (!trim(form.promoCode)) return
    }

    dirty[field] = true
    validateField(field)
  }

  function onInput(field) {
    if (field === 'message' && trim(form.message) && !dirty.message) {
      dirty.message = true
    }
    if (field === 'promoCode' && trim(form.promoCode) && !dirty.promoCode) {
      dirty.promoCode = true
    }

    if (dirty[field]) validateField(field)
  }

  function resetValidation() {
    for (const k of Object.keys(errors)) errors[k] = ''
    for (const k of Object.keys(dirty)) dirty[k] = false
  }

  function resetForm() {
    form.name = ''
    form.phone = ''
    form.email = ''
    form.carMake = ''
    form.message = ''
    form.selectedService = ''
    form.promoCode = ''
    form.consent = true

    clearPPF()
    clearDarkening()
    clearDetailing()

    resetValidation()
  }

  return {
    errors,
    dirty,
    validateField,
    validateAll,
    onBlur,
    onInput,
    setService,
    resetForm,
    SERVICE, // handy for comparisons if you want
  }
}
