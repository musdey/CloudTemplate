import passport from 'passport'
import request from 'supertest'
import app from '../../src/app'
import ForgotPassword from '../../src/models/ForgotPassword'
import Shop from '../../src/models/Shop'

jest.mock('nodemailer')

describe('POST /password-update', function () {
  const testShop = {
    email: 'passwordUpdateshop@mail.com',
    shopName: 'Token shop',
    owner: 'testOwner',
    phoneNumber: '2121212121',
    address: {
      city: 'Vienna',
      postalCode: 1110,
      street: 'Teststreet',
      streetNumber: '23',
      streetExtra: 'Top 1',
    },
    availableSeats: 50,
  }

  beforeAll(async () => {
    // If testShop is not provided in database, it will be created now
    const result = await Shop.findOne({ email: testShop.email })
    if (!result) {
      await Shop.register(new Shop(testShop), 'test')
    }
  })

  it('catches missing body', function (done) {
    request(app)
      .post('/password-update')
      .send({})
      .set('Accept', 'application/json')
      .expect(400)
      .then(() => {
        done()
      })
  })

  it('catches incomplete input', function (done) {
    request(app)
      .post('/password-update')
      .set('Accept', 'application/json')
      .send({ data: 'something' })
      .expect(400)
      .then(async (res) => {
        expect(res.text).toBe('InputValidationError')
        done()
      })
  })

  it('catches not valid input', function (done) {
    request(app)
      .post('/password-update')
      .set('Accept', 'application/json')
      .send({ token: 'something', password: 'test2' })
      .expect(400)
      .then(async (res) => {
        expect(res.text).toBe('Password reset token is invalid or has expired.')
        done()
      })
  })

  it('sets new password', async function (done) {
    await request(app)
      .get('/password-reset/' + testShop.email)
      .set('Accept', 'application/json')
      .expect(200)

    const forgotEntry = await ForgotPassword.findOne({ email: testShop.email })
    if (forgotEntry) {
      request(app)
        .post('/password-update')
        .set('Accept', 'application/json')
        .send({ token: forgotEntry.toObject().resetPasswordToken, password: 'test2' })
        .expect(200)
        .then(async (res) => {
          expect(res.text).toBe('Password updated correctly')
          done()
        })
    }
  })

  // TODO: test expiring token

  afterAll(async () => {
    await Shop.deleteOne({ email: testShop.email })
    await ForgotPassword.deleteMany({ email: testShop.email })
  })
})
