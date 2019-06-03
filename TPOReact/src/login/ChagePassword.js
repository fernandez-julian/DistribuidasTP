import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import AccountcircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles'

let styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class ChagePassword extends Component {
  constructor() {
    super();
    this.state = {
      nombre: '',
      ContraseñaActual: '',
      ContraseñaNueva: '',
      helperText: '',
      successText: '',
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleInput(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit(e) {
    e.preventDefault();//evito refrezcar    
    let requestBody = {};
    requestBody.nombre = this.state.nombre;
    requestBody.clave = this.state.ContraseñaNueva;
    if (this.state.ContraseñaActual !== this.state.ContraseñaNueva) {
      fetch('/TPOSpring/changePassWord', {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
      })
        .then(response => { return response.json() })
        .then(response => {
          if (response.estado === true) {
            if (!this.state.forgotPasswordMode) {
              // eslint-disable-next-line
              this.props.closeModal(new String(response.mensaje), this.state.name);
            }
            else {
              this.setState({ forgotPasswordMode: false, successText: response.mensaje, helperText: '' });
            }
          } else {
            this.setState({ helperText: response.mensaje });
          }
        });
    }
    else {
      this.setState({ helperText: 'La contraseña debe ser diferente a la actual' });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountcircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cambio de Contraseña
        </Typography>
          <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="fname"
                  name="nombre"
                  variant="outlined"
                  required
                  fullWidth
                  id="nombre"
                  label="Nombre de usuario"
                  autoFocus
                  onChange={this.handleInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="ContraseñaActual"
                  label="Contraseña actual"
                  name="ContraseñaActual"
                  autoComplete="ContraseñaActual"
                  type="password"
                  onChange={this.handleInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="ContraseñaNueva"
                  label="Contraseña nueva"
                  type="password"
                  id="ContraseñaNueva"
                  autoComplete="ContraseñaNueva"
                  onChange={this.handleInput}
                />
              </Grid>
            </Grid>
            <Typography variant="subtitle1" color="error" align="left">{this.state.helperText}</Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Guardar
          </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/LogIn" variant="body2">
                  volver atras
              </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(ChagePassword)