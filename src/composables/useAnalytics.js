import { watch } from 'vue'
import { useScript } from '@unhead/vue'

let analyticsInstance = null
let initStarted = false

export function initAnalytics(consent, router) {
  // If already initialized/started just return instance 
  if (analyticsInstance) return analyticsInstance
  if (initStarted) return analyticsInstance

  if (typeof window === 'undefined') return null
  const GA_ID = import.meta.env.VITE_GA_ID
  if (!GA_ID) return null

  initStarted = true

  // Provide stable api immediately but no-ops until enabled
  const api = {
    event: () => { },
    cta: () => { },
    service: () => { },
    lead: () => { },
    portfolio: () => { },
    scroll: () => { },
  }
  analyticsInstance = api

  // Manual script loader - runs in setup() context in app.vue
  const gaScript = useScript(
    { key: 'ga', src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, defer: true },
    { trigger: 'manual' },
  )

  // Internal flags
  let loaded = false
  let configured = false
  let hooked = false

  // CHECK CONSENT: no events unless consent is true AND GA is configured
  const canTrack = () => consent?.value === true && configured && typeof window.gtag === 'function'

  function pageView(to) {
    if (!canTrack()) return
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: to.fullPath,
    })
  }

  function event(name, params = {}) {
    if (!canTrack()) return
    window.gtag('event', name, params)
  }

  // Fill api[]{} with real functions (they still check canTrack)
  api.event = event
  api.cta = (ctaName, ctaLocation, humanLabel = '') =>
    event('select_content', {
      content_type: 'cta',
      item_id: ctaName,
      location: ctaLocation,
      label: humanLabel,
    })

  api.service = (serviceSlug, serviceName = '', source = '') =>
    event('select_service', { service_slug: serviceSlug, service_name: serviceName, source })

  api.lead = (serviceSlug, serviceName = '', formId = 'contact_form') =>
    event('generate_lead', { form_id: formId, service_slug: serviceSlug, service_name: serviceName })

  api.portfolio = (portfolioId, portfolioName = '') =>
    event('view_item', {
      item_category: 'portfolio',
      item_id: portfolioId,
      item_name: portfolioName,
    })

  api.scroll = (percent) => event('scroll', { percent_scrolled: percent })

  async function ensureGaReady() {
    if (loaded && configured) return
    // Load gtag.js once - only after consent given
    // this is the first network request
    if (!loaded) {
      loaded = true
      await gaScript.load()
    }

    // Bootstrap GA and configure once
    if (!window.dataLayer) window.dataLayer = []
    if (typeof window.gtag !== 'function') {
      window.gtag = function gtag() {
        window.dataLayer.push(arguments)
      }
    }

    if (!configured) {
      configured = true

      // // Consent mode sent to GA
      // window.gtag('consent', 'default', {
      //   analytics_storage: 'denied',
      //   ad_storage: 'denied',
      //   wait_for_update: 500,
      // })

      window.gtag('js', new Date())
      window.gtag('config', GA_ID, { send_page_view: false })
    }
  }
  const disableKey = `ga-disable-${GA_ID}`
  watch(
    () => consent?.value,
    async (value) => {
      // If consent not given do dissable GA  
      if (value !== true) {
        window[disableKey] = true
        return
      }

      window[disableKey] = false

      await ensureGaReady()

      // Hook router once after GA configured
      if (!hooked) {
        hooked = true
        pageView(router.currentRoute.value)

        router.afterEach((to, from) => {
          if (to.path === from.path && to.hash !== from.hash) return
          pageView(to)
        })
      }
    },
    { immediate: true },
  )

  return analyticsInstance
}

export function useAnalytics() {
  return analyticsInstance
}
