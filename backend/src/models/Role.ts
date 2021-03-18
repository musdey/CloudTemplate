import { Document, Schema, Model, model } from 'mongoose'

interface IRole extends Document {
  //_id let it autogenerate by mongodb
  name: string
}

const RoleSchema = new Schema(
  {
    //_id let it autogenerate by mongodb
    name: {
      type: String,
      enum: ['USER', 'MODERATOR', 'ADMIN'],
      default: 'USER'
    },
  },
  { strict: false, versionKey: false }
)

const Role: Model<IRole> = model('Role', RoleSchema)
export default Role