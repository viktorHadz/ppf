import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { BRAND, DEFAULT_DESC } from '@/router'
import { useHead } from '@unhead/vue'

const serviceMap = {
  '/ppf': 'PPF защитно фолио (Paint Protection Film)',
  '/tinting': 'Затъмняване на автостъкла',
  '/detailing': 'Авто детайлинг',
  '/insurance': 'Застраховки и Каско (консултация)',
}

function normalizePath(path) {
  if (!path || path === '/') return '/'
  return path.replace(/\/+$/, '')
}

function findServiceType(p) {
  const key = Object.keys(serviceMap).find((k) => p === k || p.startsWith(k + '/'))
  return key ? serviceMap[key] : null
}

export function useGlobalHead() {
  const route = useRoute()

  const baseUrl = 'https://idogroupbg.com'
  const ogImage = `${baseUrl}/og.png`

  const headTitle = computed(() => route.meta?.title || BRAND)
  const headDesc = computed(() => route.meta?.description || DEFAULT_DESC)

  return useHead(() => {
    const title = headTitle.value
    const desc = headDesc.value

    const p = normalizePath(route.path)
    const canonical = p === '/' ? `${baseUrl}/` : `${baseUrl}${p}`

    const businessId = `${baseUrl}/#business`
    const websiteId = `${baseUrl}/#website`
    const webpageId = `${canonical}#webpage`
    const breadcrumbId = `${canonical}#breadcrumb`
    const serviceId = `${canonical}#service`

    const businessJson = {
      '@type': 'LocalBusiness',
      '@id': businessId,
      name: 'IDO Elite Protection',
      url: baseUrl,
      description: DEFAULT_DESC,
      telephone: '+359 878 988 996',
      image: ogImage,
      address: {
        '@type': 'PostalAddress',
        streetAddress:
          'Научно-производствена зона Искър, ul. "Munchen" 14, Помещение 19',
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

    const websiteJson = {
      '@type': 'WebSite',
      '@id': websiteId,
      url: baseUrl,
      name: BRAND,
    }

    const webpageJson = {
      '@type': 'WebPage',
      '@id': webpageId,
      url: canonical,
      name: title,
      description: desc,
      inLanguage: 'bg-BG',
      isPartOf: { '@id': websiteId },
      about: { '@id': businessId },
    }

    const breadcrumbJson =
      p === '/'
        ? null
        : {
          '@type': 'BreadcrumbList',
          '@id': breadcrumbId,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Начало',
              item: `${baseUrl}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: route.name ? String(route.name) : title,
              item: canonical,
            },
          ],
        }

    const serviceType = findServiceType(p)
    const serviceJson = serviceType
      ? {
        '@type': 'Service',
        '@id': serviceId,
        name: serviceType,
        serviceType,
        url: canonical,
        areaServed: { '@type': 'City', name: 'Sofia' },
        provider: { '@id': businessId },
      }
      : null

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        businessJson,
        websiteJson,
        webpageJson,
        ...(breadcrumbJson ? [breadcrumbJson] : []),
        ...(serviceJson ? [serviceJson] : []),
      ],
    }
    const isHome = p === '/'

    const preloadLinks = isHome
      ? [
        {
          key: 'preload-home-hero-poster',
          rel: 'preload',
          as: 'image',
          href: '/hero/img/home-hero-poster.webp',
        },
      ]
      : []
    return {
      title,
      link: [{ rel: 'canonical', href: canonical },
      ...preloadLinks
      ],
      meta: [
        { name: 'description', content: desc },

        // Open Graph
        { property: 'og:title', content: title },
        { property: 'og:description', content: desc },
        { property: 'og:url', content: canonical },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: BRAND },
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
          key: 'schema-org',              // helps dedupe
          type: 'application/ld+json',
          textContent: JSON.stringify(jsonLd),
        },
      ],
    }
  })
}
