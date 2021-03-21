import mongoose from 'mongoose'

/**
 *
 * @param defaultTimeoutForQuery in MS
 */
const connect = async (
  host: string,
  port: number,
  username?: string,
  password?: string,
  database?: string,
  defaultTimeoutForQuery?: number
): Promise<void> => {

  let connectionString = `mongodb://${username}:${password}@${host}:${port}/${database}`
  if (process.env.NODE_ENV !== "production") {
    connectionString = `mongodb://${host}:${port}/${database}`
  }
  try {
    await mongoose.connect(
      `mongodb://${username}:${password}@${host}:${port}/${database}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    console.log(`[Mongoose] Connected to ${host}:${port}/${database}`)
  } catch (err) {
    console.log(`[Mongoose] ${err}`)
  }
}

export default connect
