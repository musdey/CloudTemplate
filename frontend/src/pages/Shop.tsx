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
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

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
  success: {
    width: '100px',
    height: '100px',
    color: 'green',
    marginTop: '50px',
  },
}))

const sigin = async function () {
  const data = document.getElementById('shopName')!.nodeValue
  console.log(data)
}

interface Values {
  name: string
  email: string
  phoneNumber: string
}

const Shop: React.FunctionComponent = () => {
  const classes = useStyles()
  const [checkedIn, setCheckedIn] = React.useState(false)
  const [buttonClickable, setButtonClickable] = React.useState(false)

  const onsubmit = async (values: Values) => {
    console.log(values)
    //alert(JSON.stringify(values))
    setCheckedIn(true)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Checkin für Gäste
        </Typography>
        {!checkedIn ? (
          <Formik
            initialValues={{
              name: '',
              email: '',
              phoneNumber: '',
            }}
            validate={(values) => {
              const errors: Partial<Values> = {}

              if (!values.name) {
                errors.name = 'Pflichtfeld'
              }

              if (!values.email && !values.phoneNumber) {
                errors.email = 'Pflichtfeld'
                setButtonClickable(false)
              }

              if (
                values.email &&
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              ) {
                errors.email = 'Keine gültige E-Mail Addresse'
              }

              if (values.name && (values.email || values.phoneNumber)) {
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
                id="userName"
                label="Name"
                name="name"
                autoComplete="name"
              />
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="E-Mail Addresse"
                name="email"
                autoComplete="email"
              />
              <hr></hr>
              oder
              <hr></hr>
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="phoneNumber"
                label="Telefonnummer"
                name="phoneNumber"
                autoComplete="phone"
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
                Checkin
              </Button>
              <Grid container spacing={1}>
                <Grid item>
                  <Link href="/home" variant="body2">
                    {'Startseite'}
                  </Link>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        ) : (
          <div>
            <CheckCircleOutlineIcon
              className={classes.success}
            ></CheckCircleOutlineIcon>
            <h1>Sie wurden erfolgreich eingecheckt! </h1>
          </div>
        )}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default Shop
