import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { BRAND, DEFAULT_DESC } from '@/router'
import { useHead } from '@unhead/vue'

export function useGlobalHead() {
  const route = useRoute()

  const baseUrl = 'https://idogroupbg.com'
  const ogImage = `${baseUrl}/og.png`

  const headTitle = computed(() => route.meta?.title || BRAND)
  const headDesc = computed(() => route.meta?.description || DEFAULT_DESC)

  return useHead(() => {
    const title = headTitle.value
    const desc = headDesc.value
    const canonical = baseUrl + route.path

    const ldJson = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'IDO Elite Protection',
      url: baseUrl,
      telephone: '+359 878 988 996',
      image: ogImage,

      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Научно-производствена зона Искър, ul. "Munchen" 14, Помещение 19',
        addressLocality: 'Sofia',
        postalCode: '1528',
        addressCountry: 'BG',
      },

      areaServed: [
        { '@type': 'City', name: 'Sofia' },
        { '@type': 'Country', name: 'Bulgaria' },
      ],

      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],

      sameAs: [
        'https://www.facebook.com/profile.php?id=61582883043083',
        'https://www.instagram.com/ido_elite_protection/',
      ],
    }

    return {
      title,
      link: [{ rel: 'canonical', href: canonical }],
      meta: [
        { name: 'description', content: desc },

        // Open Graph
        { property: 'og:title', content: title },
        { property: 'og:description', content: desc },
        { property: 'og:url', content: canonical },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'IDO Elite Protection' },
        { property: 'og:locale', content: 'bg_BG' },
        { property: 'og:image', content: ogImage },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: desc },
        { name: 'twitter:image', content: ogImage },
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(ldJson),
        },
      ],
    }
  })
}
