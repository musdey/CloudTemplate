import { Handler, Request, Response } from 'express'
import sendMail from '../../service/mailService'
import crypto from 'crypto'
import ForgotPassword from '../../models/ResetUserPassword'
import User from '../../models/User'

const resetPassword: Handler = async (req: Request, res: Response) => {
  if (!req.params.email) {
    res.status(400).end('Please provide a email')
  }

  // TODO: do input validation if it is E-mail or not

  const email = req.params.email
  const shop = await User.findOne({ email: email })

  if (!shop) {
    res.status(400).end('Shop not found!')
    return
  }
  const token = await crypto.randomBytes(20).toString('hex')
  const newForgottenPw = new ForgotPassword({
    email: email,
    time: Date.now(),
    resetPasswordExpires: Date.now() + 3600000,
    resetPasswordToken: token,
  })

  const result = await newForgottenPw.save()

  if (process.env.NODE_ENV === 'production') {
    await sendMail(req, email, token)
  }

  res.status(200).end('Successfully requested new password')
  return
}

export default resetPassword
