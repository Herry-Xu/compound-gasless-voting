import React, { Component } from 'react'
import clsx from 'clsx'
import { Card, CardContent, CardActions, Typography, Collapse, IconButton, LinearProgress } from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { withStyles } from '@material-ui/core/styles';

class ProposalItem extends Component {

  componentDidMount(){
    let percentage = parseFloat(this.props.forVotes) * 100 / (parseFloat(this.props.forVotes) + parseFloat(this.props.againstVotes))
    this.setState({voteProg: percentage.toFixed()})
  }

  handleExpandClick = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }))
  };

  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      voteProg: 0,
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5">
            <b>{this.props.title}</b>
          </Typography>
          <Typography gutterBottom variant="body1" color="textPrimary">
            Status: {this.props.curState}
          </Typography>
          <LinearProgress variant="determinate" value={Number(this.state.voteProg)} />
          <Typography variant="body1" className={classes.voteProg}>
            Voting Progress: {this.state.voteProg}%
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent className={classes.cardExpContent}>
            <Typography variant="body2">
              {this.props.description}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

const styles = theme => ({
  root: {
    maxWidth: theme.breakpoints.values.lg,
    textAlign: 'left',
  },
  cardMainContent: {
    flexGrow: 1,
  },
  cardExpContent: {
    textAlign: 'justify'
  },
  voteProg: {
    textAlign: 'right'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

export default withStyles(styles)(ProposalItem)