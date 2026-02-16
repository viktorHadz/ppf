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

    // cheap spam control 
    if (fd.name.length < 2 || fd.name.length > 60) return 'Invalid name'
    if (fd.email.length > 120) return 'Invalid email'
    if (fd.message && fd.message.length > 2000) return 'Invalid message'
    if (fd.carMake && fd.carMake.length > 60) return 'Invalid carMake'
    if (fd.promoCode && fd.promoCode.length > 20) return 'Invalid promoCode'

    // email format 
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/i.test(fd.email)) return 'Invalid email'

    // phone digits 
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

        const from = 'IDO Elite Protection <no-reply@idogroupbg.com>' // swap after domain verification
        const ownerTo = 'ivanhinkov@idogroupbg.com'

        // Build a service summary 
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
            replyTo: formData.email,
            subject: `New enquiry - ${formData.name}`,
            html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f5f5f5;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;font-family:Arial,Helvetica,sans-serif;">
<tr>
<td align="center">

<table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:10px;border:1px solid #e5e7eb;overflow:hidden;">

<!-- Header -->
<tr>
<td style="padding:18px 22px;border-bottom:1px solid #e5e7eb;">
<div style="font-size:15px;font-weight:700;color:#111827;">
Ново запитване от сайта
</div>
<div style="font-size:12px;color:#6b7280;margin-top:4px;">
IDO Elite Protection
</div>
</td>
</tr>

<!-- Contact block -->
<tr>
<td style="padding:20px 22px;">
<table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.7;color:#111827;">
<tr>
<td style="width:120px;color:#6b7280;">Име</td>
<td><strong>${escapeHtml(formData.name)}</strong></td>
</tr>

<tr>
<td style="color:#6b7280;">Телефон</td>
<td style="font-size:16px;">
<strong>
<a href="tel:${escapeHtml(formData.phone)}" style="color:#dc2626;text-decoration:none;">
${escapeHtml(formData.phone)}
</a>
</strong>
</td>
</tr>

<tr>
<td style="color:#6b7280;">Имейл</td>
<td>
<a href="mailto:${escapeHtml(formData.email)}" style="color:#111827;text-decoration:none;">
${escapeHtml(formData.email)}
</a>
</td>
</tr>

<tr>
<td style="color:#6b7280;">Автомобил</td>
<td>${escapeHtml(formData.carMake || '—')}</td>
</tr>
</table>
</td>
</tr>

<!-- Service summary -->
<tr>
  <td style="padding:0 22px 20px 22px;">
    <div style="font-size:13px;color:#6b7280;margin-bottom:6px;">УСЛУГА</div>
    <div style="font-size:14px;line-height:1.7;color:#111827;">
      ${serviceLines.join('')}
    </div>
  </td>
</tr>

<!-- Message -->
<tr>
<td style="padding:0 22px 20px 22px;">
<div style="font-size:13px;color:#6b7280;margin-bottom:6px;">СЪОБЩЕНИЕ</div>
<div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px;font-size:14px;white-space:pre-line;">
${escapeHtml(formData.message || '—')}
</div>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="padding:14px 22px;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;">
Цъкни върху имейла на клиента за да пишеш директно на клиента. 
<p> П.С. Поздрави от бай Вик :–)</p>
</td>
</tr>

</table>

</td>
</tr>
</table>
</body>
</html>
`,
        })

        // 2) auto-reply to customer
        await resendSend(apiKey, {
            from,
            to: formData.email,
            subject: 'Получихме вашето запитване',
            html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0b0c10;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0b0c10;padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#111318;border-radius:12px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;color:#e5e7eb;">

<!-- Header -->
<tr>
<td style="padding:28px 32px;border-bottom:1px solid #1f2937;">
<div style="font-size:18px;font-weight:700;letter-spacing:1px;color:#ffffff;">
IDO ELITE PROTECTION
</div>
<div style="font-size:12px;color:#9ca3af;margin-top:4px;">
Елитна визия премиум защита
</div>
</td>
</tr>

<!-- Hero message -->
<tr>
<td style="padding:36px 32px 8px 32px;">
<div style="font-size:22px;font-weight:700;color:#ffffff;">
Благодарим ви, ${escapeHtml(formData.name)}.
</div>
</td>
</tr>

<tr>
<td style="padding:0 32px 24px 32px;">
<div style="font-size:15px;line-height:1.7;color:#cbd5e1;">
Получихме вашето запитване и вече е при нашия екип.
<br><br>
Ще се свържем с вас в рамките на работния ден, за да обсъдим автомобила, възможностите и най-подходящото решение за защита.
</div>
</td>
</tr>

<!-- Divider -->
<tr>
<td style="padding:8px 32px;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td style="height:1px;background:#1f2937;"></td>
</tr>
</table>
</td>
</tr>

<!-- Summary box -->
<tr>
<td style="padding:24px 32px;">
<div style="font-size:13px;color:#9ca3af;margin-bottom:12px;">
РЕЗЮМЕ НА ЗАПИТВАНЕТО
</div>

<table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.6;">
<tr>
<td style="color:#9ca3af;width:110px;">Име:</td>
<td style="color:#ffffff;">${escapeHtml(formData.name)}</td>
</tr>
<tr>
<td style="color:#9ca3af;">Телефон:</td>
<td style="color:#ffffff;">${escapeHtml(formData.phone)}</td>
</tr>
<tr>
<td style="color:#9ca3af;">Имейл:</td>
<td style="color:#ffffff;">${escapeHtml(formData.email)}</td>
</tr>
<tr>
<td style="color:#9ca3af;">Автомобил:</td>
<td style="color:#ffffff;">${escapeHtml(formData.carMake || '')}</td>
</tr>
</table>
</td>
</tr>

<!-- Message -->
<tr>
<td style="padding:0 32px 28px 32px;">
<div style="font-size:13px;color:#9ca3af;margin-bottom:8px;">ВАШЕТО СЪОБЩЕНИЕ</div>
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td style="background:#0b0c10;border:1px solid #1f2937;border-radius:8px;padding:14px;font-size:14px;color:#e5e7eb;white-space:pre-line;">
${escapeHtml(formData.message || '—')}
</td>
</tr>
</table>
</td>
</tr>

<!-- CTA -->
<tr>
<td align="center" style="padding:10px 32px 36px 32px;">
<a href="https://idogroupbg.com"
style="display:inline-block;background:#dc2626;color:#ffffff;text-decoration:none;padding:14px 26px;border-radius:8px;font-size:14px;font-weight:700;letter-spacing:0.5px;">
ПОСЕТЕТЕ НАШИЯ САЙТ
</a>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="background:#0b0c10;padding:24px 32px;text-align:center;font-size:12px;color:#6b7280;">
IDO Elite Protection<br>
PPF фолио • Детайлинг • Затъмняване • Застраховки <br><br>
Това е автоматично съобщение. Не е необходимо да отговаряте на него.
</td>
</tr>

</table>

</td>
</tr>
</table>
</body>
</html>
`,
        })

        return json({ ok: true })
    } catch (err) {
        console.error(err)
        return json({ error: 'Server error' }, 500)
    }
}
