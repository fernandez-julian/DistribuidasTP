import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Pc from '../pc.png';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(10),
  },
  button: {
    marginLeft: theme.spacing(4.5),
    margintop: theme.spacing(4),
  },
  root: {
    flexGrow: 1,
  },
  imagen: {
    height: 300,
    width: 300,

  }
}));


function Home() {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div align='center'>
        <img src={Pc} className={classes.imagen} alt="Pc" />
      </div>
      <Grid item xs={12}>
        <Link to="/LogIn"><Button variant="contained" color="secundary" className={classes.button}>
          Iniciar sesion
    </Button></Link>
        <Link to="/"><Button variant="contained" color="primary" className={classes.button}>
          Registrarse
    </Button></Link>
      </Grid>
    </Container>
  );
}

export default Home;