import nodemailer from "nodemailer";

export async function sendInquiryEmail(payload: Record<string, string>) {
  if (!process.env.SMTP_HOST) {
    return { skipped: true };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.FROM_EMAIL || process.env.SMTP_USER,
    to: process.env.TO_EMAIL || "ai.dhruv0346@gmail.com",
    subject: `New Inquiry from ${payload.name} - ${payload.service}`,
    html: `<h2>New website inquiry</h2>${Object.entries(payload).map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`).join("")}`
  });

  await transporter.sendMail({
    from: process.env.FROM_EMAIL || process.env.SMTP_USER,
    to: payload.email,
    subject: `Thanks for reaching out, ${payload.name}!`,
    html: `<p>Thanks for contacting Dhruv Pipaliya. I received your message and will reply within 24 hours.</p><p>Service: ${payload.service}</p>`
  });

  return { skipped: false };
}

export async function sendContactResponseEmail(payload: { to: string; name: string; message: string }) {
  if (!process.env.SMTP_HOST) {
    return { skipped: true };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.FROM_EMAIL || process.env.SMTP_USER,
    to: payload.to,
    subject: `Response from Dhruv Pipaliya`,
    html: `<p>Hi ${payload.name},</p><p>Thank you for your inquiry. Here is my response:</p><div style="background:#f5f5f5;padding:16px;border-radius:8px;">${payload.message.replace(/\n/g, "<br />")}</div><p>Best regards,<br />Dhruv Pipaliya</p>`
  });

  return { skipped: false };
}
