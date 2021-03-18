import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
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
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

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
}

const PWForgot: React.FunctionComponent = () => {
  const [open, setOpen] = React.useState(false)
  const [buttonClickable, setButtonClickable] = React.useState(false)

  const onsubmit = async (values: Values) => {
    values.email = ''
    setButtonClickable(false)
    // const result = await api.login(values.email)
    setOpen(true)
  }

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
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
          Passwort zurücksetzen
        </Typography>
        <Typography component="h5" variant="body2">
          Hier haben Sie die Möglichkeit, Ihr Passwort zurückzusetzen. Dafür
          wird Ihnen ein Link an Ihre E-Mail Addresse zugestellt. Folgen Sie
          diesem Link um Ihr neues Passwort einzugeben.
        </Typography>
        <Formik
          initialValues={{
            email: '',
          }}
          validate={(values) => {
            const errors: Partial<Values> = {}
            if (
              values.email &&
              values.email.length > 0 &&
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = 'Keine gültige E-Mail Addresse'
            }
            if (!errors.email && values.email.length > 0) {
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

            <Button
              type="submit"
              disabled={!buttonClickable}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Password zurücksetzen
            </Button>
            <Grid container spacing={2}>
              <Grid item>
                <Link href="/login" variant="body2">
                  {'Zurück zum Login'}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
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
        <Alert onClose={handleClose} severity="success">
          Link wurde zugestellt.
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default PWForgot
