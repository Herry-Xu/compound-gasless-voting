import React, { Component } from 'react'

class OrganizationItem extends Component {

  render() {
    return (
      <div>
        <img src={require(`../images/${this.props.name}.png`)} alt="logo" width="144" height="144" />
        <p>Ethreum Public Address {this.props.address}</p>
        <h5><b>{this.props.name}</b></h5>
        <code>Number of Votes: {this.props.votes || 0}</code><br />
        <button
          className="btn btn-dark"
          onClick={(event) => {
            this.props.delegateVotes(this.props.name, this.props.address)
          }}>
          Delegate
        </button>
      </div>
    )
  }
}

export default OrganizationItem