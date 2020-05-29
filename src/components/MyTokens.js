import React, { Component } from 'react';

class MyTokens extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <button
          onClick={(event) => {
            this.props.initBalance();
          }}>
          Initialize COMP Balance
      </button>
        <div>
          <p>Number of Comp Tokens I Own: {this.props.empTokens}</p><br />
          <p>Number of Votes I Have: {this.props.empVotes}</p>
        </div>
      </div>
    )
  }
}

export default MyTokens