import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import { Typography, Paper, Button, FormControl, InputLabel, Input, Grid } from '@material-ui/core';

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
  typography: {
    color: 'black',
  }
});


class ProductPriceForm extends React.Component {

  state = {
    price: '',
    helperText: '',
  }

  onSubmit = event => {
    event.preventDefault();
    if (!this.state.price) {
      this.setState({ helperText: "*Campo requerido" });
    } else {
      fetch('/TPOSpring/productos/modificar?idProducto=' + this.props.id + '&precio=' + this.state.price, { method: "POST" })
        .then(response => { return response.json(); })
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

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render = () => {
    let { classes } = this.props;
    return (
      <div>
        <Paper className={classes.paper}>
          <Typography className={classes.typography} variant="h5">Nuevo precio</Typography>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.onSubmit.bind(this)}>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel htmlFor="price">Precio</InputLabel>
                  <Input
                    id="price"
                    type="number"
                    value={this.state.price}
                    onChange={this.handleChange('price')}
                    error={!this.state.price}
                    inputProps={{ min: "0", max: "100000000", step: "1" }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="error" align="left">{this.state.helperText}</Typography>
              </Grid>
              <Button variant="contained" color="primary" className={classes.button} type="submit" fullWidth>
                Editar</Button>
            </form>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(ProductPriceForm)
