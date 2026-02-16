import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useScript } from '@unhead/vue'

/** @type {Analytics|null} */
let analyticsInstance = null

/**
 * Analytics API returned by initAnalytics() and useAnalytics().
 *
 * @typedef {Object} Analytics
 * @property {(name: string, params?: Record<string, any>) => void} event Low-level escape hatch to send arbitrary GA events.
 * @property {(ctaId: string, placement: string, label?: string) => void} cta Track CTA click.
 * @property {(serviceSlug: string, serviceName?: string, source?: string) => void} service Track service interest (user chooses a service).
 * @property {(serviceSlug: string, serviceName?: string, formId?: string) => void} lead Track lead / conversion (after successful submit).
 * @property {(portfolioId: string, portfolioName?: string) => void} portfolio Track portfolio item view/open.
 * @property {(percent: 25|50|75|100|number) => void} scroll Track scroll depth checkpoints (25/50/75/100).
 * @property {() => Record<string, any>} help Return the runtime spec/docs object (handy in console).
 * @property {Record<string, any>} spec Runtime “docs” object describing the event schema.
 */

/**
 * Initialize GA once (call from App.vue).
 * @param {import('vue').Ref<true|false|null>} consent
 * @returns {Analytics|null}
 */
export function initAnalytics(consent) {
    if (analyticsInstance) return analyticsInstance

    const router = useRouter()
    const GA_ID = import.meta.env.VITE_GA_ID
    if (!GA_ID) return null

    useScript({
        key: 'ga',
        src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
        defer: true,
    })

    // Google bootstrap (required)
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
        window.dataLayer.push(arguments)
    }

    let configured = false
    let hooked = false

    const canTrack = () => consent?.value === true && typeof window.gtag === 'function'

    function pageView(to) {
        if (!canTrack()) return
        window.gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: to.fullPath,
        })
    }

    /**
     * Low-level escape hatch.
     * @param {string} name GA event name
     * @param {Record<string, any>} [params] Optional GA params payload
     */
    function event(name, params = {}) {
        if (!canTrack()) return
        window.gtag('event', name, params)
    }

    /**
     * Track CTA click.
     * asdasdasd
     * @param {string} ctaName Stable ID (e.g. "hero_cta", "nav_contact", "home_learn_more")
     * @param {string} ctaLocation Where it sits (e.g. "hero", "nav", "home_services", "footer")
     * @param {string} [humanLabel] Optional human label - Bulgarian ok
     */
    function cta(ctaName, ctaLocation, humanLabel = '') {
        event('select_content', {
            content_type: 'cta',
            item_id: ctaName,
            location: ctaLocation,
            label: humanLabel,
        })
    }

    /**
     * Track service interest (user chooses a service from a list/menu).
     * @param {string} serviceSlug Stable slug (e.g. "ppf", "tinting", "detailing")
     * @param {string} [serviceName] Optional pretty name
     * @param {string} [source] Where the choice happened (e.g. "home_services", "nav", "footer")
     */
    function service(serviceSlug, serviceName = '', source = '') {
        event('select_service', {
            service_slug: serviceSlug,
            service_name: serviceName,
            source,
        })
    }

    /**
     * Track lead (your “conversion” for service business).
     * Call AFTER validation passes and you actually submit/send the form.
     * @param {string} serviceSlug
     * @param {string} [serviceName]
     * @param {string} [formId]
     */
    function lead(serviceSlug, serviceName = '', formId = 'contact_form') {
        event('generate_lead', {
            form_id: formId,
            service_slug: serviceSlug,
            service_name: serviceName,
        })
    }

    /**
     * Track portfolio modal open / item view.
     * @param {string} portfolioId Stable ID/slug (best)
     * @param {string} [portfolioName] Human title
     */
    function portfolio(portfolioId, portfolioName = '') {
        event('view_item', {
            item_category: 'portfolio',
            item_id: portfolioId,
            item_name: portfolioName,
        })
    }

    /**
     * Track scroll depth (send 25/50/75/100).
     * @param {number} percent
     */
    function scroll(percent) {
        event('scroll', { percent_scrolled: percent })
    }

    // Runtime “docs” you can inspect in console
    const spec = {
        events: {
            select_content: {
                purpose: 'CTA click',
                params: {
                    content_type: 'always "cta"',
                    item_id: 'ctaId (stable)',
                    location: 'placement',
                    label: 'optional text',
                },
            },
            select_service: {
                purpose: 'Service interest',
                params: {
                    service_slug: 'stable slug',
                    service_name: 'optional pretty name',
                    source: 'where it happened',
                },
            },
            generate_lead: {
                purpose: 'Lead / conversion',
                params: {
                    form_id: 'default contact_form',
                    service_slug: 'stable slug',
                    service_name: 'optional name',
                },
            },
            view_item: {
                purpose: 'Portfolio open',
                params: {
                    item_category: 'always "portfolio"',
                    item_id: 'stable portfolio id/slug',
                    item_name: 'optional title',
                },
            },
            scroll: {
                purpose: 'Scroll depth checkpoints',
                params: { percent_scrolled: 'number (25/50/75/100)' },
            },
        },
    }

    /** @returns {Record<string, any>} */
    function help() {
        return spec
    }

    watch(
        () => consent.value,
        (value) => {
            if (value !== true) return

            if (!configured) {
                configured = true
                window.gtag('js', new Date())
                window.gtag('config', GA_ID, { send_page_view: false })
            }

            if (!hooked) {
                hooked = true
                pageView(router.currentRoute.value)
                router.afterEach((to, from) => {
                    // ignore hash-only jumps (optional; delete if you want anchors tracked)
                    if (to.path === from.path && to.hash !== from.hash) return
                    pageView(to)
                })
            }
        },
        { immediate: true }
    )

    /** @type {Analytics} */
    analyticsInstance = { event, cta, service, lead, portfolio, scroll, help, spec }
    return analyticsInstance
}

/**
 * Use inside components after initAnalytics() ran in App.vue.
 * @returns {Analytics|null}
 */
export function useAnalytics() {
    return analyticsInstance
}
