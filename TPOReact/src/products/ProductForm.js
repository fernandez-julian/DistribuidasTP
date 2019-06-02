import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { MenuItem, Select } from '@material-ui/core';

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
        textAlign: 'center',
        margin: `${theme.spacing.unit}px auto`,
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) !important',
    },
    margin: {
        margin: theme.spacing.unit,
    },
});
class ProductForm extends React.Component {
    state = {
        name: '',
        brand: '',
        code: '',
        amount: '',
        item: '',
        subitem: '',
        items: [],
        subitems: []
    };

    componentDidMount = () => {
        fetch('/TPOSpring/allRubros')
            .then(response => { return response.json() })
            .then(response => {
                if (response.estado === true) {
                    this.setState({ items: JSON.parse(response.datos) });
                }
            });
        fetch('/TPOSpring/allSubRubros')
            .then(response => { return response.json() })
            .then(response => {
                if (response.estado === true) {
                    this.setState({ subitems: JSON.parse(response.datos) });
                }
            });
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    onSubmit = event => {
        event.preventDefault();
        if (!this.state.name || !this.state.brand || !this.state.code || !this.state.amount || !this.state.item || !this.state.subitem) {
            this.setState({ helperText: "*Campo requerido" });
        } else {
            let requestBody = {};
            requestBody.nombre = this.state.name;
            requestBody.marca = this.state.brand;
            requestBody.codigoBarras = this.state.code;
            requestBody.precio = parseFloat(this.state.amount);
            requestBody.codigoRubro = this.state.item;
            requestBody.codigoSubRubro = this.state.subitem;
            fetch('/TPOSpring/productos/nuevo', {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
            })
                .then(response => { return response.json() })
                .then(response => {
                    if (response.estado === true) {
                        // eslint-disable-next-line
                        this.props.closeModal(new String(response.mensaje));
                    } else {
                        this.setState({ helperText: response.mensaje });
                    }
                });
        }
    }

    render = () => {
        let { classes } = this.props;
        return <div>
            <Paper className={classes.paper}>
                <Typography variant="h5">Nuevo producto</Typography>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={this.onSubmit.bind(this)}>
                    <Grid item xs={12}>
                        <FormControl fullWidth className={classes.margin} required>
                            <InputLabel htmlFor="name">Nombre</InputLabel>
                            <Input
                                id="name"
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                                error={!this.state.name}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth className={classes.margin} required>
                            <InputLabel htmlFor="brand">Marca</InputLabel>
                            <Input
                                id="brand"
                                value={this.state.brand}
                                onChange={this.handleChange('brand')}
                                error={!this.state.brand}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth className={classes.margin} required>
                            <InputLabel htmlFor="code">Código de barras</InputLabel>
                            <Input
                                id="code"
                                value={this.state.code}
                                onChange={this.handleChange('code')}
                                error={!this.state.code}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth className={classes.margin} required>
                            <InputLabel htmlFor="amount">Precio</InputLabel>
                            <Input
                                id="amount"
                                value={this.state.amount}
                                onChange={this.handleChange('amount')}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                error={!this.state.amount}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth className={classes.margin} required>
                            <InputLabel htmlFor="item">Rubro</InputLabel>
                            <Select
                                id="item"
                                value={this.state.item}
                                onChange={this.handleChange('item')}
                                error={!this.state.item}
                                name="item"
                                displayEmpty>
                                {this.state.items.map(option => (
                                    <MenuItem key={option.codigo} value={option.codigo}>
                                        {option.descripcion}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth className={classes.margin} required>
                            <InputLabel htmlFor="subitem">SubRubro</InputLabel>
                            <Select
                                id="subitem"
                                value={this.state.subitem}
                                onChange={this.handleChange('subitem')}
                                error={!this.state.subitem}
                                name="subitem"
                                displayEmpty>
                                {this.state.subitems.map(option => (
                                    <MenuItem key={option.codigo} value={option.codigo}>
                                        {option.descripcion}
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
            </Paper>
        </ div>;
    }
}

export default withStyles(styles)(ProductForm)