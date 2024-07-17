export default function templateHtml(magicLink) {
  return `
    <html>
      <head></head>
      <body style="background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;">
        <div style="margin: 0 auto; padding: 20px 25px 48px; background-image: url('/assets/raycast-bg.png'); background-position: bottom; background-repeat: no-repeat;">
          <img src="https://i.ibb.co/4M2YJHS/Mask-group.png" width="48" height="48" alt="Raycast" />
          <h1 style="font-size: 28px; font-weight: bold; margin-top: 48px;">🚀 FinCity</h1>
          <div style="margin: 24px 0;">
            <p style="font-size: 16px; line-height: 26px;">
              <a href="${magicLink}" style="color: #682BA4;">👉Clic aquí para validar cuenta 👈</a>
            </p>
            <p style="font-size: 16px; line-height: 26px;">
              Si tú no solicitaste nada, ignora este correo electrónico.
            </p>
          </div>
          <p style="font-size: 16px; line-height: 26px;">
            ¡Saludos!,
            <br />- FinCity Team
          </p>
          <hr style="border-color: #dddddd; margin-top: 48px;" />
          <img src="https://i.ibb.co/4M2YJHS/Mask-group.png" width="32" height="32" style="WebkitFilter: grayscale(100%); filter: grayscale(100%); margin: 20px 0;" />
          <p style="color: #8898aa; font-size: 12px; margin-left: 4px;">FinCity Inc.</p>
          <p style="color: #8898aa; font-size: 12px; margin-left: 4px;">2024</p>
        </div>
      </body>
    </html>
  `
}
