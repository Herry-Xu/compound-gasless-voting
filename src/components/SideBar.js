import React, { Component } from 'react';
import { IconButton, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import VoteIcon from '@material-ui/icons/RecordVoiceOver';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link } from 'react-router-dom';

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

class SideBar extends Component {

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        {/* Drawer of list items */}
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.props.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.props.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {/* Separate List Link Elements as well */}
            <ListItemLink to="/vote" primary="Vote" icon={<VoteIcon />} />
            <ListItemLink to="/proposals" primary="Proposals" icon={<DescriptionIcon />} />
          </List>
        </Drawer>
      </React.Fragment>
    );
  }
}

const drawerWidth = 240;

const styles = theme => ({
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
});

export default withStyles(styles)(SideBar);