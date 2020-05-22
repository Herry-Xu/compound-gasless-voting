import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
import compoundMain from '../abis/mainnet-abi.json'
import compoundRopsten from '../abis/ropsten-abi.json'

// import { legos } from "@studydefi/money-legos";

class App extends Component {

  async componentDidMount() {
    await this.setup()
    await this.loadContractData()
    // await this.initializeBalance()
    await this.handleEvents()
  }

  async setup() {
    const web3 = new Web3('https://mainnet.infura.io/v3/d9013721413341abba149a225b97a7bd');
    // const web3 = new Web3('https://ropsten.infura.io/v3/d9013721413341abba149a225b97a7bd');
    // const web3 = new Web3('http://127.0.0.1:8545');

    this.setState({ web3 })

    const accounts = await web3.eth.getAccounts();

    const supplier = "0x19bc62ff7cd9ffd6bdced9802ff718f09f7259f1" //Has 5,075,076.31 COMP tokens
    this.setState({ employee: accounts[0], supplier })
    console.log("Accounts: ", this.state.employee)

    const networkId = await web3.eth.net.getId();
    console.log("Net: ", networkId)

    // This app only works with Ropsten or Main
    if (networkId !== 1 && networkId !== 3) {
      alert('Please select the Main or Ropsten network.');
    }

  }

  async loadContractData() {
    const compMainAddress = '0xc00e94Cb662C3520282E6f5717214004A7f26888';
    // const compRopAddress = '0x1Fe16De955718CFAb7A44605458AB023838C2793'

    const comp = new this.state.web3.eth.Contract(compoundMain.Comp, compMainAddress);
    this.setState({ comp })
  }

  async initializeBalance() {
    const compTransferred = '100000000000000000000000'; //100k (10% of token balance)
    let compSupBalance = await this.state.comp.methods.balanceOf(this.state.supplier).call()
    let compEmpBalance = await this.state.comp.methods.balanceOf(this.state.employee).call()

    console.log("Employee: ", compEmpBalance.toString() / 10e17, "Supplier", compSupBalance.toString() / 10e17)

    this.state.comp.methods.transfer(this.state.employee, compTransferred)
      .send({
        from: this.state.supplier,
        gasLimit: this.state.web3.utils.toHex(500000),
        gasPrice: this.state.web3.utils.toHex(20000000000)
      })
      .on('transactionHash', () => {
        console.log("Transferred 100k Comp tokens to employee")
      })

    compSupBalance = await this.state.comp.methods.balanceOf(this.state.supplier).call()
    compEmpBalance = await this.state.comp.methods.balanceOf(this.state.employee).call()

    console.log("Employee: ", compEmpBalance.toString() / 10e17, "Supplier", compSupBalance.toString() / 10e17)
  }

  async handleEvents() {
    const delegations = await this.state.comp.getPastEvents('DelegateVotesChanged', {
      fromBlock: 0,
      toBlock: 'latest'
    })

    // dictionary of {key: accounts, value: votes delegated to the account}
    const delegateAccounts = {};

    // Accounts appear multiple times as delegation changes over time
    delegations.forEach(e => {
      const { delegate, newBalance } = e.returnValues;
      delegateAccounts[delegate] = newBalance;
    });

    const delegates = [];
    Object.keys(delegateAccounts).forEach((account) => {
      const voteWeight = +delegateAccounts[account];
      if (voteWeight === 0) return;
      delegates.push({
        delegate: account,
        vote_weight: voteWeight
      });
    });

    delegates.sort((a, b) => {
      return b.vote_weight - a.vote_weight;
    })

    delegates.forEach(d => {
      d.vote_weight = (100 * ((d.vote_weight / 1e18) / 10000000)).toFixed(6) + '%';
    })

    console.log("All delegates and their voting weights: ", delegates);
  }

  constructor(props) {
    super(props)
    this.state = {
      web3: {},
      comp: {},
      employee: '',
      supplier: '',
    }
  }

  render() {
    return (
      <div className="App">
        <main role="main" className="col-lg-12 d-flex text-center">
          <div className="content mr-auto ml-auto">
            <code>Insert React Elements here</code>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
