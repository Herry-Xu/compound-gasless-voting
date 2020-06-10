import React, { Component } from 'react';
import clsx from 'clsx';
import { AppBar, Toolbar, Typography, IconButton, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Icon } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import DescriptionIcon from '@material-ui/icons/Description';
import VoteIcon from '@material-ui/icons/RecordVoiceOver';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { Link, BrowserRouter } from 'react-router-dom';

import Identicon from 'identicon.js';

import { withStyles } from '@material-ui/core/styles';

function ListItemLink(props) {
  const { icon, primary, to } = props
  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <Link to={to} ref={ref} {...itemProps} />),
    [to],
    )

  return (
    <ListItem button component={renderLink}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItem>
  )
}

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
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
        <AppBar
          position="relative"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.handleDrawerOpen}>
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
                <img
                  className={classes.cardMedia}
                  src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                  alt=""
                />
              </div> : <p></p>
            }
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.state.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
            <List>
              <ListItemLink to="/vote" primary="Vote" icon={<VoteIcon />} />
              <ListItemLink to="/proposals" primary="Proposals" icon={<DescriptionIcon />} />
              {/* <ListItem button>
                <ListItemIcon >
                  <VoteIcon color="primary"/>
                </ListItemIcon >
                <ListItemText primary="Vote"/>
              </ListItem> */}
              {/* <ListItem button>
                <ListItemIcon>
                  <DescriptionIcon color="primary"/>
                </ListItemIcon>
                <ListItemText primary="Proposals" />
              </ListItem> */}
            </List>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
