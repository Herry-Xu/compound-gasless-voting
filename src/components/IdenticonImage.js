import React, { Component } from 'react';
import Identicon from 'identicon.js';

import { withStyles } from '@material-ui/core/styles';

class IdenticonImage extends Component {

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <img
          className={classes.cardMedia}
          src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
          alt=""
        />
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  cardMedia: {
    display: 'inline-block',
    width: 30,
    height: 30,
  },
});

export default withStyles(styles)(IdenticonImage);
