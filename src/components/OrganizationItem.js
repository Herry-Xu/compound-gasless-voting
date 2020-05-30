import React, { Component } from 'react'

class OrganizationItem extends Component {
  render() {
    return (
      <div>
        <img src ={require(`../images/${this.props.name}.png`)} alt="logo" width="144" height="144"/>
        <p>{this.props.address}</p>
        <h3>{this.props.name}</h3>
      </div>
    )
  }
}

export default OrganizationItem