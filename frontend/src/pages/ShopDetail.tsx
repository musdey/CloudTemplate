import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import api from '../lib/api'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { Card, CardContent } from '@material-ui/core'
import { useAuth } from '../lib/use-auth'
import Document from '../lib/paperContent'
import ReactPDF, { PDFDownloadLink } from '@react-pdf/renderer'
import { Formik, Field, Form } from 'formik'
import { TextField } from 'formik-material-ui'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    width: '100%',
    margin: '10px',
  },
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

interface Values {
  tableNumberFormik: string
}

const ShopDetail: React.FunctionComponent = () => {
  const { loggedIn, shop, login, logout } = useAuth()
  const [qr, setQr] = React.useState('')
  const [buttonClickable, setButtonClickable] = React.useState(false)
  const [shopName, setShopName] = React.useState('')
  const [address, setAddress] = React.useState()
  const [imgUri, setImgUri] = React.useState('')
  const [a4PDFUrl, setA4PDFURL] = React.useState()
  const [a5PDFUrl, setA5PDFURL] = React.useState()
  const [tableNr, setTableNr] = React.useState(Number)

  const history = useHistory()

  const apiCall = async () => {
    const data = {
      shopName: 'name',
      qr: 'qr',
    }
    //const data = await api.getShop(shopId)
    setShopName(data.shopName)
    setImgUri(data.qr)
    console.log(data)
    const canvas: any = document.getElementById('qr')
    if (canvas) {
      const ctx = canvas!.getContext('2d')
      const image = new Image()
      image.src = data.qr
      image.onload = function (e) {
        ctx.drawImage(
          image,
          canvas.width / 2 - image.width / 2,
          canvas.height / 2 - image.height / 2
        )
      }
      ctx.drawImage(
        image,
        canvas.width / 2 - image.width / 2,
        canvas.height / 2 - image.height / 2
      )
    }
  }

  // useEffect(() => {
  //   console.log('data from onclick changed amina')
  //   console.log(onShowDetailClicked)
  // }, [onShowDetailClicked])

  const onClick = () => {
    logout()
    history.push('/home')
  }

  const downloadA4 = async () => {
    const win = window.open(a4PDFUrl, '_blank')
    if (win != null) {
      win.focus()
    }
    //ReactDOM.render(Document(shopName, imgUri), document.getElementById('root'))
    //ReactPDF.render(Document(shopName, imgUri), `${__dirname}/${shopName}.pdf`)
    //alert('A4')
  }
  const downloadA5 = () => {
    const win = window.open(a5PDFUrl, '_blank')
    if (win != null) {
      win.focus()
    }
  }
  const print = () => {
    alert('print')
  }

  useEffect(() => {
    apiCall()
  }, [])

  const classes = useStyles()

  if (!loggedIn) {
    return <Redirect to="/login" />
  }

  const onsubmit = async (values: Values) => {
    console.log(values)
  }

  return (
    <Container component="main" maxWidth="xs">
      {/* {imgUri && (
        <div>
          <PDFDownloadLink
            document={Document(tableNr, 'A4', shopName, imgUri)}
            fileName="somename.pdf"
          >
            {({ blob, url, loading, error }) => {
              if (!loading) {
                setA4PDFURL('url')
              }
            }}
          </PDFDownloadLink>
          <PDFDownloadLink
            document={Document(tableNr, 'A5', shopName, imgUri)}
            fileName="somename.pdf"
          >
            {({ blob, url, loading, error }) => {
              if (!loading) {
                setA5PDFURL('url')
              }
            }}
          </PDFDownloadLink>
        </div>
      )} */}

      <CssBaseline />
      <div className={classes.paper}>
        <Card className={classes.root}>
          <CardContent className={classes.root}>
            <Typography component="h1" variant="h5">
              Herzlich Willkommen, <br></br>
              {shop?.shopName || ''}!
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.root}>
          <CardContent>
            Dies ist Ihr persönlicher QR Code:
            <canvas id="qr"></canvas>
          </CardContent>
        </Card>
        <Card className={classes.root}>
          <CardContent>
            <Typography component="h1" variant="body1">
              Den QR Code können Sie gerne als PDF in A4 oder A5 ausdrucken.
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.root}>
          <CardContent>
            <Typography component="h1" variant="body1">
              Falls Sie eine Tischnummer auf dem PDF wollen, geben Sie diese
              einfach mit ein.
            </Typography>
            <Formik
              initialValues={{
                tableNumberFormik: '',
              }}
              validate={(values) => {
                const errors: Partial<Values> = {}
                if (
                  values.tableNumberFormik &&
                  Number.isNaN(parseInt(values.tableNumberFormik))
                ) {
                  errors.tableNumberFormik =
                    'Bitte eine Zahl eingeben oder Feld leer lassen.'
                }
                setTableNr(parseInt(values.tableNumberFormik))
                return errors
              }}
              onSubmit={onsubmit}
            >
              <Form className={classes.form}>
                <Field
                  component={TextField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  type="number"
                  id="tableNumberFormik"
                  label="Tischnummer (optional) "
                  name="tableNumberFormik"
                />
              </Form>
            </Formik>
          </CardContent>
        </Card>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Button
              type="submit"
              onClick={downloadA4}
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Download A4
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              onClick={downloadA5}
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Download A5
            </Button>
          </Grid>
        </Grid>

        <Button
          type="submit"
          onClick={onClick}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          LOGOUT
        </Button>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default ShopDetail
