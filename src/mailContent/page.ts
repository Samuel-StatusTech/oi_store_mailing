import { logoBase64 } from "./image"

export const generateContent = (data: {
  edition: string
  organizer: string
  date: string
  local: string
  code: string
  inscriptionDate: string
  subscriberName: string
}) => {
  const htmlElement = `<!DOCTYPE html />
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Condhelp Mail</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
      </head>
      <style>
    
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Inter";
        }
    
        #background {
          background-color: #dedede;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
          padding: 48px;
        }
    
        #initialLogo {
          max-width: 256px;
          margin: auto;
        }
    
        #container {
          display: flex;
          flex-direction: column;
          gap: 36px;
          background-color: white;
          padding: 48px 64px;
          border-radius: 16px;
        }
    
        #emailTitle {
          font-size: 28px;
          font-weight: 600;
          color: #434546;
        }
    
        #emailSubTitle {
          font-size: 22px;
          font-weight: 500;
          width: 100%;
          text-align: center;
          color: #61676a;
          margin-top: 12px;
        }
    
        #eventResume {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
    
        .infoRow {
          display: flex;
          justify-content: space-between;
          gap: 40px;
          width: fit-content;
        }
    
        .infoRow span:nth-child(1) {
          min-width: 120px;
          color: #61676a;
        }
    
        .infoRow span:nth-child(2) {
          font-weight: 600;
          color: #61676a;
        }
    
        @media (max-width: 520px) {
          #container {
            padding: 36px 42px;
          }
    
          #emailTitle {
            font-size: 24px;
            font-weight: 600;
            color: #434546;
          }
    
          #emailSubTitle {
            font-size: 18px;
            text-align: left;
          }
    
          #eventResume {
            gap: 22px;
          }
          .infoRow {
            flex-direction: column;
            gap: 4px;
            font-size: 14px;
          }
        }
      </style>
      <body>
        <div id="background">
          <img
            id="initialLogo"
            src="${logoBase64}"
            alt="Condhelp"
          />
          <div id="container">
            <div>
              <h1 id="emailTitle">CONDHELP - Confirmação de inscrição!</h1>
              <h3 id="emailSubTitle">${data.edition}ª edição</h3>
            </div>
    
            <hr />
    
            <div id="eventResume">
              <div class="infoRow">
                <span>Convidado</span>
                <span>${data.subscriberName}</span>
              </div>
              <div class="infoRow">
                <span>Código</span>
                <span>${data.code}</span>
              </div>
              <div class="infoRow">
                <span>Data do pedido</span>
                <span>${data.inscriptionDate}</span>
              </div>
              <br />
              <div class="infoRow">
                <span>Organizador</span>
                <span>${data.organizer}</span>
              </div>
              <div class="infoRow">
                <span>Data</span>
                <span>${data.date}</span>
              </div>
              <div class="infoRow">
                <span>Local</span>
                <span>${data.local}</span>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>`

  return htmlElement
}
