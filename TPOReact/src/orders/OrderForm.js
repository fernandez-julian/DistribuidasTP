import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { MenuItem, Select, Input } from '@material-ui/core';

let styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        margin: theme.spacing.unit,
        textAlign: 'center',
    },
    paper: {
        maxWidth: '60%',
        width: 500,
        textAlign: 'center',
        margin: `${theme.spacing.unit}px auto`,
        padding: theme.spacing.unit * 4,
        color: theme.palette.text.secondary,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) !important',
    },
    margin: {
        margin: theme.spacing(1),
    },
    typography: {
        color: 'black',
    }
});
class OrderForm extends React.Component {
    state = {
        cuit: '',
        clients: [],
        helperText: '',
    };

    componentDidMount = () => {
        fetch('/TPOSpring/allClientes')
            .then(response => { return response.json() })
            .then(response => {
                if (response.estado === true) {
                    this.setState({ clients: JSON.parse(response.datos).filter(client => client.activo === true) });
                }

            });
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    onSubmit = event => {
        event.preventDefault();
        if (!this.state.cuit) {
            this.setState({ helperText: "*Campo requerido" });
        } else {
            fetch('/TPOSpring/pedidos?cuit=' + this.state.cuit, {
                method: "POST",
            })
                .then(response => { return response.json() })
                .then(response => {
                    if (response.estado === true) {
                        // eslint-disable-next-line
                        this.props.closeModal(new String(response.mensaje + ". Numero de pedido: " + JSON.parse(response.datos).nroPedido));
                    } else {
                        this.setState({ helperText: response.mensaje });
                    }
                });
        }
    }

    render = () => {
        let { classes } = this.props;
        return <Paper className={classes.paper}>
            <Typography className={classes.typography} variant="h5">Nuevo pedido</Typography>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.onSubmit.bind(this)}>
                <Grid item xs={12}>
                    <FormControl fullWidth className={classes.margin} required>
                        <InputLabel shrink htmlFor="cuit">Cliente</InputLabel>
                        <Select
                            id="cuit"
                            value={this.state.cuit}
                            onChange={this.handleChange('cuit')}
                            error={!this.state.cuit}
                            name="cuit"
                            input={<Input name="cuit" id="cuit" />}
                            displayEmpty>
                            {this.state.clients.map(client => (
                                <MenuItem key={client.numero} value={client.cuil}>
                                    {client.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" color="error" align="left">{this.state.helperText}</Typography>
                </Grid>
                <Button variant="contained" color="primary" className={classes.button} type="submit" fullWidth>
                    Crear</Button>
            </form>
        </Paper>;
    }
}

export default withStyles(styles)(OrderForm)