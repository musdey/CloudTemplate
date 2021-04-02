import fetch from 'node-fetch'

const protocol = 'http://'
const host = window.location.hostname
const port = ':3000'

const signup = async (
  email: string, password: string, ownerName: string,
  phoneNumber: string, shopName: string, seats: number,
  address: string): Promise<any> => {
  const addr = { city: 'vienna' }
  const obj = { email, password, shopName, owner: ownerName, phoneNumber, address: addr, availableSeats: seats }
  const url = `${protocol + host + port}/api/auth/signup`
  try {
    const result = await fetch(url, {
      method: 'post',
      body: JSON.stringify(obj),
      headers: { 'Content-Type': 'application/json' }
    })
    return await result.json()
  } catch (err) {
    console.log(err)
  }
}

const signin = async (email: string, password: string): Promise<any> => {
  const obj = { email, password }
  const url = `${protocol + host + port}/login`
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

const logout = async (): Promise<any> => {
  const url = `${protocol + host + port}/logout`
  try {
    const result = await fetch(url)
    return result
  } catch (err) {
    console.log(err)
  }
}

const getShop = async (shopId: string): Promise<any> => {
  const url = `${protocol + host + port}/shop/${shopId}`
  try {
    const result = await fetch(url, { method: 'GET' })
    if (result.ok) {
      return result.json()
    }
  } catch (err) {
    console.log(err)
  }
}

export default { signin, signup, logout, getShop }
