'use strict'
import nodemailer from 'nodemailer'
import { Handler, Request, Response } from 'express'

// async..await is not allowed in global scope, must use a wrapper

const transporter = nodemailer.createTransport({
  host: 'SMTP.office365.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'gaesteliste@hotmail.com', // generated ethereal user
    pass: 'meineTestMail1', // generated ethereal password
  },
})

const sendMail = async (req: Request, toMail: string, token: string): Promise<string> => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Gaesteliste Admin" <Gaesteliste@hotmail.com>', // sender address
    to: toMail, // list of receivers
    subject: 'Passwort zuruecksetzen', // Subject line
    text:
      'Du hast diese Nachricht erhalten, da du (oder jemand anderes) das Passwort für deinen Account zurücksetzen willst.\n\n' +
      'Bitte klicke auf den folgenden Link, oder kopiere den Link in deinen Browser um den Vorgang fortzusetzen:\n\n' +
      'http://' +
      req.headers.host +
      '/reset/' +
      token +
      '\n\n' +
      'Falls du das Zurücksetzen nicht selber initiiert hast, beachte diese E-Mail als gegestandslos. Dein Passwort bleibt unverändert! \n', // plain text body
  })
  console.log('SendMail result was ', info)
  return info
}

export default sendMail
/* Englishhhh
    text:
      'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      'http://' +
      req.headers.host +
      '/reset/' +
      token +
      '\n\n' +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n', // plain text body
*/
