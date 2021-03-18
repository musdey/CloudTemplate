import { Handler } from 'express'
import User from '../../models/User'
import { Request, Response } from 'express'
import { getValidationErrorData, UserValidator } from '../../lib/validator'
import generateUserId from '../../lib/generateShortId'
import errors from '../../lib/errors'
import bcrypt from 'bcryptjs'

const signup: Handler = async (req: Request, res: Response, next) => {
  const body = await req.body
  if (!body || Object.keys(body).length === 0) {
    res.status(400).end(errors.InputMissing)
    return
  }

  const validationResult = UserValidator.validate(body)
  if (validationResult.length !== 0) {
    res.status(400).end(getValidationErrorData(validationResult))
    return
  }

  const dataToCreateUser = { ...body }
  delete dataToCreateUser['password']
  dataToCreateUser['UserId'] = await generateUserId()

  const phoneResult = await User.findOne({ phoneNumber: dataToCreateUser.phoneNumber })
  if (phoneResult) {
    res.status(400).end('There is already a User with this phoneNumber')
    return
  }

  const mailResult = await User.findOne({ email: dataToCreateUser.email })
  if (mailResult) {
    res.status(400).end('There is already a User with the E-mail')
    return
  }

  // User.register(new User(dataToCreateUser), bcrypt.hashSync(body.password, 8), function (err: Error, account) {
  //   if (err) {
  //     res.status(400).json(err.message)
  //     return
  //   }

  //   res.status(200).end('Successfully created User')
  //   return

  //   //TODO: direkt einloggen

  //   // passport.authenticate('local')(req, res, function () {
  //   //   if (req && req.session) {
  //   //     req.session.save(function (err) {
  //   //       if (err) {
  //   //         return next(err)
  //   //       }

  //   //     })
  //   //   }
  //   // })
  // })
}

export { signup }
