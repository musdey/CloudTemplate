import Validator, { ValidationError } from 'validate'
import InputValidationError from './errors'

const UserValidator: Validator = new Validator({
  //_id let it autogenerate by mongodb
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
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    city: {
      type: String,
    },
    zip: {
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
})
const UserCheckinValidator = new Validator({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  shopId: {
    type: String,
    required: true,
  },
})

const ShopStatisticValidator = new Validator({
  gte: {
    type: String,
    required: true,
  },
  lt: {
    type: String,
    required: true,
  },
  shopId: {
    type: String,
    required: true,
  },
})

const ForgotValidator = new Validator({
  token: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const LoginValidator = new Validator({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const getValidationErrorData = function (validationResult: ValidationError[]): string {
  const resultArr: string[] = []
  validationResult.forEach((err) => {
    resultArr.push(err.toString())
  })
  const result = { error: resultArr }
  if (process.env.NODE_ENV === 'development') {
    return result.toString()
  }
  return 'InputValidationError'
}

export {
  LoginValidator,
  UserValidator,
  UserCheckinValidator,
  ShopStatisticValidator,
  ForgotValidator,
  getValidationErrorData,
}
