import { Request, Response } from "express"
import nodemailer from "nodemailer"
import { MailOptions } from "nodemailer/lib/json-transport"

import path from "path"
import fs from "fs"

import Handlebars from "handlebars"
import { logoBase64 } from "../mailContent/image"

export const sendEmail = async (req: Request, res: Response) => {
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

  const mailInfo = {
    date: req.body.date as string,
    local: req.body.local as string,
    localLink: req.body.localLink as string,
    code: req.body.code as string,
    inscriptionDate: req.body.inscriptionDate as string,
    subscriberName: req.body.subscriberName as string,
    subscriberEmail: req.body.subscriberEmail as string,
  }

  if (
    Object.entries(mailInfo).some((field) => typeof field[1] === "undefined")
  ) {
    return res.status(400).json({
      error: {
        message: "Preencha todos os campos",
      },
    })
  }

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

  const filePath = path.join(__dirname, "../mailContent/page.html")
  const source = fs.readFileSync(filePath, "utf-8").toString()
  const template = Handlebars.compile(source)
  const replacements = {
    logoBase64: logoBase64,
    date: mailInfo.date.trim(),
    local: mailInfo.local.trim(),
    localLink: mailInfo.localLink.trim(),
    code: mailInfo.code.trim(),
    inscriptionDate: mailInfo.inscriptionDate.trim(),
    subscriberName: mailInfo.subscriberName.trim(),
  }

  const html = template(replacements)

  const mail: MailOptions = {
    from: "Grupo GT",
    to: mailInfo.subscriberEmail.trim(),
    subject: `CONDHELP - Confirmação de inscrição!`,
    html: html,
  }

  try {
    await transporter.sendMail(mail)

    res.status(200).json({ sended: true })
  } catch (error) {
    res.status(400).json({ sended: false, error })
  }
}

export const ping = async (req: Request, res: Response) => {
  return res.json({ pong: true })
}
