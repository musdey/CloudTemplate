import request from 'supertest'
import app from '../../src/app'
import Shop from '../../src/models/Shop'
import User from '../../src/models/User'

describe('POST /checkin', function () {
  beforeAll((done) => {
    const shopData = {
      email: 'swave94@gmail.com',
      shopId: 'SHOPID',
      shopName: 'Test Shop',
      owner: 'testOwner',
      phoneNumber: '0123456789',
      address: {
        city: 'Vienna',
        postalCode: 1110,
        street: 'Teststreet',
        streetNumber: '23',
        streetExtra: 'Top 1',
      },
      availableSeats: 50,
    }

    const shop = new Shop(shopData)
    Shop.register(shop, 'test', function (err: Error, account) {
      if (err) {
        expect(err.message).toBe('A user with the given username is already registered')
      }
      done()
    })
  })

  it('catches empty body', function (done) {
    request(app)
      .post('/checkin')
      .send({})
      .set('Accept', 'application/json')
      .expect(400)
      .then((res) => {
        expect(res.text).toBe('Empty body')
        done()
      })
  })

  it('catches wrong body', function (done) {
    const body = {
      email: 'test@user.at',
    }
    request(app)
      .post('/checkin')
      .send(body)
      .set('Accept', 'application/json')
      .expect(400)
      .then((res) => {
        expect(res.text).toBe('InputValidationError')
        done()
      })
  })

  it('creates a new user to checkin', function (done) {
    const body = {
      email: 'test@user2.at',
      phoneNumber: '066012123',
      name: 'Test User',
      shopId: 'SHOPID',
    }
    request(app)
      .post('/checkin')
      .send(body)
      .set('Accept', 'application/json')
      .expect(200)
      .then(async (res) => {
        expect(res.text).toBe('Successfully checked in')
        const user = await User.findOne({ email: 'test@user2.at' })
        expect(user).toBeDefined()
        done()
      })
  })

  it('uses existing user to checkin', function (done) {
    const body = {
      email: 'test@user.at',
      phoneNumber: '066012345678',
      name: 'Test User',
      shopId: 'SHOPID',
    }
    request(app)
      .post('/checkin')
      .send(body)
      .set('Accept', 'application/json')
      .expect(200)
      .then(async (res) => {
        expect(res.text).toBe('Successfully checked in')

        done()
      })
  })

  afterAll(async () => {
    await User.deleteOne({ email: 'test@user2.at' })
    // Shop.collection.drop()
    // Checkin.collection.drop()
  })
})
