import request from 'supertest'
import app from '../../src/app'
import ForgotPassword from '../../src/models/ForgotPassword'
import Shop from '../../src/models/Shop'

jest.mock('nodemailer')

describe('GET /reset-password', function () {
  const testShop = {
    email: 'token@mail.com',
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
      .get('/password-reset/')
      .set('Accept', 'application/json')
      .expect(404)
      .then(() => {
        done()
      })
  })

  it('catches wrong e-mail', function (done) {
    request(app)
      .get('/password-reset/bla@bla.at')
      .set('Accept', 'application/json')
      .expect(400)
      .then(async (res) => {
        expect(res.text).toBe('Shop not found!')
        done()
      })
  })

  it('successfully creates token ', function (done) {
    request(app)
      .get('/password-reset/token@mail.com')
      .set('Accept', 'application/json')
      .expect(200)
      .then(async (res) => {
        expect(res.text).toBe('Successfully requested new password')
        const token = await ForgotPassword.findOne({ email: 'token@mail.com' })
        expect(token).toBeDefined()
        done()
      })
  })

  afterAll(async () => {
    await Shop.deleteOne({ email: testShop.email })
    await ForgotPassword.deleteMany({ email: testShop.email })
  })
})
