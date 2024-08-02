import { Resend } from 'resend'

export default async function Email(to, subject, template) {
  const resend = new Resend(process.env.EMAIL_RESEND_API)

  const { data, error } = await resend.emails.send({
    from: `FinCity <${process.env.EMAIL_RESEND_FROM}>`,
    to,
    subject,
    html: template
  })

  if (error) {
    console.log(error)
    throw new Error({ error: error.message })
  }

  return data
}
