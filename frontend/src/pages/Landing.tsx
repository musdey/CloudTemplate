import React, { useRef } from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'

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
  image: {
    backgroundImage: 'url("images/restaurant1.jpg")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '300px',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}))

const cards = [
  {
    key: 1,
    title: '1. Registrieren',
    img: 'images/home_login.jpg',
  },
  {
    key: 2,
    title: '2. QR-Code ausdrucken',
    img: 'images/home_printer1.jpg',
  },
  {
    key: 3,
    title: '3. Den Gästen servieren',
    img: 'images/home_qr.jpg',
  },
  {
    key: 4,
    title: '4. Daten abfragen',
    img: 'images/home_data.png',
  },
  {
    key: 5,
    title: '5. Zeit und Geld sparen',
    img: 'images/home_savemoney.jpg',
  },
]

const scrollToRef = (ref: any) => {
  console.log(ref.current.offsetTop)
  window.scrollTo(0, ref.current.offsetTop + 450)
}

export default function Album() {
  const myRef = useRef(null)
  const executeScroll = () => scrollToRef(myRef)
  const classes = useStyles()

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.image}></div>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Willkommen bei Registro
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Registro ist eine kostenlose Platform für alle
              GeschäftsinhaberInnen, um einfach, sicher und unkompliziert Gäste
              zu erfassen.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" href="/register" color="primary">
                    Registieren
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" href="/login" color="primary">
                    Login
                  </Button>
                </Grid>
              </Grid>
            </div>
            <div className={classes.heroButtons}>
              <Grid container spacing={1} justify="center">
                <Grid item>
                  <Button
                    ref={myRef}
                    onClick={executeScroll}
                    variant="outlined"
                    color="primary"
                  >
                    Wie funktioniert das?
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
          {/* End hero unit */}
        </div>

        {/* <div className={classes.image}></div> */}

        <div className={classes.heroContent} id="howto">
          <Container maxWidth="sm">
            <Typography
              component="h3"
              variant="h3"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Philosophie
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Die aktuelle Pandemie erschwert uns in jeder Hinsicht das tägliche
              Leben. Diese Plattform soll dem ohnehin stark angeschlagenen
              Dienstleistungssektor unter die Arme zu greifen. In nur einfachen
              Schritten setzen Sie Registro für Ihr Unternehmen ein!
            </Typography>
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.key} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.img}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h4" component="h4">
                      {card.title}
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  )
}
