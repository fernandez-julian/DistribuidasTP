import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from "@material-ui/icons/Edit";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Modal from '@material-ui/core/Modal';
import Snackbar from '@material-ui/core/Snackbar';
import ProductForm from './ProductForm'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { MenuItem, Select } from '@material-ui/core';
import ProductPriceForm from './ProductPriceForm';

let styles = theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: `0 ${theme.spacing.unit * 3}px`,

    },
    paper: {
        maxWidth: '95%',
        textAlign: 'center',
        margin: `${theme.spacing.unit}px auto`,
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    },
    progress: {
        margin: `${theme.spacing.unit}px auto`,
        maxWidth: '100%',
        textAlign: 'center',
    },
    table: {
        minWidth: '95%',
    },
    snackbar: {
        margin: theme.spacing.unit,
        position: 'absolute',
    },
    addFab: {
        margin: theme.spacing.unit,
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 6,
        maxWidth: '95%',
    },
    tableCell: {
        paddingRight: 4,
        paddingLeft: 5
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    typography: {
        color: 'black',
    }
});

class ProductosScreen extends React.Component {
    constructor(props) {
        super();
        this.state = {
            productos: [], loading: false, message: "", page: 0,
            rowsPerPage: 6, rows: [], open: false, openModal: false, items: [], item: '',
             subitems: [], subitem: '', openModifyModal: false,productoSeleccionado:null
        };
        this.props = props;
    }
    componentDidMount = () => {
        this.setState({ loading: true });
        this.getProducts();
        this.getRubros();
        this.getSubrubros();
    }

    getProducts = () => {
        fetch('/TPOSpring/allProductos')
            .then(response => { return response.json(); })
            .then(response => {
                if (response.estado === true) {
                    this.setState({ productos: JSON.parse(response.datos), rows: JSON.parse(response.datos) });
                } else {
                    this.setState({ message: response.mensaje, open: true });
                }
                this.setState({ loading: false });
            });
    }

    getRubros = () => {
        fetch('/TPOSpring/allRubros')
            .then(response => { return response.json() })
            .then(response => {
                if (response.estado === true) {
                    this.setState({ items: JSON.parse(response.datos) });
                }
            });
    }

    getSubrubros = () => {
        fetch('/TPOSpring/allSubRubros')
            .then(response => { return response.json() })
            .then(response => {
                if (response.estado === true) {
                    this.setState({ subitems: JSON.parse(response.datos) });
                }
            });
    }

    onDelete = (id, index) => {
        fetch('/TPOSpring/productos/eliminar?idProducto=' + id, { method: "POST" })
            .then(response => { return response.json(); })
            .then(response => {
                if (response.estado === true) {
                    let prods = this.state.productos.filter(prod => prod.identificador !== id);
                    this.setState({ productos: prods });
                }
                this.setState({ message: response.mensaje, open: true });
            });
    }

