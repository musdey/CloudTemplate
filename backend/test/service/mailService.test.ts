import sendMail from '../../src/service/mailService'

describe('mailService', () => {
  it('should send email to my private address', async () => {
    const req: any = {
      headers: {
        host: 'localhost',
      },
    }
    const result = await sendMail(req, 'swave94@gmail.com', 'sometoken')
    expect(result).toMatchSnapshot()
  })
})
