import User from '../../models/User'
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { Request, Response } from 'express';
import errors from '../../lib/errors';

const secret = process.env.JWT_SECRET || 'test'

const verifyMail = (req: Request, res: Response) => {

  // Todo: do input validation !!

  User.findOne({
    email: req.body.email
  }).exec(async (err, user) => {
    if (err) {
      res.status(500).send({ err: err, error: errors.InternalServer });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found.", error: errors.NotFound });
    }

    const userObj = await user.toObject()

    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      userObj.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        error: errors.WrongPassword
      });
    }

    const token = await jwt.sign({ id: user.id }, secret, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
      id: user._id,
      username: userObj.username,
      email: userObj.email,
      roles: userObj.role,
      accessToken: token
    });
  });
};

export default verifyMail