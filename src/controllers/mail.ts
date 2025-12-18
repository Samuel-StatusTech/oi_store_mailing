import { Request, Response } from "express"
import nodemailer from "nodemailer"
import { MailOptions } from "nodemailer/lib/json-transport"

import { generateContent } from "../mailContent/page"

interface MulterRequest extends Request {
  files: {
    [fieldname: string]: Express.Multer.File[]
  }
}

export const sendEmail = async (req: MulterRequest, res: Response) => {
  try {
    const mailing = {
      /* service to send emails */
      host: process.env.SMTP_HOST,
      /* email used by company to send emails (email for send these emails) */
      user: process.env.SMTP_EMAIL_USER,
      /* pass provided by app pass google */
      pass: process.env.SMTP_EMAIL_PASS,
      /* company contact email */
      emailTo: process.env.SMTP_EMAIL_TO,
    }

    const file = req.files?.["file"]?.[0] ?? null
    const logo = req.files?.["logo"]?.[0] ?? null

    if (!file || !logo) {
      return res
        .status(400)
        .json({ error: "Arquivos file e logo são necessários" })
    }

    const base64Logo = `data:image/png;base64,${logo.buffer.toString("base64")}`
    const base64File = `data:application/pdf;base64,${file.buffer.toString(
      "base64"
    )}`

    const originalFileName = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    )

    const mailInfo = {
      base64Logo: base64Logo,
      base64File: base64File,
      logoWebstoreUrl: req.body.logoWebstoreUrl,

      eventName: req.body.eventName as string,
      eventDate: req.body.eventDate as string,
      eventTime: req.body.eventTime as string,
      eventLocal: req.body.eventLocal as string,

      buyerName: req.body.buyerName as string,

      organizerName: req.body.organizerName as string,
      organizerDocument: req.body.organizerDocument as string,

      purchaseCode: (req.body.purchaseCode as string) ?? "",
      purchaseTime: req.body.purchaseTime as string,
      purchaseValue: req.body.purchaseValue as string,
      purchaseItems: JSON.parse(req.body.purchaseItems),
      purchaseStatus: req.body.purchaseStatus as string,

      targetEmail: req.body.targetEmail as string,
    }

    if (
      Object.entries(mailInfo).some((field) => typeof field[1] === "undefined")
    ) {
      return res.status(400).json({
        error: {
          message:
            "Não foi possível enviar o email no momento. Tente novamente mais tarde.",
        },
      })
    }

    const title = `Ingressos - ${mailInfo.eventName}`

    let transporter = nodemailer.createTransport({
      host: mailing.host,
      port: 587,
      secure: false,
      auth: {
        user: mailing.user,
        pass: mailing.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    // HTML
    const replacements = { ...mailInfo, pageTitle: title }
    const html = generateContent(replacements)

    const mail: MailOptions = {
      from: "ListaPix",
      to: mailInfo.targetEmail.trim(),
      subject: title,
      html: html,
      encoding: "utf-8",
      attachments: [
        {
          filename: originalFileName,
          content: file.buffer,
          contentType: file.mimetype,
          encoding: "base64",
        },
      ],
    }

    await transporter.sendMail(mail)

    res.status(200).json({ sended: true })
  } catch (error) {
    res.status(400).json({ sended: false, error })
  }
}

export const ping = async (req: Request, res: Response) => {
  return res.json({ pong: true })
}
