import { useStorage } from '@vueuse/core'
import { computed } from 'vue'

export function usePrivacyConsent() {
    const consentStorage = useStorage('privacy-consent', null, localStorage)
    const accepted = computed(() => {
        try {
            const parsed = JSON.parse(consentStorage.value)
            if (parsed === true || parsed === false) {
                return parsed
            }
            consentStorage.value = null
            return null
        } catch {
            consentStorage.value = null
            return null
        }
    })


    const accept = () => (consentStorage.value = true)
    const decline = () => (consentStorage.value = false)

    return { accepted, accept, decline }
}