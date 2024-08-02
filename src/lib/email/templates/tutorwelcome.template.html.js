export default function templateHtml(magicLink, name) {
  return `
     <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>

  <body
    style="
      background-color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    "
  >
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width: 37.5em"
    >
      <tbody>
        <tr style="width: 100%">
          <td>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="
                border: 1px solid rgb(0, 0, 0, 0.1);
                border-radius: 3px;
                overflow: hidden;
              "
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                    >
                      <tbody style="width: 100%">
                        <tr style="width: 100%">
                          <img
                            src="https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            style="
                              object-fit: cover;
                              height: 200px;
                              display: block;
                              outline: none;
                              border: none;
                              text-decoration: none;
                              max-width: 100%;
                            "
                            width="620"
                          />
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="padding: 20px; padding-bottom: 0"
                    >
                      <tbody style="width: 100%">
                        <tr style="width: 100%">
                          <td data-id="__react-email-column">
                            <h1
                              style="
                                font-size: 32px;
                                font-weight: bold;
                                text-align: center;
                              "
                            >
                              ¡Hola, ${name}!
                            </h1>
                            <h2
                              style="
                                font-size: 26px;
                                font-weight: bold;
                                text-align: center;
                              "
                            >
                              Te han vinculado como su tutor en
                              <span style="color: #6b28bb"
                                ><a
                                  href="www.fincity.online"
                                  style="
                                    text-decoration: none;
                                    display: inline-block;

                                    color: #6b28bb;

                                    font-weight: bold;

                                    cursor: pointer;
                                  "
                                  >FinCity</a
                                ></span
                              >
                            </h2>
                            <p
                              style="
                                font-size: 16px;
                                line-height: 24px;
                                margin: 16px 0;
                              "
                            >
                              Somos una plataforma de aprendizaje financiero y
                              formación de hábitos y responsabilidades.
                            </p>
                            <p
                              style="
                                font-size: 16px;
                                line-height: 24px;
                                margin: 16px 0;
                              "
                            >
                              ¿Quieres saber más?
                              <a
                                href="www.fincity.online"
                                style="
                                  text-decoration: none;
                                  display: inline-block;

                                  color: #6b28bb;

                                  font-weight: bold;

                                  cursor: pointer;
                                "
                                >¡Visítanos!</a
                              >
                            </p>
                            <p
                              style="
                                font-size: 16px;
                                line-height: 24px;
                                margin: 16px 0;
                              "
                            >
                              Para continuar con la configuración de tu cuenta,
                              por favor visita el siguiente enlace:
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="padding: 20px; padding-top: 0; text-align: center;"
                    >
                      <tbody style="width: 100%">
                        <tr style="width: 100%">
                          <td
                            colspan="2"
                            data-id="__react-email-column"
                          >
                            <a
                              style="
                                line-height: 100%;
                                text-decoration: none;
                                display: inline-block;
                                max-width: 100%;
                                background-color: #6b28bb;
                                border-radius: 3px;
                                color: #fff;
                                font-weight: bold;
                                border: 1px solid rgb(0, 0, 0, 0.1);
                                cursor: pointer;
                                padding: 12px 30px 12px 30px;
                              "
                              href="${magicLink}"
                              target="_blank"
                            >
                              <span
                                style="
                                  max-width: 100%;
                                  display: inline-block;
                                  line-height: 120%;
                                "
                                >Crear PIN</span
                              >
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="padding: 45px 0 0 0"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <img
                              src="https://react-email-demo-9fn3mchcm-resend.vercel.app/static/yelp-footer.png"
                              style="
                                display: block;
                                outline: none;
                                border: none;
                                text-decoration: none;
                                max-width: 100%;
                              "
                              width="620"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p
                      style="
                        font-size: 12px;
                        line-height: 24px;
                        margin: 16px 0;
                        text-align: center;
                        color: rgb(0, 0, 0, 0.7);
                      "
                    >
                      © 2024 | FinCity | www.fincity.com
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
    `
}
