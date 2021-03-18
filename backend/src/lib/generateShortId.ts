import shortid from 'shortid'

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+@')

const generateShortId = function (): string {
  const data = shortid.generate()
  return data.toUpperCase().slice(0, 6)
}

export default generateShortId
