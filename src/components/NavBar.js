import React, { Component } from 'react';
import { AppBar, Toolbar, Container, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'

import { withStyles } from '@material-ui/core/styles';

// const styles = theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// });

class NavBar extends Component {

  render() {
    // const { classes } = this.props;
    return (
      <AppBar position="relative">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            VotersVote
            </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;
