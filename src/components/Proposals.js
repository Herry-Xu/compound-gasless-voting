import React, { Component } from 'react';
import * as compAPI from '../apis/CompAPI';
import ProposalItem from './ProposalItem'
import { Container, Grid } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

class Proposals extends Component {

  async componentDidMount() {
    const proposals = await compAPI.fetchGovProposalsEvents()
    this.setState({ proposals })
  }

  constructor(props) {
    super(props)
    this.state = {
      proposals: []
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.cardGrid}>
        <Grid container spacing={4}>
          {this.state.proposals && this.state.proposals.map((proposal) =>
            <Grid item key={proposal.id} xs={12} md={6}>
              <ProposalItem
                id={proposal.id}
                title={proposal.title}
                description={proposal.description}
                curState={proposal.states[proposal.states.length - 1].state}
                forVotes={proposal.for_votes}
                againstVotes={proposal.against_votes}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    )
  }
}

const styles = theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
});

export default withStyles(styles)(Proposals)