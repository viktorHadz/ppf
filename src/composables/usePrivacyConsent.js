import { ref, onMounted, onUnmounted } from 'vue'

const accepted = ref(null)
let inited = false

function read() {
  const raw = localStorage.getItem('privacy-consent')
  if (raw === null) {
    localStorage.setItem('privacy-consent', 'null')
    accepted.value = null
    return
  }
  accepted.value = raw === 'true' ? true : raw === 'false' ? false : null
}

/**
 * Initialises the store
 * @listens focus 
 * @listens visibilitychange 
 */
function init() {
  if (inited) return
  if (typeof window === 'undefined') return // SSG/SSR safety
  inited = true

  let onFocus
  let onVis
  let onStore

  onMounted(() => {
    read()
    onFocus = () => read()
    onVis = () => {
      if (!document.hidden) read()
    }
    onStore = (e) => {
      if (e.key === 'privacy-consent') read()
    }
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('storage', onStore)
  })

  onUnmounted(() => {
    if (onFocus) window.removeEventListener('focus', onFocus)
    if (onVis) document.removeEventListener('visibilitychange', onVis)
    if (onStore) window.removeEventListener('storage', onStore)
  })
}

/**
 * Initialises consent storage by calling, and returns controls
 * @init initialises store and sets up event listeners for visibility changes 
 */
export function usePrivacyConsent() {
  init()

  const accept = () => {
    localStorage.setItem('privacy-consent', 'true')
    accepted.value = true
  }

  const decline = () => {
    localStorage.setItem('privacy-consent', 'false')
    accepted.value = false
  }

  return { accepted, accept, decline }
}