import fetch from 'node-fetch'
import fetchIntercept from 'fetch-intercept'

const protocol = 'http://'
const host = window.location.hostname
const port = ':3000'

const getUserData = async () => {
  const url = `${protocol + host + port}/api/test/user`
  try {
    const result = await fetch(url, {
      method: 'get',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + localStorage.getItem("TOKEN") }
    })
    const body = await result.json()

    return { status: result.status, body: body }
  } catch (err) {
    console.log(err)
  }
}

const signup = async (
  email: string, password: string): Promise<any> => {
  const obj = { email, password }
  const url = `${protocol + host + port}/api/auth/signup`
  try {
    const result = await fetch(url, {
      method: 'post',
      body: JSON.stringify(obj),
      headers: { 'Content-Type': 'application/json' }
    })
    const body = await result.json()
    return { status: result.status, body: body }
  } catch (err) {
    console.log(err)
  }
}

const signin = async (email: string, password: string): Promise<any> => {
  const obj = { email, password }
  const url = `${protocol + host + port}/api/auth/signin`
  const result = await fetch(url, {
    method: 'post',
    body: JSON.stringify(obj),
    headers: { 'Content-Type': 'application/json' }
  })
  if (result.ok) {
    return await result.json()
  } else {
    throw new Error("Unauthorized")
  }
}

const signout = async (): Promise<any> => {
  const url = `${protocol + host + port}/api/auth/logout`
  try {
    const result = await fetch(url)
    return result
  } catch (err) {
    console.log(err)
  }
}

const getUser = async (shopId: string): Promise<any> => {
  const url = `${protocol + host + port}/api/user/${shopId}`
  try {
    const result = await fetch(url, { method: 'GET' })
    if (result.ok) {
      return result.json()
    }
  } catch (err) {
    console.log(err)
  }
}
const apiObj = { signin, signup, signout, getUser, getUserData }
export default apiObj