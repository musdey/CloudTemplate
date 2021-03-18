
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Handler, Request, Response } from 'express';
import User from '../models/User';
import Role from '../models/Role';

const secret = process.env.JWT_SECRET || "test"

const signup: Handler = async (req: Request, res: Response) => {
  try {

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });

    const createdUser = await user.save()
    console.log(createdUser)
    const userRole = await Role.findOne({ name: "USER" })
    createdUser.role = userRole?._id
    await createdUser.save()
    return res.status(200).send({ message: "User was registered successfully!" });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

const signin: Handler = async (req: Request, res: Response) => {

  try {
    const user = await User.findOne({ username: req.body.username })

    if (user) {
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (passwordIsValid) {
        const token = jwt.sign({ id: user.id }, secret, {
          expiresIn: 86400 // 24 hours
        });
        return res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          accessToken: token
        });
      } else {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

    } else {
      return res.status(404).send({ message: "User Not found." });
    }
  } catch (err) {
    return res.status(500).send({ message: err });
  }
}

export { signin, signup }