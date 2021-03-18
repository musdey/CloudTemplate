import * as mongoose from 'mongoose'
import { RequestHandler } from 'express'

const dbNotUp: RequestHandler = (req, res, next) => {
  /** readyStates
   * 0 = disconnected
   * 1 = connected
   * 2 = connecting
   * 3 = disconnecting
   */
  if (mongoose.connection.readyState !== 1) {
    console.error('DB not reachable, return 503')
    res.status(503)
    res.json('503 - Server not up yet')
    return
  }
  next()
}

export default dbNotUp
