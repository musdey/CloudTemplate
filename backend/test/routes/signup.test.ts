import request from 'supertest'
import app from '../../src/app'
import User from '../../src/models/User'
import mongoose from 'mongoose'

describe('POST /api/auth/', function () {
  const userData = {
    email: 'test@user.at',
    phoneNumber: '0123456789',
    address: {
      city: 'Vienna',
      postalCode: 1110,
      street: 'Teststreet',
      streetNumber: '23',
      streetExtra: 'Top 1',
    },
    password: 'test',
    firstName: 'Test',
    lastName: 'User'
  }
  beforeAll(async (done) => {
    // If UserData is not provided in database, it will be created now
    const result = await User.findOne({ email: userData.email })
    if (!result) {
      await new User({ email: userData.email }).save()
    }
    done()
  })

  it('catches wrong input at signup', async done => {
    const userData2 = {
      email: 'test2@user.at',
      phoneNumber: '0123456789',
      address: {
        city: 'Vienna',
        postalCode: 1110,
        street: 'Teststreet',
        streetNumber: '23',
        streetExtra: 'Top 1',
      },
      password: 'test',
    }
    const res = await request(app).post('/api/auth/signup').send(userData2).set('Accept', 'application/json')
    expect(res.status).toBe(500)
    expect(res.text).toMatchSnapshot()
    done()

  })

  // it('registers a new User', function (done) {
  //   const userData = {
  //     email: 'test@User.at',
  //     UserName: 'Test User',
  //     owner: 'testOwner',
  //     phoneNumber: '111111111',
  //     address: {
  //       city: 'Vienna',
  //       postalCode: 1110,
  //       street: 'Teststreet',
  //       streetNumber: '23',
  //       streetExtra: 'Top 1',
  //     },
  //     availableSeats: 50,
  //     password: 'test',
  //   }
  //   request(app)
  //     .post('/api/auth/signup')
  //     .send(userData)
  //     .set('Accept', 'application/json')
  //     .expect(200)
  //     .then(async (res) => {
  //       expect(res.text).to.equal('Successfully created User')
  //       const user = await User.findOne({ email: 'testUser@test.at' })
  //       expect(user).to.exist
  //       done()
  //     })
  // })

  // it('catches registering a User with existing email', function (done) {
  //   request(app)
  //     .post('/api/auth/signup')
  //     .send(userData)
  //     .set('Accept', 'application/json')
  //     .expect(400)
  //     .then(async (res) => {
  //       expect(res.text).to.equal('There is already a User with this phoneNumber')
  //       done()
  //     })
  // })

  afterAll(async (done) => {
    await User.deleteOne({ email: 'test@user.at' })
    await User.deleteOne({ email: 'test2@user.at' })
    await mongoose.disconnect()
    done()
  })
})
