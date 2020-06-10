import React, { Component } from 'react';
import clsx from 'clsx';
import IdenticonImage from './IdenticonImage';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { withStyles } from '@material-ui/core/styles';

class NavBarContent extends Component {

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <AppBar
          position="relative"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.props.open,
          })}
        >
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.props.handleDrawerOpen}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" >
              VotersVote
          </Typography>
            <div className={classes.grow}></div>
            {this.props.account ?
              <div className={classes.parent}>
                <Typography className={classes.cardText} variant="subtitle2">
                  <b>My ETH Address: </b>{this.props.account}
                </Typography>
                <IdenticonImage
                  account={this.props.account}
                />
              </div> : <span></span>
            }
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  grow: {
    flexGrow: 1,
  },
  cardText: {
    display: 'inline-block',
    marginRight: '10px',
  },
  cardMedia: {
    display: 'inline-block',
    width: 30,
    height: 30,
  },
});

export default withStyles(styles)(NavBarContent);
