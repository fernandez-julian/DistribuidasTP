import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Twitter from '../twitter.svg';
import Facebook from '../facebook.svg';
import Instagram from '../instagram.svg';


let useStyles = makeStyles(theme => ({

  root: {
    flexGrow: 1,
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));


function NavBar() {

  let classes = useStyles();
  return (

    <nav>
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>

            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={{ flex: 1 }}>
              <Link to="/home"><Button variant="contained" color="secundary" >Inicio</Button></Link>
            </Typography>
            <Button ><img src={Twitter} className={classes.icon} alt="Twitter" /></Button>
            <Button><img src={Facebook} className={classes.icon} alt="Facebook" /></Button>
            <Button><img src={Instagram} className={classes.icon} alt="Instagram" /></Button>

          </Toolbar>
        </AppBar>

      </div>
    </nav>
  );
}

export default NavBar;