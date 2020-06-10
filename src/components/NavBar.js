import React, { Component } from 'react';
import SideBar from './SideBar'
import NavBarContent from './NavBarContent'

import { withStyles } from '@material-ui/core/styles';

class NavBar extends Component {

  handleDrawerOpen() {
    this.setState({ open: true })
  }

  handleDrawerClose() {
    this.setState({ open: false })
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <NavBarContent
          open={this.state.open}
          account={this.props.account}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <SideBar
          open={this.state.open}
          handleDrawerClose={this.handleDrawerClose}
        />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
  },
});

export default withStyles(styles)(NavBar);
