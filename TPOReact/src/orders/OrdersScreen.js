import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Snackbar from '@material-ui/core/Snackbar';
import OrderForm from './OrderForm'
import { IconButton, Divider, InputBase } from '@material-ui/core';
import Order from './Order';

let styles = theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: `0 ${theme.spacing.unit * 3}px`,

    },
    addFab: {
        margin: theme.spacing.unit,
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 6,
        maxWidth: '95%',
    },
    paper: {
        maxWidth: '95%',
        textAlign: 'center',
        margin: `${theme.spacing.unit}px auto`,
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    }
});

class OrdersScreen extends React.Component {
    constructor(props) {
        super();
        this.state = {
            billNumber: '', order: null, loading: false, message: "", open: false, openModal: false
        };
        this.props = props;
    }
    componentDidMount = () => {
        this.setState({ loading: true });
    }

    onSearchBill = () => {
        if (this.state.billNumber) {
            fetch('/TPOSpring/allPedidoById?numero=' + this.state.billNumber)
                .then(response => { return response.json(); })
                .then(response => {
                    if (response.estado === true) {
                        this.setState({ order: JSON.parse(response.datos) });
                    } else {
                        this.setState({ message: response.mensaje, open: true });
                    }
                    this.setState({ loading: false });
                });
        }
    }

    onBilled = (response) => {
        this.setState({ message: response.mensaje, open: true });
        this.onSearchBill();
    }

    onProductsAdded = (response) => {
        this.setState({ message: response.mensaje, open: true });
        this.onSearchBill();
    }

    onDeleted = (response) => {
        if (response.estado === true) {
            this.setState({ order: null });
        }
        this.setState({ message: response.mensaje, open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleModalClose = (value) => {
        if (value instanceof String && value !== '') {
            this.setState({ message: value, open: true });
        }
        this.setState({ openModal: false });
    };

    onCreateNewOrder = () => {
        this.setState({ openModal: true });
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render = () => {
        let { classes } = this.props;
        let { open } = this.state;
        return (
            <div className={classes.root} >
                <Grid container >
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant="h5">Pedidos</Typography>
                            <Fab variant="extended" color="primary" aria-label="Add" className={classes.addFab} onClickCapture={this.onCreateNewOrder.bind(this)}>
                                <AddIcon className={classes.extendedIcon} />
                                Nuevo pedido</Fab>
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.openModal}
                                onClose={this.handleModalClose.bind(this, "")}
                                style={{ position: 'absolute' }}
                            ><OrderForm closeModal={this.handleModalClose} /></Modal>
                            <Grid container alignItems="flex-start" justify="flex-start">
                                <Grid item xs={4}>
                                    <InputBase className={classes.input} placeholder="Buscar por número de pedido" onChange={this.handleChange('billNumber')} value={this.state.billNumber} type="number" inputProps={{ min: "0", max: "10000000000", step: "1" }} />
                                    <IconButton className={classes.iconButton} aria-label="Search" onClickCapture={this.onSearchBill.bind(this)}>
                                        <SearchIcon />
                                    </IconButton>
                                    <Divider />
                                </Grid>
                            </Grid>
                            {this.state.order ? (
                                <Order
                                    order={this.state.order}
                                    onDeleted={this.onDeleted.bind(this)}
                                    onBilled={this.onBilled.bind(this)}
                                    onProductsAdded={this.onProductsAdded.bind(this)} />) : (<br></br>)}
                            <Snackbar
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                open={open}
                                onClose={this.handleClose}
                                ContentProps={{
                                    'aria-describedby': 'message-id',
                                }}
                                message={<span id="message-id">{this.state.message}</span>}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </ div>
        );
    }
}

export default withStyles(styles)(OrdersScreen)
