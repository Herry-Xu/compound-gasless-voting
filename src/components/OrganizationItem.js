import React, { Component } from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    maxWidth: 345,
  },
  cardMedia: {
    height: 0,
    paddingTop: '100%',
  },
  cardContent: {
    flexGrow: 1,
  },
});

class OrganizationItem extends Component {

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <CardMedia
          className={classes.cardMedia}
          image={require(`../images/${this.props.name}.png`)}
          title={this.props.name}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {this.props.name}
          </Typography>
          <Typography>
            Mainnet Address: {this.props.address}
          </Typography>
          <Typography>
            Number of Votes: {this.props.votes || 0}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" color="primary"
            onClick={(event) => {
              this.props.delegateVotes(this.props.name, this.props.address)
            }}
          >
            Delegate
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(OrganizationItem)