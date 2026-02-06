export async function onRequestPost(ctx) {
    try {
        const { name, email, message } = await ctx.request.json()

        if (!name || !email || !message) {
            return json({ error: "Missing fields" }, 400)
        }

        const apiKey = ctx.env.RESEND_API_KEY
        const from = "IDO Elite Protection <onboarding@resend.dev>" // replace later with your verified sender
        const ownerTo = "ivanhinkov@idogroupbg.com"

        // 1. email to ivanhinkov@idogroupbg.com
        await resendSend(apiKey, {
            from,
            to: ownerTo,
            reply_to: email,
            subject: `New enquiry — ${name}`,
            html: `
        <h2>New enquiry</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Message:</b></p>
        <pre>${escapeHtml(message)}</pre>
      `,
        })

        // 2. auto-reply to customer
        await resendSend(apiKey, {
            from,
            to: "ivanhinkov@idogroupbg.com",
            subject: "We got your message ✅",
            html: `
        <p>Hi ${escapeHtml(name)},</p>
        <p>Thanks for reaching out — we’ve received your message and we’ll get back to you shortly.</p>
        <p><b>Your message:</b></p>
        <pre>${escapeHtml(message)}</pre>
        <pre>${escapeHtml(email)}</pre>
        <p>— IDO Elite Protection</p>
      `,
        })

        return json({ ok: true })
    } catch (err) {
        console.error(err)
        return json({ error: "Server error" }, 500)
    }
}

async function resendSend(apiKey, payload) {
    const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
    })

    if (!res.ok) {
        const text = await res.text()
        throw new Error(`Resend error ${res.status}: ${text}`)
    }

    return res.json()
}

function json(obj, status = 200) {
    return new Response(JSON.stringify(obj), {
        status,
        headers: { "content-type": "application/json" },
    })
}

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
    ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    }[c] || c)
    )
}
