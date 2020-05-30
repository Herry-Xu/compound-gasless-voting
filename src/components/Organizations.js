import React, { Component } from 'react';
import OrganizationItem from './OrganizationItem'

class Organizations extends Component {

  async componentDidUpdate(prevProps) {
    if (prevProps.orgAddresses !== this.props.orgAddresses) {
      await this.setState({ orgAddresses: this.props.orgAddresses })
      this.setOrganizations()
    }
  }

  async setOrganizations() {
    const organizations = [
      { name: 'Apple', address: '' },
      { name: 'Amazon', address: '' },
      { name: 'Ethereum', address: '' },
    ]
    organizations.forEach((comp, index) => {
      comp['address'] = this.state.orgAddresses[index]
    })
    this.setState({ organizations })
  }

  constructor(props) {
    super(props)
    this.state = {
      orgAddresses: this.props.orgAddresses,
      organizations: [],
    }
  }

  render() {
    return (
      <ul>
        {this.state.organizations && this.state.organizations.map((org) => {
          return <OrganizationItem
            name = {org.name}
            address = {org.address}
          />
        })}
      </ul>
    )
  }
}

export default Organizations