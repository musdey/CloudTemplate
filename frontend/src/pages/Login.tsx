import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Formik, Field, Form } from 'formik'
import { TextField } from 'formik-material-ui'
import api from '../lib/api'
import { useAuth } from '../lib/use-auth'
import { Redirect } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import { Snackbar } from '@material-ui/core'

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
  paper: {
    marginTop: theme.spacing(8),
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

const sigin = async function () {
  const data = document.getElementById('shopName')!.nodeValue
  console.log(data)
}

interface Values {
  email: string
  password: string
}

const Login: React.FunctionComponent = () => {
  const { loggedIn, shop, login } = useAuth()
  const [open, setOpen] = React.useState(false)
  const classes = useStyles()
  const [buttonClickable, setButtonClickable] = React.useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  if (loggedIn) {
    const url = '/shop-detail/' + shop!.shopId
    return <Redirect to={url} />
  }

  const onsubmit = async (values: Values) => {
    const success = await login(values.email, values.password)
    if (!success) {
      setOpen(true)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login für Betriebe
        </Typography>
        <Formik
          initialValues={{
            email: 'test@shop.at',
            password: 'test',
          }}
          validate={(values) => {
            const errors: Partial<Values> = {}
            if (!values.email) {
              errors.email = 'Pflichtfeld'
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = 'Keine gültige E-Mail Addresse'
            }
            // const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
            if (!values.password) {
              errors.password = 'Pflichtfeld'
            }
            // } else if (!regex.test(values.password)) {
            //   errors.password = 'Min 8 Zeichen + Sonderzeichen + Ziffer + Großbuchstabe'
            // }
            if (!errors.email && !errors.password) {
              setButtonClickable(true)
            } else {
              setButtonClickable(false)
            }
            return errors
          }}
          onSubmit={onsubmit}
        >
          <Form className={classes.form}>
            <Field
              component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-Mail Addresse"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <Field
              component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Passwort"
              name="password"
              type="password"
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              disabled={!buttonClickable}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              login
            </Button>
            <Grid container spacing={2}>
              <Grid item>
                <Link href="/password-reset" variant="body2">
                  {'Passwort vergessen?'}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {'Kein Account? Hier registrieren!'}
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Username oder Passwort falsch!
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Login
