import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete';
import MoneyIcon from '@material-ui/icons/MonetizationOnOutlined'
import AddIcon from '@material-ui/icons/Add'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ListItem, ListItemText, List, FormControl, InputLabel, Select, MenuItem, Input } from '@material-ui/core';

let styles = theme => ({
    textField: {
        marginLeft: `1 ${theme.spacing.unit * 3}px`,
        marginRight: `1 ${theme.spacing.unit * 3}px`,
        width: 200,
    },
    paper: {
        maxWidth: '60%',
        textAlign: 'center',
        margin: `${theme.spacing.unit}px auto`,
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    },
    margin: {
        margin: theme.spacing.unit,
        textAlign: 'center',
        flex: 'auto',
    },
    button: {
        margin: `${theme.spacing.unit}px auto`,
    },
    text: {
        textAlign: 'center',
        flex: 'auto',
        color: 'black',
    },
    listItem: {
        textAlign: 'center',
        color: 'black',
    },
    typography: {
        color: 'black',
    }
});
class Order extends React.Component {
    state = {
        pendingProducts: [],
        products: [],
        helperText: '',
    };

    componentDidMount = () => {
        fetch('/TPOSpring/allProductos')
            .then(response => { return response.json() })
            .then(response => {
                if (response.estado === true) {
                    this.setState({ products: JSON.parse(response.datos), pendingProducts: [] });
                }
            });
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    addProductName = index => event => {
        let updatedPendingProducts = this.state.pendingProducts.slice();
        updatedPendingProducts[index].product = event.target.value;
        this.setState({ pendingProducts: updatedPendingProducts });
    };

    addProductQuantity = index => event => {
        let updatedPendingProducts = this.state.pendingProducts.slice();
        updatedPendingProducts[index].quantity = event.target.value;
        this.setState({ pendingProducts: updatedPendingProducts });
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

    onDelete = () => {
        fetch('/TPOSpring/deletePedidoById?numero=' + this.props.order.numeroPedido, { method: "POST" })
            .then(response => { return response.json(); })
            .then(response => {
                this.props.onDeleted(response);
            });
    }

    onBill = () => {
        fetch('/TPOSpring/facturarPedido?numero=' + this.props.order.numeroPedido, {
            method: "POST", headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => { return response.json(); })
            .then(response => {
                this.props.onBilled(response);
            });
    }

    onAddProducts = () => {
        this.setState({
            pendingProducts: [...this.state.pendingProducts, { product: '', quantity: '' }]
        });
    }

    onAddProduct = index => event => {
        let product = this.state.pendingProducts[index];
        if (!product.product || !product.quantity) {
            this.setState({ helperText: "*Campo requerido" });
        } else {
            fetch('/TPOSpring/pedidos/' + this.props.order.numeroPedido + '/productos?idProducto=' + product.product + "&cantidad=" + product.quantity, {
                method: "POST"
            })
                .then(response => { return response.json(); })
                .then(response => {
                    this.setState({ pendingProducts: [], helperText: '' });
                    this.props.onProductsAdded(response);
                });
        }
    }

    render = () => {
        let { classes } = this.props;
        let date = new Date(this.props.order.fechaPedido);
        return <React.Fragment>
            <Typography variant="h6" gutterBottom className={classes.typography}>
                Pedido número {this.props.order.numeroPedido}
            </Typography>
            <Grid container alignContent="center" alignItems="flex-start">
                <Grid item xs={6}>
                    <Typography className={classes.typography} variant="h6" gutterBottom>Cliente</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography className={classes.typography} gutterBottom>{this.props.order.cliente.nombre}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography className={classes.typography} variant="h6" gutterBottom>Fecha</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography className={classes.typography} gutterBottom>{date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography className={classes.typography} variant="h6" gutterBottom>Estado</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography className={classes.typography} gutterBottom>{this.props.order.estado}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography className={classes.typography} variant="h6" gutterBottom>Productos</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="text" color="primary" className="button" onClickCapture={this.onAddProducts.bind(this)} disabled={this.props.order.estado === "facturado"}>
                        Agregar productos        <AddIcon />
                    </Button></Grid>
                <Grid item xs={12}>
                    <List disablePadding>
                        {this.props.order.items.map((item, index) => (
                            <Grid item xs={12}>
                                <ListItem key={index}>
                                    <ListItemText primary={item.cantidad + ' ' + item.producto.nombre} secondary={item.producto.marca} className={classes.listItem} />
                                    <Typography variant="body2" gutterBottom className={classes.text}>{item.precio}</Typography>
                                </ListItem>
                            </Grid>
                        ))}
                        {this.state.pendingProducts.map((product, index) => (
                            <Grid item xs={12}>
                                <ListItem key={index}>
                                    <FormControl className={classes.margin} required>
                                        <InputLabel shrink htmlFor="product">Producto</InputLabel>
                                        <Select
                                            id="product"
                                            value={this.state.pendingProducts[index].product}
                                            onChange={this.addProductName(index)}
                                            error={!this.state.pendingProducts[index].product}
                                            name="product">
                                            {this.state.products.map(product => (
                                                <MenuItem key={product.identificador} value={product.identificador}>
                                                    {product.nombre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl className={classes.margin} required>
                                        <InputLabel htmlFor="quantity">Cantidad</InputLabel>
                                        <Input
                                            id="quantity"
                                            value={this.state.pendingProducts[index].quantity}
                                            onChange={this.addProductQuantity(index)}
                                            error={!this.state.pendingProducts[index].quantity}
                                            type="number"
                                            inputProps={{ min: "1", max: "100", step: "1" }}
                                        />
                                    </FormControl>
                                    <Button variant="text" color="primary" className="button" onClickCapture={this.onAddProduct(index)}>
                                        Agregar<AddIcon />
                                    </Button>
                                </ListItem>
                            </Grid>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" color="error" align="left">{this.state.helperText}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" color="primary" className={classes.button} onClickCapture={this.onBill.bind(this)} disabled={this.props.order.estado === "facturado"}>
                        Facturar  pedido  <MoneyIcon />
                    </Button></Grid>
                <Grid item xs={6}>
                    <Button variant="contained" color="secondary" className={classes.button} onClickCapture={this.onDelete.bind(this)}>
                        Eliminar pedido       <DeleteIcon />
                    </Button></Grid>
            </Grid>
        </React.Fragment>;
    }
}

export default withStyles(styles)(Order)