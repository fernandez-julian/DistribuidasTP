import React from 'react';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles'

let styles = theme => ({
    paper: {
        maxWidth: '60%',
        width: 500,
        textAlign: 'center',
        padding: theme.spacing.unit * 4,
        marginTop: `${theme.spacing.unit}px auto`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        color: theme.palette.text.secondary,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) !important',
    },
    avatar: {
        margin: `${theme.spacing.unit}px auto`,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: `${theme.spacing.unit}px auto`,
    },
    submit: {
        margin: `${theme.spacing.unit}px auto`,
    },
});

class LoginForm extends React.Component {
    state = {
        name: '',
        password: '',
        helperText: '',
        successText: '',
        forgotPasswordMode: false,
    };

    componentDidMount = () => {
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    onSubmit = event => {
        event.preventDefault();
        if (!this.state.name || !this.state.password) {
            this.setState({ helperText: "*Debe ingresar el nombre y la contraseña" });
        } else {
            let requestBody = {};
            requestBody.nombre = this.state.name;
            requestBody.clave = this.state.password;
            let url = this.state.forgotPasswordMode ? 'changePassWord' : "login";
            fetch('/TPOSpring/' + url, {
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
    }

    onForgotPassword = () => {
        this.setState({ forgotPasswordMode: true });
    }

    render = () => {
        let { classes } = this.props;
        return <Grid container>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{this.state.forgotPasswordMode ? 'Cambio de contraseña' :
                    'Iniciar sesión'}
                </Typography>
                <form className={classes.form} onSubmit={this.onSubmit.bind(this)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nombre"
                        name="name"
                        autoFocus
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={this.state.forgotPasswordMode ? "Nueva contraseña" : "Contraseña"}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >{this.state.forgotPasswordMode ? 'Cambiar contraseña'
                        : 'Ingresar'}
                    </Button>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" color="error" align="left">{this.state.helperText}</Typography>
                        <Typography variant="subtitle1" color="primary" align="left">{this.state.successText}</Typography>
                    </Grid>
                    {!this.state.forgotPasswordMode &&
                        <Grid container>
                            <Grid item xs>
                                <Button
                                    fullWidth
                                    color="primary"
                                    className={classes.submit}
                                    onClickCapture={this.onForgotPassword.bind(this)}
                                >Cambiar contraseña            </Button>
                            </Grid>
                        </Grid>}
                </form>
            </Paper>
        </Grid>;


    }
}

export default withStyles(styles)(LoginForm)