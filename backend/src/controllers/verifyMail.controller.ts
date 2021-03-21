
import { Handler, Request, Response } from 'express';
import User from '../models/User';
import errors from '../lib/errors';
import VerifyMail from '../models/VerifyEmail';
import crypto from 'crypto'

const secret = process.env.JWT_SECRET || "test"
const serverURL = process.env.SERVER_URL || "http://localhost"
const validTime = 24 * 60 * 60 * 1000 // 24 hours

const requestEmailVerification: Handler = async (req: Request, res: Response) => {

  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(404).send({ message: "User Not found.", error: errors.NotFound });
    }

    const verifyEmailRequest = await VerifyMail.findOne({ email: req.body.email })
    const token = crypto.randomBytes(50).toString('hex');
    const timestamp = new Date()
    if (!verifyEmailRequest) {
      const newVerifyEmailRequest = new VerifyMail({ email: req.body.email, token, timestamp })
      await newVerifyEmailRequest.save()
      const verifyEmailURL = serverURL + "/api/verifyEmail?token=" + token
      console.log(`URL to verify the email of ${user.email} is ${verifyEmailURL}`)

      return res.status(200).send({ message: "Email was sent successfully." })
    }
    verifyEmailRequest.token = token
    verifyEmailRequest.timestamp = timestamp
    await verifyEmailRequest.save()
    return res.status(200).send({ message: "Email was sent successfully." })
  } catch (err) {
    return res.status(500).send({ message: err });
  }
}

const verifyMail = async (req: Request, res: Response) => {

  const requestedToken = req.params.token
  if (!requestedToken) {
    return res.status(401).send({ message: "Token missing.", error: errors.InputMissing })
  }

  try {
    const verifyEmailRequest = await VerifyMail.findOne({ token: requestedToken })

    if (!verifyEmailRequest) {
      return res.status(404).send({ message: "Request not found", error: errors.NotFound });
    }

    const user = await User.findOne({ email: verifyEmailRequest.email })
    if (!user) {
      return res.status(404).send({ message: "User Not found.", error: errors.NotFound });
    }
    //substract 24hours
    if (verifyEmailRequest.timestamp.getTime() <= (Date.now() - validTime)) {
      user.emailIsVerified = true
      await user.save()
      return res.status(200).send({ message: "Email address successfully verified." })
    } else {
      return res.status(200).send({ message: "This request timed out. Please request a new E-mail verifaction." })
    }

  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

export { requestEmailVerification, verifyMail }