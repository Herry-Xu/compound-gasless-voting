import React, { Component } from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles';


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
          <Typography gutterBottom variant="h5">
            <u>{this.props.name}</u>
          </Typography>
          <Typography noWrap variant="body2" color="textSecondary">
            Public Address:
            <br />
            {this.props.address}
          </Typography>
          <Typography>
            Number of Votes: {this.props.votes || 0}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="outlined" color="secondary"
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

const styles = theme => ({
  root: {
    maxWidth: 500,
  },
  cardMedia: {
    height: 0,
    paddingTop: '100%',
  },
  cardContent: {
    flexGrow: 1,
    textAlign: 'left',
  },
});

export default withStyles(styles)(OrganizationItem)