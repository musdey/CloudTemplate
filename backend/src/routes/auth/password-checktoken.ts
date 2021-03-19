import { Handler } from 'express'
import ForgotPassword from '../../models/ResetUserPassword'

const checkToken: Handler = async (req, res) => {
  if (!req.params.token) {
    res.status(400).end('Request invalid')
  }
  const forgotPWDocument = await ForgotPassword.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: new Date() },
  })
  if (!forgotPWDocument) {
    res.status(400).end('Password reset token is invalid or has expired.')
    return
  }
  // if ((await forgotPWDocument.toObject().resetPasswordExpires) < Date.now()) {
  //   res.status(400).end('Password reset token is invalid or has expired.')
  //   return
  // }

  res.status(200).end('Token valid')
  return
}

export default checkToken
