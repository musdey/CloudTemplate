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
import { Persist } from 'formik-persist'

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

interface Values {
  shopName: string
  email: string
  password: string
  password2: string
  ownerName: string
  phoneNumber: string
  seats: number
  address: string
}

const Register: React.FunctionComponent = () => {
  const [buttonClickable, setButtonClickable] = React.useState(false)

  const onsubmit = async (values: Values) => {
    const result = await api.register(
      values.email,
      values.password,
      values.ownerName,
      values.phoneNumber,
      values.shopName,
      values.seats,
      values.address
    )
    console.log(JSON.stringify(result))
  }

  const classes = useStyles()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Für Registro registrieren
        </Typography>
        <Formik
          initialValues={{
            email: '',
            password: '',
            ownerName: '',
            password2: '',
            phoneNumber: '',
            shopName: '',
            address: '',
            seats: 0,
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
            const regex = new RegExp(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
            )
            if (!values.password) {
              errors.password = 'Pflichtfeld'
            } else if (!regex.test(values.password)) {
              errors.password =
                'Min 8 Zeichen + Sonderzeichen + Ziffer + Großbuchstabe'
            }

            if (!values.password2) {
              errors.password2 = 'Pflichtfeld'
            } else if (values.password !== values.password2) {
              errors.password2 = 'Die Passwörter stimmen nicht überein'
            }

            if (!values.shopName) {
              errors.shopName = 'Pflichtfeld'
            }
            if (!values.ownerName) {
              errors.ownerName = 'Pflichtfeld'
            }
            // TODO: Find perfekt regex here
            if (!values.phoneNumber) {
              errors.phoneNumber = 'Pflichtfeld'
            }
            /* else if (!/^\+(?:[0-9] ?){6,14}[0-9]$/.test(values.phoneNumber)) {
              errors.phoneNumber = 'Bitte eine international gültige Telefonnummer eingeben'
            } */

            if (Object.keys(errors).length === 0) {
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
              id="shopName"
              label="Name Geschäft"
              name="shopName"
            />
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

            <Field
              component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Passwort bestätigen"
              type="password"
              id="password2"
              autoComplete="current-password"
            />
            <Field
              component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="ownerName"
              label="Name InhaberIn"
              name="ownerName"
              autoComplete="email"
            />
            <Field
              component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Telefonnummer"
              name="phoneNumber"
              autoComplete="phone"
            />
            <Field
              component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="address"
              label="Adresse"
              name="address"
              autoComplete="addres"
            />
            <Field
              component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="seats"
              label="Sitzplätze"
              name="seats"
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Zugang speichern"
            />
            <Button
              type="submit"
              disabled={!buttonClickable}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Registrieren
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/password-reset" variant="body2">
                  Passwort vergessen?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {'Bereits registriert? Hier zum Login!'}
                </Link>
              </Grid>
            </Grid>
            <Persist name="signup-form" />
          </Form>
        </Formik>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default Register
