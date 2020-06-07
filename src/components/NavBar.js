import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Icon, CardMedia } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import MailIcon from '@material-ui/icons/Mail';
import Identicon from 'identicon.js';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  parent: {

  },
  cardText: {
    display: 'inline-block',
    marginRight: '10px',
  },
  cardMedia: {
    display: 'inline-block',
    width: '30px',
    height: '30px',
  },
});

class NavBar extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="relative">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            VotersVote
          </Typography>
          <div className={classes.grow}></div>
          {this.props.account ?
            <div className={classes.parent}>
              <Typography className={classes.cardText} variant="subtitle2">
                My ETH Address: {this.props.account}
              </Typography>
              <img
                className={classes.cardMedia}
                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                alt=""
              />
            </div> : <p></p>
          }
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(NavBar);
