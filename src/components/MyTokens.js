import React, { Component } from 'react';

class MyTokens extends Component {

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
        </div>
      </div>
    )
  }
}

export default MyTokens