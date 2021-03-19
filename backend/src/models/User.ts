import { Document, Schema, Model, model } from 'mongoose'
import Role from './Role'

interface IUser extends Document {
  //_id let it autogenerate by mongodb
  username?: string
  role: string
  password: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: {
    city: string
    postalCode: number
    street: string
    streetNumber: string
    streetExtra: string
  }
}

const UserSchema = new Schema(
  {
    //_id let it autogenerate by mongodb
    role:
    {
      type: Schema.Types.ObjectId,
      ref: "Role"
    }
    ,
    username: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    email_is_verified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    address: {
      city: {
        type: String,
      },
      postalCode: {
        type: Number,
      },
      street: {
        type: String,
      },
      streetNumber: {
        type: String,
      },
      streetExtra: {
        type: String,
      },
    },
  },
  { strict: false, versionKey: false }
)

const User: Model<IUser> = model('User', UserSchema)
export default User

