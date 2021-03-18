import QRCode from 'qrcode'

const generateQR = async (url: string): Promise<string> => {
  let data: string
  try {
    data = await QRCode.toDataURL(url, { errorCorrectionLevel: 'H' })
  } catch (err) {
    console.log(err)
    data = 'error'
  }
  return data
}

export default generateQR
