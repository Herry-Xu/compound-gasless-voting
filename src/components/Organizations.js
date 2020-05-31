import React, { Component } from 'react';
import OrganizationItem from './OrganizationItem'

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
    return (
      <ul>
        {this.state.organizations && this.state.organizations.map((org) =>
          <OrganizationItem
            name={org.name}
            address={org.address}
            votes={org.votes}
            delegateVotes={this.props.delegateVotes}
          />
        )}
      </ul>
    )
  }
}

export default Organizations