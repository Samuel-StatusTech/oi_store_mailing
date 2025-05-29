import { Router, Request, Response } from "express"
import * as MailController from "../controllers/mail"

import multer from "multer"
import path from "path"
import fs from "fs"
import os from "os"

const routes = Router()

// Diretório temporário
export const tempDir = path.join(os.tmpdir(), "uploads")
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir)
}

const storage = multer.memoryStorage()
const upload = multer({ storage })

const cpUpload = upload.fields([
  { name: "file", maxCount: 1 },
  { name: "logo", maxCount: 1 },
])

routes.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    hello: "hi",
  })
})

// @ts-ignore
routes.post("/api/sendemail", cpUpload, MailController.sendEmail)

export default routes
