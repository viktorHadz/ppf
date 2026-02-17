import { watch } from 'vue'

/**
 * @typedef {Object} AnalyticsAPI
 * @property {(name: string, params?: Record<string, any>) => void} event
 * @property {(ctaName: string, ctaLocation: string, humanLabel?: string) => void} cta
 * @property {(serviceSlug: string, serviceName?: string, source?: string) => void} service
 * @property {(serviceSlug: string, serviceName?: string, formId?: string) => void} lead
 * @property {(portfolioId: string, portfolioName?: string) => void} openItem
 * @property {(portfolioId: string, portfolioName?: string) => void} closeItem
 * @property {(percent: number) => void} scroll
 */

let analyticsInstance = /** @type {AnalyticsAPI|null} */ (null)
let initStarted = false

function isBrowser() {
  return typeof window !== 'undefined'
}

function ensureGtagStub() {
  if (!isBrowser()) return false
  // Create a stub even if gtag.js is slow
  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments)
    }

  return typeof window.gtag === 'function'
}

function updateConsentMode(granted) {
  if (!ensureGtagStub()) return

  window.gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

function makeCanTrack(consentRef) {
  return function canTrack() {
    return (
      isBrowser() &&
      consentRef?.value === true &&
      typeof window.gtag === 'function'
    )
  }
}

function sendEvent(canTrack, name, params = {}) {
  if (!canTrack()) return
  window.gtag('event', name, params)
}

function sendPageView(canTrack, to) {
  sendEvent(canTrack, 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: to?.fullPath || window.location.pathname,
  })
}

function hookRouterPageViews(router, canTrack) {
  sendPageView(canTrack, router.currentRoute.value)

  // SPA navigations
  router.afterEach((to, from) => {
    if (to.path === from.path && to.hash !== from.hash) return
    sendPageView(canTrack, to)
  })
}

export function initAnalytics(consent, router) {
  if (analyticsInstance) return analyticsInstance
  if (initStarted) return analyticsInstance
  if (!isBrowser()) return null

  const GA_ID = import.meta.env.VITE_GA_ID
  if (!GA_ID) return null

  initStarted = true
  ensureGtagStub()

  const canTrack = makeCanTrack(consent)

  /** @type {AnalyticsAPI} */
  const api = {
    event: () => { },
    cta: () => { },
    service: () => { },
    lead: () => { },
    openItem: () => { },
    closeItem: () => { },
    scroll: () => { },
  }

  api.event = (name, params = {}) => sendEvent(canTrack, name, params)

  api.cta = (ctaName, ctaLocation, humanLabel = '') =>
    sendEvent(canTrack, 'select_content', {
      content_type: 'cta',
      item_id: ctaName,
      location: ctaLocation,
      label: humanLabel,
    })

  api.service = (serviceSlug, serviceName = '', source = '') =>
    sendEvent(canTrack, 'select_service', {
      service_slug: serviceSlug,
      service_name: serviceName,
      source,
    })

  api.lead = (serviceSlug, serviceName = '', formId = 'contact_form') =>
    sendEvent(canTrack, 'generate_lead', {
      form_id: formId,
      service_slug: serviceSlug,
      service_name: serviceName,
    })

  // --- portfolio open/close with duration ---
  const openStarts = new Map() // portfolioId -> performance.now()

  api.openItem = (portfolioId, portfolioName = '') => {
    openStarts.set(portfolioId, performance.now())
    sendEvent(canTrack, 'view_item_open', {
      item_category: 'portfolio',
      item_id: portfolioId,
      item_name: portfolioName,
    })
  }

  api.closeItem = (portfolioId, portfolioName = '') => {
    const start = openStarts.get(portfolioId)
    const durationMs =
      typeof start === 'number' ? Math.max(0, Math.round(performance.now() - start)) : undefined
    openStarts.delete(portfolioId)

    sendEvent(canTrack, 'view_item_close', {
      item_category: 'portfolio',
      item_id: portfolioId,
      item_name: portfolioName,
      ...(typeof durationMs === 'number' ? { open_duration_ms: durationMs } : {}),
    })
  }

  api.scroll = (percent) =>
    sendEvent(canTrack, 'scroll', { percent_scrolled: percent })


  analyticsInstance = api

  let routerHooked = false
  let sentPvAfterGrant = false

  // Watch consent:
  watch(
    () => consent?.value,
    (value, prev) => {
      const granted = value === true
      updateConsentMode(granted)

      // Hook router once 
      if (!routerHooked) {
        routerHooked = true
        hookRouterPageViews(router, canTrack)
      }

      // Send page_view immediately once consent flips to granted
      if (granted && !sentPvAfterGrant && prev !== true) {
        sentPvAfterGrant = true
        sendPageView(canTrack, router?.currentRoute?.value)
      }

      if (!granted) {
        sentPvAfterGrant = false
      }
    },
    { immediate: true },
  )

  return analyticsInstance
}

export function useAnalytics() {
  return analyticsInstance
}
