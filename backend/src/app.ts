import express, { NextFunction, Request, Response } from 'express'
import router from './routes/router'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
import connectDB from './db/connect'
import initalizeRoles from './db/initalizeRoles'
import initializeTestUser from './db/initalizeTestUser'

dotenv.config()

const mongodbHost = 'localhost'
const mongodbUser = process.env.MONGO_NON_ROOT_USERNAME || 'user'
const mongodbPw = process.env.MONGO_NON_ROOT_PASSWORD || 'password'
const mongodbDBName = process.env.MONGO_INITDB_DATABASE || 'database'

// Connect mongoose
connectDB(mongodbHost, 27017, mongodbUser, mongodbPw, mongodbDBName, 10000)
initalizeRoles()
//initializeTestUser()

const app = express()

// Setup middleware
app.use(logger('dev'))
//app.use(dbNotUp)
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//app.use(express.static(path.join(__dirname, 'public')))

// Setup routes
app.use('/', router)
app.get('/hi', (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// User.register(new User(testUser), "test", function (err: Error, account) {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log("Successfully created testUser")
// })


export default app
