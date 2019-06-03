    import React, {Component} from 'react';
    import Avatar from '@material-ui/core/Avatar';
    import Button from '@material-ui/core/Button';
    import CssBaseline from '@material-ui/core/CssBaseline';
    import TextField from '@material-ui/core/TextField';
    import Grid from '@material-ui/core/Grid';
    import AccountcircleIcon from '@material-ui/icons/AccountCircle';
    import Typography from '@material-ui/core/Typography';
    import Container from '@material-ui/core/Container';
    import { Link } from 'react-router-dom'
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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    });

    

    class LogIn extends Component {
      constructor(){
        super();
        this.state = {
          nombre: '',
          clave: '',
          successText: '',
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      

      handleInput(e){
        //console.log(e.target.value, e.target.name);
        const {value, name} = e.target;
        this.setState({
          [name]: value
        })
        
      }

      handleSubmit(e){
        e.preventDefault();//evito refrezcar
        /*console.log(this.state);
        alert('procesando');*/
        let requestBody = {};
        requestBody.nombre = this.state.nombre;
        requestBody.clave = this.state.clave;
        fetch('/TPOSpring/login', {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: new Headers({
              'Content-Type': 'application/json'
          }),
      }).then(response => { return response.json() })
      .then(response => {
        console.log(response);
        this.setState({ successText: response.mensaje });
        if(response.estado===true){
          this.props.logIn();
        }
      });
    }


      render(){
        const {classes} = this.props;
        return (
        <Container component="main" maxWidth="xs" >
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AccountcircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Iniciar sesion
            </Typography>
            <form className={classes.form} validate onSubmit={this.handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="nombre"
                label="Nombre de usuario"
                name="nombre"
                autoComplete="nombre"
                autoFocus
                onChange={this.handleInput}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="clave"
                label="clave"
                type="password"
                id="clave"
                autoComplete="clave"
                onChange={this.handleInput}
              />
              <Typography variant="subtitle1" color="error" align="left">{this.state.successText}</Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Iniciar sesion
              </Button>
              <Grid container>
                <Grid item>
                <Link to="/ChagePassword" variant="body2">
                  Cambiar la contraseña
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      );
    }
    }

    export default withStyles(styles)(LogIn)