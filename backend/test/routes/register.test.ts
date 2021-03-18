import request from 'supertest'
import app from '../../src/app'
import Shop from '../../src/models/Shop'

describe('POST /register', function () {
  const shopData = {
    email: 'testshop@test.at',
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
    password: 'test',
  }
  beforeAll(async () => {
    // If shopData is not provided in database, it will be created now
    const result = await Shop.findOne({ email: shopData.email })
    if (!result) {
      await Shop.register(new Shop(shopData), shopData.password)
    }
  })

  it('catches wrong input at registering', function (done) {
    const shopData2 = {
      email: 'other@other.at',
    }
    request(app)
      .post('/register')
      .send(shopData2)
      .set('Accept', 'application/json')
      .expect(400)
      .then(async (res) => {
        expect(res.text).toBe('InputValidationError')
        const user2 = await Shop.findOne({ email: 'other@other.at' })
        expect(user2).toBeNull()
        done()
      })
  })

  it('registers a new shop', function (done) {
    const shopData = {
      email: 'test@shop.at',
      shopName: 'Test Shop',
      owner: 'testOwner',
      phoneNumber: '111111111',
      address: {
        city: 'Vienna',
        postalCode: 1110,
        street: 'Teststreet',
        streetNumber: '23',
        streetExtra: 'Top 1',
      },
      availableSeats: 50,
      password: 'test',
    }
    request(app)
      .post('/register')
      .send(shopData)
      .set('Accept', 'application/json')
      .expect(200)
      .then(async (res) => {
        expect(res.text).toBe('Successfully created shop')
        const user = await Shop.findOne({ email: 'testshop@test.at' })
        expect(user).toBeDefined()
        done()
      })
  })

  it('catches registering a shop with existing email', function (done) {
    request(app)
      .post('/register')
      .send(shopData)
      .set('Accept', 'application/json')
      .expect(400)
      .then(async (res) => {
        expect(res.text).toBe('There is already a shop with this phoneNumber')
        done()
      })
  })

  afterAll(async () => {
    await Shop.deleteOne({ email: 'test@shop.at' })
  })
})
