import request from 'supertest'
import app from '../../src/app'
import ForgotPassword from '../../src/models/ForgotPassword'
import Shop from '../../src/models/Shop'

jest.mock('nodemailer')

describe('GET /password-checktoken/:token', function () {
  const testShop = {
    email: 'checktoken@mail.com',
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

  it('catches missing e-mail', function (done) {
    request(app)
      .get('/password-checktoken/')
      .set('Accept', 'application/json')
      .expect(404)
      .then(() => {
        done()
      })
  })

  it('catches wrong e-mail', function (done) {
    request(app)
      .get('/password-checktoken/token')
      .set('Accept', 'application/json')
      .expect(400)
      .then(async (res) => {
        expect(res.text).toBe('Password reset token is invalid or has expired.')
        done()
      })
  })

  it('validates correct token', async function (done) {
    await request(app)
      .get('/password-reset/' + testShop.email)
      .set('Accept', 'application/json')
      .expect(200)

    const forgotEntry = await ForgotPassword.findOne({ email: testShop.email })
    if (forgotEntry) {
      request(app)
        .get('/password-checktoken/' + forgotEntry.toObject().resetPasswordToken)
        .set('Accept', 'application/json')
        .expect(200)
        .then(async (res) => {
          expect(res.text).toBe('Token valid')
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
