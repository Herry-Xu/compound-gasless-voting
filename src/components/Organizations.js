import React, { Component } from 'react';

class Organizations extends Component {

  async componentDidMount() {
    // await this.setOrganizations()
  }

  async setOrganizations() {
    console.log("Org Addresses:", this.props.orgAddresses)
    let keys = Object.keys(this.state.orgs);
    for (var i = 0; i < keys.length; i++) {
      this.state.orgs[keys[i]]['address'] = this.props.orgAddresses[i]
    }

    console.log(this.state.orgs)

    // for (var key in orgs){
    //   console.log(key);
    //   orgs[key]['address'] = this.prop
    // }
  }

  constructor(props) {
    super(props)
    this.state = {
      orgs: {
        'Apple': { 'address': '', 'logo': 'apple.jpg' },
        'Amazon': { 'address': '', 'logo': 'amazon.jpg' },
        'Ethereum': { 'address': '', 'logo': 'compound.jpg' }
      }
    }
  }

  render() {
    return (
      <div>
        <button
          onChange={(event) => {
            this.setOrganizations()
          }}>
          Set Org
        </button>
        Organizations:
        {this.state.orgs['Amazon']['address']}
        {this.state.orgs['Amazon']['logo']}
      </div>
    )
  }
}

export default Organizations