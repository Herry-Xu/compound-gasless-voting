import React, { Component } from 'react';
import OrganizationItem from './OrganizationItem'
import { Container, Grid } from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
});

class Organizations extends Component {

  async componentDidUpdate(prevProps) {
    if (prevProps.orgAddresses !== this.props.orgAddresses) {
      await this.setState({ orgAddresses: this.props.orgAddresses })
      this.setOrganizations()
    }
    if (prevProps.orgVotes !== this.props.orgVotes) {
      await this.setState({ orgVotes: this.props.orgVotes })
      this.setOrganizations()
    }
  }

  async setOrganizations() {
    const organizations = [
      { name: 'Apple', address: '', votes: 0 },
      { name: 'Amazon', address: '', votes: 0 },
      { name: 'Ethereum', address: '', votes: 0 },
    ]
    organizations.forEach((comp, index) => {
      comp['address'] = this.state.orgAddresses[index]
    })
    //Todo: Refactor
    if (this.state.orgVotes) {
      organizations.forEach((comp) => {
        const name = comp['name']
        comp['votes'] = this.state.orgVotes[name]
      })
    }
    this.setState({ organizations })
  }

  constructor(props) {
    super(props)
    this.state = {
      orgAddresses: [],
      organizations: [],
      orgVotes: {},
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {this.state.organizations && this.state.organizations.map((org) =>
            <Grid item key={org.name} xs={12} sm={6} md={4}>
              <OrganizationItem
                name={org.name}
                address={org.address}
                votes={org.votes}
                delegateVotes={this.props.delegateVotes}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    )
  }
}

export default withStyles(styles)(Organizations)