import { Document, Schema, Model, model } from 'mongoose'

interface IVerifyEmail extends Document {
  //_id let it autogenerate by mongodb
  email: string,
  token: string,
  timestamp: Date
  verifyEmailExpires: Date
}

const VerifyMailSchema = new Schema(
  {
    //_id let it autogenerate by mongodb
    email: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true,
      unique: true
      // TODO: auto remove token within 24 hours
    },
    timeStamp: {
      type: Date,
      required: true
    },
    verifyEmailExpires: {
      type: Date,
      required: true
    }
  },
  { strict: false, versionKey: false }
)

const VerifyMail: Model<IVerifyEmail> = model('VerifyMail', VerifyMailSchema)
export default VerifyMail