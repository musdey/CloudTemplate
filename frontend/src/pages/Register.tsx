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
import Copyright from '../components/Copyright'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

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
  email: string
  password: string
  password2: string
  phoneNumber: string
}

export type Color = 'success' | 'info' | 'warning' | 'error'

const Register: React.FunctionComponent = () => {
  const [buttonClickable, setButtonClickable] = React.useState(false)
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const [snackbarText, setSnackbarText] = React.useState('')
  const [snackbarType, setSnackbarType] = React.useState<Color | undefined>(
    'error'
  )

  const onsubmit = async (values: Values) => {
    try {
      const result = await api.signup(values.email, values.password)
      console.log(result)
      if (result.status === 200) {
        setSnackbarText('Successfully registered user')
        setSnackbarType('success')
      } else {
        setSnackbarText(result.body.message)
        setSnackbarType('error')
      }
    } catch (err) {
      setSnackbarText(err)
      setSnackbarType('error')
    }
    setSnackbarOpen(true)
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
          Register
        </Typography>
        <Formik
          initialValues={{
            email: '',
            password: '',
            password2: '',
            phoneNumber: '',
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

            // TODO: Find perfekt regex here
            // if (!values.phoneNumber) {
            //   errors.phoneNumber = 'Pflichtfeld'
            // }
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
              id="email"
              label="E-Mail address"
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
              label="Password"
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
              label="Confirm password"
              type="password"
              id="password2"
              autoComplete="current-password"
            />

            {/* <Field
              component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Telefonnummer"
              name="phoneNumber"
              autoComplete="phone"
            /> */}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Save credentials"
            />
            <Button
              type="submit"
              disabled={!buttonClickable}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/password-reset" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {'Already registered? Login here!'}
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={7000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          variant="filled"
          severity={snackbarType}
          onClose={() => {
            setSnackbarOpen(false)
          }}
        >
          {snackbarText}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Register
