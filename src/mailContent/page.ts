export const formatMoney = (v: number) => {
  let value = "R$ "

  const integers = Math.floor(v / 100)
  const cents = v % 100

  value += integers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  value += `,${String(cents).padStart(2, "0")}`

  return value
}

export const generateContent = (data: {
  pageTitle: string
  base64Logo: string | null
  base64File: string
  logoWebstoreUrl: string

  eventName: string
  eventDate: string
  eventTime: string
  eventLocal: string

  buyerName: string
  organizerName: string
  organizerDocument: string

  purchaseCode: string
  purchaseTime: string
  purchaseValue: string
  purchaseItems: { text: string; total: number }[]
  purchaseStatus: string
}) => {
  const htmlElement = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Condhelp Mail</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
      rel="stylesheet"
    />
  </head>
  <body style="margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', Arial, sans-serif; background-color: #dedede; padding: 24px;">
    <table role="presentation" width="100%" style="border-spacing: 0; border-collapse: collapse; width: 80vw; max-width: 600px; margin: 0 auto; background-color: white; border-radius: 16px;">
    ${
      data.logoWebstoreUrl &&
      `<tr>
          <td align="center" style="padding: 16px;">
            <img
              id="initialLogo"
              src="${data.logoWebstoreUrl}"
              alt="${data.eventName}"
              style="max-width: 256px; height: auto;"
            />
          </td>
        </tr>`
    }
      <tr>
        <td style="padding: 16px;">
          <h1 id="emailTitle" style="font-size: 28px; font-weight: 600; color: #434546; text-align: center;">${
            data.pageTitle
          }</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 16px;">
          <span style="font-size: 16px; padding: 4px 0px; color: #61676a;">Olá, ${
            data.buyerName
          }!</span>
          <br/>
          <br/>
          <span style="font-size: 16px; padding: 4px 0px; color: #61676a;">Obrigado por comprar conosco.</span>
          <br/>
          <br/>
          <span style="font-size: 16px; padding: 4px 0px; font-weight: 600; color: #61676a;">Seus ingressos estão anexados neste neste e-mail.</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 16px;">
          <hr />
          <br/>
          <span style="font-size: 16px; font-weight: 600; color: #61676a;">Informações sobre o pedido:</span>
          <br/>
          <table id="eventResume" role="presentation" width="100%" style="border-spacing: 0; border-collapse: collapse; width: 100%; margin-top: 20px;">
            <tr class="infoRow" style="border-spacing: 0; border-collapse: collapse;">
              <td class="label" style="padding: 4px 0; color: #61676a; min-width: 120px;">Evento:</td>
              <td class="value" style="padding: 4px 0; font-weight: 600; color: #61676a;">${
                data.eventName
              }</td>
            </tr>
            <tr class="infoRow" style="border-spacing: 0; border-collapse: collapse;">
              <td class="label" style="padding: 4px 0; color: #61676a; min-width: 120px;">Data:</td>
              <td class="value" style="padding: 4px 0; font-weight: 600; color: #61676a;">${
                data.eventDate
              }</td>
            </tr>
            <tr class="infoRow" style="border-spacing: 0; border-collapse: collapse;">
              <td class="label" style="padding: 4px 0; color: #61676a; min-width: 120px;">Horário:</td>
              <td class="value" style="padding: 4px 0; font-weight: 600; color: #61676a;">${
                data.eventTime
              }</td>
            </tr>
            <tr class="infoRow" style="border-spacing: 0; border-collapse: collapse;">
              <td class="label" style="padding: 4px 0; color: #61676a; min-width: 120px;">Local:</td>
              <td class="value" style="padding: 4px 0; font-weight: 600; color: #61676a;">${
                data.eventLocal
              }</td>
            </tr>
          </table>
          <br/>
          <table id="eventResume" role="presentation" width="100%" style="border-spacing: 0; border-collapse: collapse; width: 100%; margin-top: 20px;">
            <tr class="infoRow" style="border-spacing: 0; border-collapse: collapse;">
              <td class="label" style="padding: 4px 0; color: #61676a; min-width: 120px;">Transação:</td>
              <td class="value" style="padding: 4px 0; font-weight: 600; color: #61676a;">${
                data.purchaseCode
              }</td>
            </tr>
            <tr class="infoRow" style="border-spacing: 0; border-collapse: collapse;">
              <td class="label" style="padding: 4px 0; color: #61676a; min-width: 120px;">Data da compra:</td>
              <td class="value" style="padding: 4px 0; font-weight: 600; color: #61676a;">${
                data.purchaseTime
              }</td>
            </tr>
            ${data.purchaseItems
              .map(
                (i, iK) =>
                  `<tr class="infoRow" style="border-spacing: 0; border-collapse: collapse;">
                <td class="label" style="padding: 4px 0; color: #61676a; min-width: 120px;">${
                  iK === 0 ? "Iten(s) adquirido(s):" : "                     "
                }</td>
                <td class="value" style="padding: 4px 0; font-weight: 600; color: #61676a;">${
                  i.text
                }</td>
              </tr>`
              )
              .join("")}
            <tr class="infoRow" style="border-spacing: 0; border-collapse: collapse;">
              <td class="label" style="padding: 4px 0; color: #61676a; min-width: 120px;">Valor:</td>
              <td class="value" style="padding: 4px 0; font-weight: 600; color: #61676a;">${formatMoney(
                +data.purchaseValue
              )}</td>
            </tr>
            <tr class="infoRow" style="border-spacing: 0; border-collapse: collapse;">
              <td class="label" style="padding: 4px 0; color: #61676a; min-width: 120px;">Status:</td>
              <td class="value" style="padding: 4px 0; font-weight: 600; color: #61676a;">${
                data.purchaseStatus
              }</td>
            </tr>
          </table>
          <br/>
          <br/>
          <br/>
          <span style="font-size: 16px; color: #61676a;">Ingressos vendidos sob responsabilidade de <b>${
            data.organizerName
          }</b> - CNPJ <b>${data.organizerDocument}.</b></span>
        </td>
      </tr>
    </table>
  </body>
</html>`

  return htmlElement
}
