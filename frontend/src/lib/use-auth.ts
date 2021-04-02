import React, { useContext, createContext, useState } from 'react'
import api from './api'
//  https://usehooks.com/useAuth/

const useProvideAuth = (): AuthContextInterface => {
  const [shop, setShop] = useState<Shop>()
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  const logout = async (): Promise<void> => {
    return await api
      .logout()
      .then(() => {
        setShop(undefined)
        setLoggedIn(false)
      })
      .catch((err) => {
        throw err
      })
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      await api
        .signin(email, password)
        .then(async (data) => {
          console.log(data)
          setShop(data)
          setLoggedIn(true)
          resolve(true)
        })
        .catch((err) => {
          resolve(false)
        })
    })
  }

  return {
    login,
    logout,
    shop,
    loggedIn,
  }

}
const AuthContext = createContext({} as AuthContextInterface)

export function ProvideAuth({ children }: { children: React.ReactNode }): JSX.Element {
  const auth = useProvideAuth()
  return React.createElement(AuthContext.Provider, { value: auth }, children)
}

export const useAuth = (): AuthContextInterface => useContext(AuthContext)

type Shop = {
  address: string
  email: string
  owner: string
  shopName: string
  shopId: string
  phoneNumber: string
  availableSeats: string
}

interface AuthContextInterface {
  logout: () => Promise<void>
  login: (email: string, password: string) => Promise<boolean>
  shop?: Shop
  loggedIn: boolean
}