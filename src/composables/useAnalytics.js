import { computed, watch } from 'vue'
import { useHead } from '@unhead/vue'
import { useRouter } from 'vue-router'

export function useGoogleAnalytics(consentAccepted) {
    const router = useRouter()
    const GA_ID = import.meta.env.VITE_GA_ID
    // Returns true only in PROD and if user provided consent
    const enabled = computed(() => {
        return /*import.meta.env.PROD &&*/ consentAccepted.value === true && !!GA_ID
    })

    // Inject scripts ONLY when enabled=true
    useHead(() => {
        if (!enabled.value) return {}

        return {
            script: [
                {
                    key: 'ga-gtag-src',
                    async: true,
                    src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
                },

                {
                    key: 'ga-gtag-init',
                    children: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', 'G-0LF6SLEL7Q', { send_page_view: false, debug_mode: true });
                    `.trim(),
                },
            ],
        }
    })

    // Send page views on route change when enabled=true
    const sendPageView = (to) => {
        if (!enabled.value) return
        if (typeof window.gtag !== 'function') return

        window.gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: to.fullPath,
        })
    }

    // Fire a page view event first time enabled=true
    watch(enabled, (enabledTrue) => {
        if (enabledTrue) sendPageView(router.currentRoute.value)
    })

    // Fire on every navigation
    router.afterEach((to) => sendPageView(to))

    // If user switches withdraws consent later
    watch(
        () => consentAccepted.value,
        (v) => {
            if (v === false && GA_ID) {
                // provided by google 
                window[`ga-disable-${GA_ID}`] = true
            }
        },
    )
}
