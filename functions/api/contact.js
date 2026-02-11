function json(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
}

function escapeHtml(s = '') {
    return String(s)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;')
}

async function resendSend(apiKey, payload) {
    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    const text = await res.text()
    let data
    try { data = JSON.parse(text) } catch { data = { raw: text } }

    if (!res.ok) {
        console.error('Resend error:', res.status, data)
        throw new Error(`Resend failed: ${res.status}`)
    }

    return data
}

const SERVICES = new Set(['ppf', 'darkening', 'detailing', 'insurance', 'other'])
const TINTS = new Set(['5', '30', '50', '70'])
const FOLIO = new Set(['cveten', 'bezcveten'])
const COVERAGE = new Set(['cqlo', 'prednica'])
const PACKAGES = new Set(['fenders', 'hood', 'hood_fenders', 'custom'])
const DETAILING = new Set(['Екстериорен детайлинг', 'Интериорен детайлинг', 'Керамично покритие'])

function trim(v) {
    return (v ?? '').toString().trim()
}

function digitsOnly(v) {
    return trim(v).replace(/\D/g, '')
}

function normalizeByService(fd) {
    const selectedService = trim(fd.selectedService)

    const base = {
        name: trim(fd.name),
        phone: trim(fd.phone),
        email: trim(fd.email),
        carMake: trim(fd.carMake),
        message: trim(fd.message),
        promoCode: trim(fd.promoCode),
        selectedService,
    }

    // drop all service fields by default
    let service = {}

    if (selectedService === 'ppf') {
        service = {
            folioType: trim(fd.folioType),
            coverage: trim(fd.coverage),
            package: trim(fd.package),
            customDetails: trim(fd.customDetails),
        }
    } else if (selectedService === 'darkening') {
        service = { tint: trim(fd.tint) }
    } else if (selectedService === 'detailing') {
        service = { detailingType: trim(fd.detailingType) }
    }

    return { ...base, ...service }
}

function validate(fd) {
    // required basics
    if (!fd.name) return 'Missing name'
    if (!fd.phone) return 'Missing phone'
    if (!fd.email) return 'Missing email'
    if (!fd.selectedService) return 'Missing selectedService'
    if (!SERVICES.has(fd.selectedService)) return 'Invalid selectedService'

    // bounds (cheap spam control + safety)
    if (fd.name.length < 2 || fd.name.length > 60) return 'Invalid name'
    if (fd.email.length > 120) return 'Invalid email'
    if (fd.message && fd.message.length > 2000) return 'Invalid message'
    if (fd.carMake && fd.carMake.length > 60) return 'Invalid carMake'
    if (fd.promoCode && fd.promoCode.length > 20) return 'Invalid promoCode'

    // email format (light)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/i.test(fd.email)) return 'Invalid email'

    // phone digits (light)
    const d = digitsOnly(fd.phone)
    if (d.length < 8 || d.length > 15) return 'Invalid phone'

    // service required fields
    if (fd.selectedService === 'ppf') {
        if (!FOLIO.has(fd.folioType)) return 'Invalid folioType'
        if (!COVERAGE.has(fd.coverage)) return 'Invalid coverage'
        if (!PACKAGES.has(fd.package)) return 'Invalid package'
        if (fd.package === 'custom') {
            if (!fd.customDetails || fd.customDetails.length < 5 || fd.customDetails.length > 250) {
                return 'Invalid customDetails'
            }
        }
    }

    if (fd.selectedService === 'darkening') {
        if (!TINTS.has(fd.tint)) return 'Invalid tint'
    }

    if (fd.selectedService === 'detailing') {
        if (!DETAILING.has(fd.detailingType)) return 'Invalid detailingType'
    }

    return null
}

export async function onRequestPost({ request, env }) {
    try {
        const body = await request.json().catch(() => null)
        if (!body) return json({ error: 'Invalid JSON' }, 400)


        if (trim(body.w)) return json({ ok: true }) // empty response for bots

        const formData = normalizeByService(body)
        const errMsg = validate(formData)
        if (errMsg) return json({ error: errMsg }, 400)

        const apiKey = env.RESEND_API_KEY
        if (!apiKey) return json({ error: 'Missing RESEND_API_KEY' }, 500)

        const from = 'IDO Elite Protection <onboarding@resend.dev>' // swap after domain verification
        const ownerTo = 'ivanhinkov@idogroupbg.com'

        // Build a clear service summary (only relevant fields will exist)
        const serviceLines = []
        serviceLines.push(`<p><b>Service:</b> ${escapeHtml(formData.selectedService)}</p>`)

        if (formData.selectedService === 'ppf') {
            serviceLines.push(`<p><b>Folio type:</b> ${escapeHtml(formData.folioType)}</p>`)
            serviceLines.push(`<p><b>Coverage:</b> ${escapeHtml(formData.coverage)}</p>`)
            serviceLines.push(`<p><b>Package:</b> ${escapeHtml(formData.package)}</p>`)
            if (formData.package === 'custom') {
                serviceLines.push(`<p><b>Custom details:</b> ${escapeHtml(formData.customDetails)}</p>`)
            }
        }
        if (formData.selectedService === 'darkening') {
            serviceLines.push(`<p><b>Tint:</b> ${escapeHtml(formData.tint)}%</p>`)
        }
        if (formData.selectedService === 'detailing') {
            serviceLines.push(`<p><b>Detailing type:</b> ${escapeHtml(formData.detailingType)}</p>`)
        }

        // 1) email to owner
        await resendSend(apiKey, {
            from,
            to: ownerTo,
            reply_to: formData.email,
            subject: `New enquiry — ${formData.name}`,
            html: `
        <h2>New enquiry</h2>
        <p><b>Name:</b> ${escapeHtml(formData.name)}</p>
        <p><b>Phone:</b> ${escapeHtml(formData.phone)}</p>
        <p><b>Email:</b> ${escapeHtml(formData.email)}</p>
        <p><b>Car:</b> ${escapeHtml(formData.carMake || '-')}</p>
        ${serviceLines.join('\n')}
        <p><b>Message:</b></p>
        <pre>${escapeHtml(formData.message || '')}</pre>
      `,
        })

        // 2) auto-reply to customer
        await resendSend(apiKey, {
            from,
            to: formData.email,
            subject: 'Получихме вашето запитване',
            html: `
        <p>Здравейте, ${escapeHtml(formData.name)},</p>
        <p>Благодарим ви! Получихме вашето запитване и ще се свържем с вас възможно най-скоро.</p>
        <p><b>Тип услуга:</b> ${escapeHtml(formData.selectedService)}</p>
        <p><b>Вашето съобщение:</b></p>
        <pre>${escapeHtml(formData.message || '')}</pre>
        <p>— IDO Elite Protection</p>
      `,
        })

        return json({ ok: true })
    } catch (err) {
        console.error(err)
        return json({ error: 'Server error' }, 500)
    }
}
