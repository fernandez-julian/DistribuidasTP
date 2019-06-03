import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import BarChartIcon from '@material-ui/icons/BarChart';
import { Link } from "react-router-dom";


export let mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon style={{ marginRight: '26px', marginLeft: '8px' }}>
        <DashboardIcon />
      </ListItemIcon><Link to="/">
        <ListItemText primary="Inicio" /></Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon style={{ marginRight: '26px', marginLeft: '8px' }}>
        <ShoppingCartIcon />
      </ListItemIcon><Link to="/pedidos/">
        <ListItemText primary="Pedidos" /></Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon style={{ marginRight: '26px', marginLeft: '8px' }}>
        <BarChartIcon />
      </ListItemIcon><Link to="/productos/"> <ListItemText primary="Productos" /></Link>
    </ListItem>
  </div>
);
