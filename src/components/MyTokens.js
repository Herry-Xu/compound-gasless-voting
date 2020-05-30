import React, { Component } from 'react';

class MyTokens extends Component {

  // componentDidUpdate(prevProps) {
  //   if (prevProps.empTokens !== this.props.empTokens) {
  //     this.setState({ empTokens: this.props.empTokens })
  //   }
  //   if (prevProps.empVotes !== this.props.empVotes) {
  //     this.setState({ empVotes: this.props.empVotes })
  //   }
  // }

  constructor(props) {
    super(props)
    // this.state = {
    //   empTokens: this.props.empTokens,
    //   empVotes: this.props.empVotes,
    // }
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