    onModify = (id) => {
         this.setState({ openModifyModal: true,productoSeleccionado:id });
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleModalClose = (value) => {
        if (value instanceof String && value !== '') {
            this.setState({ message: value, open: true });
            this.getProducts();
        }
        this.setState({ openModal: false });
    };
    handleModifyModalClose = (value) => {
        if (value instanceof String && value !== '') {
            this.setState({ message: value, open: true });
            this.getProducts();
        }
        this.setState({ openModifyModal: false });
    };

    handleFilter = name => event => {
        this.setState({ [name]: event.target.value });
        if (name === "item") {
            this.filterProductsByItem(event.target.value);
            this.setState({ subitem: '' });
        }
        if (name === "subitem") {
            this.filterProductsBySubItem(event.target.value);
            this.setState({ item: '' });
        }
    };

    filterProductsByItem = (item) => {
        fetch('/TPOSpring/allProductosByRubro?codigo=' + item)
            .then(response => { return response.json() })
            .then(response => {
                if (response.estado === true) {
                    this.setState({ productos: JSON.parse(response.datos) });
                }
            });
    }

    filterProductsBySubItem = (subitem) => {
        fetch('/TPOSpring/allProductosBySubRubro?codigo=' + subitem)
            .then(response => { return response.json() })
            .then(response => {
                if (response.estado === true) {
                    this.setState({ productos: JSON.parse(response.datos) });
                }
            });
    }

    onAddNewProduct = () => {
        this.setState({ openModal: true });
    }

    render = () => {
        let { classes } = this.props;
        let { rows, rowsPerPage, page, open } = this.state;
        return (
            <div className={classes.root} >
                <Grid container >
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography className={classes.typography} variant="h5">Productos</Typography>
                            <Fab variant="extended" color="primary" aria-label="Add" className={classes.addFab} onClickCapture={this.onAddNewProduct.bind(this)}>
                                <AddIcon className={classes.extendedIcon} />
                                Nuevo producto</Fab>
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.openModal}
                                onClose={this.handleModalClose.bind(this, "")}
                            ><ProductForm closeModal={this.handleModalClose} /></Modal>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.tableCell}>ID</TableCell>
                                        <TableCell className={classes.tableCell}>Nombre</TableCell>
                                        <TableCell className={classes.tableCell}>Marca</TableCell>
                                        <TableCell className={classes.tableCell}>Código de barras</TableCell>
                                        <TableCell className={classes.tableCell}>Precio</TableCell>
                                        <TableCell className={classes.tableCell}>Rubro</TableCell>
                                        <TableCell className={classes.tableCell}>SubRubro</TableCell>
                                        <TableCell className={classes.tableCell}></TableCell>
                                        <TableCell className={classes.tableCell}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.loading ?
                                        <TableRow>
                                            <TableCell colSpan={8} align="center">
                                                <CircularProgress align="center" className={classes.progress} />
                                            </TableCell>
                                        </TableRow> :
                                        this.state.productos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((producto, index) => (
                                            <TableRow key={producto.identificador}>
                                                <Modal
                                                    aria-labelledby="simple-modal-title"
                                                    aria-describedby="simple-modal-description"
                                                    open={this.state.openModifyModal}
                                                    onClose={this.handleModifyModalClose.bind(this, "")}
                                                ><ProductPriceForm id={this.state.productoSeleccionado} closeModal={this.handleModifyModalClose} /></Modal>
                                                <TableCell className={classes.tableCell}>
                                                    {producto.identificador}
                                                </TableCell>
                                                <TableCell className={classes.tableCell}>{producto.nombre}</TableCell>
                                                <TableCell className={classes.tableCell}>{producto.marca}</TableCell>
                                                <TableCell className={classes.tableCell}>{producto.codigoBarras}</TableCell>
                                                <TableCell className={classes.tableCell}>{producto.precio}</TableCell>
                                                <TableCell className={classes.tableCell}>{producto.rubro.descripcion}</TableCell>
                                                <TableCell className={classes.tableCell}>{producto.subRubro.descripcion}</TableCell>
                                                <TableCell className={classes.tableCell}><Button variant="contained" color="secondary" className="button" onClickCapture={this.onDelete.bind(this, producto.identificador, index)}>
                                                    Eliminar        <DeleteIcon />
                                                </Button></TableCell>
                                                <TableCell className={classes.tableCell}><Button variant="contained" color="primary" className="button" onClickCapture={this.onModify.bind(this, producto.identificador
                                                )}>
                                                    Editar        <Edit />
                                                </Button></TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25]}
                                            colSpan={3}
                                            count={rows.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            onChangePage={this.handleChangePage}
                                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        />
                                        <TableCell colSpan={3}>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <InputLabel htmlFor="item">Filtrar por rubro</InputLabel>
                                                <Select
                                                    id="item"
                                                    value={this.state.item}
                                                    onChange={this.handleFilter("item")}
                                                    name="item">
                                                    <MenuItem value="" disabled>
                                                        Rubro          </MenuItem>
                                                    {this.state.items.map(option => (
                                                        <MenuItem key={option.codigo} value={option.codigo}>
                                                            {option.descripcion}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell colSpan={3}>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <InputLabel htmlFor="subitem">Filtrar por subrubro</InputLabel>
                                                <Select
                                                    id="subitem"
                                                    value={this.state.subitem}
                                                    onChange={this.handleFilter("subitem")}
                                                    name="subitem">
                                                    <MenuItem value="" disabled>
                                                        SubRubro          </MenuItem>
                                                    {this.state.subitems.map(option => (
                                                        <MenuItem key={option.codigo} value={option.codigo}>
                                                            {option.descripcion}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
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

export default withStyles(styles)(ProductosScreen)
