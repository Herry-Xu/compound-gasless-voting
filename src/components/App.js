import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
import compoundMain from '../abis/mainnet-abi.json'
import compoundRopsten from '../abis/ropsten-abi.json'
import Verification from '../abis/Verification.json'
import MyContract from '../abis/MyContract.json'
import MyTokens from './MyTokens'
import Organizations from './Organizations'
import NavBar from './NavBar'

// import { legos } from "@studydefi/money-legos";

class App extends Component {

  async componentDidMount() {
    await this.setup()
    await this.loadContractData()
    // await this.fetchGovAccountsEvents()
    // await this.fetchGovProposalsEvents()
    // await this.fetchGovProposalRecieptsEvents()
    // await this.testSig()
    await this.updateCompBalance(this.state.empAddress)
    // await this.testGovern()
    // await this.validateSig()
  }

  async setup() {
    // const web3 = new Web3('https://mainnet.infura.io/v3/d9013721413341abba149a225b97a7bd');
    // const web3 = new Web3('https://ropsten.infura.io/v3/d9013721413341abba149a225b97a7bd');
    const web3 = new Web3('http://127.0.0.1:8545');
    // const web3 = new Web3(window.ethereum);
    // await window.ethereum.enable()
    this.setState({ web3 })

    const accounts = await web3.eth.getAccounts();

    const supAddress = "0x19bc62ff7cd9ffd6bdced9802ff718f09f7259f1" //Has 5,075,076.31 COMP tokens
    this.setState({ empAddress: accounts[0], supAddress, orgAddresses: accounts.slice(1, 11) })
    console.log("Accounts:", this.state.orgAddresses)

    const networkId = await web3.eth.net.getId();

    // This app only works with Ropsten or Main
    if (networkId !== 1 && networkId !== 3) {
      alert('Please select the Main or Ropsten network.');
    }
  }

  async loadContractData() {
    const compMainAddress = '0xc00e94Cb662C3520282E6f5717214004A7f26888';
    // const compRopAddress = '0x1Fe16De955718CFAb7A44605458AB023838C2793'
    const mainnetId = '1'

    const verificationData = Verification.networks[mainnetId]
    const myContractData = MyContract.networks[mainnetId]

    const comp = new this.state.web3.eth.Contract(compoundMain.Comp, compMainAddress);
    const verify = new this.state.web3.eth.Contract(Verification.abi, verificationData.address)
    const mycontract = new this.state.web3.eth.Contract(MyContract.abi, myContractData.address)

    this.setState({ comp, verify, mycontract })
  }

  async initBalance() {
    const compTransferred = '100000000000000000000000'; //100k (10% of token compBalance)
    let compSupBalance = await this.state.comp.methods.balanceOf(this.state.supAddress).call()
    let compEmpBalance = await this.state.comp.methods.balanceOf(this.state.empAddress).call()

    console.log("empAddress: ", compEmpBalance.toString() / 1e18, "SupAddress", compSupBalance.toString() / 1e18)

    this.state.comp.methods.transfer(this.state.empAddress, compTransferred)
      .send({
        from: this.state.supAddress,
        gasLimit: this.state.web3.utils.toHex(500000),
        gasPrice: this.state.web3.utils.toHex(20000000000)
      })
      .on('transactionHash', () => {
        console.log("Transferred 100k Comp tokens to empAddress")
      })
    await this.updateCompBalance(this.state.empAddress)
    // await this.getBalance(this.state.supAddress)
    // await this.getBalance(this.state.empAddress)
  }

  async updateCompBalance(address) {
    const compBalance = await this.state.comp.methods.balanceOf(address).call()
    // console.log("COMP Balance of account:", address, 'is:', compBalance.toString() / 1e18)
    this.setState({ empTokens: (compBalance.toString() / 1e18).toFixed(2) })
  }

  async updateEthBalance(address) {
    const ethBalance = await this.state.web3.eth.getBalance(address)
    // console.log("ETHER Balance of account:", address, 'is:', this.state.web3.utils.fromWei(ethBalance, 'ether'))
    // this.setState({ ethBalance : this.state.web3.utils.fromWei(ethBalance, 'ether') })
  }

  //Can't be used with fork because event data is gone
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

  //TODO: Separate fetches in another file
  async fetchGovAccountsEvents() {
    let requestParameters = {
      "page_size": 150,            // number of results in a page
      "network": "mainnet",        // mainnet, ropsten
      "order_by": "votes",         // "votes", "compBalance", "proposals_created"
      "page_number": 1,         // see subsequent response's `pagination_summary` to specify the next page
      // addresses: ['0x123'],     // array of addresses to filter on
      // with_history: true,       // boolean, returns a list of transaction history for the accounts
    };

    requestParameters = '?' + new URLSearchParams(requestParameters).toString();

    const response = await fetch(`https://api.compound.finance/api/v2/governance/accounts${requestParameters}`)
    const result = await response.json()

    let accounts = result.accounts;
    let holders = [];
    accounts.forEach((account) => {
      holders.push({
        "address": account.address,
        "compBalance": parseFloat(account.compBalance).toFixed(4),
        "vote_weight": parseFloat(account.vote_weight).toFixed(4) + '%',
        "delegate": account.delegate.address == 0 ? 'None' : account.delegate.address
      });
    });
    console.log("Token holders: ", holders)
  }

  async fetchGovProposalsEvents() {
    let requestParameters = {
      //"proposal_ids" [23, 25] List of ids to filter on
      "state": ["pending", "active"], //"pending", "active", "canceled", "defeated", "succeeded", "queued", "expired", "executed"
      "with_detail": true, // Default false, to include proposer and action data
      "page_size": 100,
      "page_number": 1,
      "network": "mainnet",
    }

    requestParameters = '?' + new URLSearchParams(requestParameters).toString();

    const response = await fetch(`https://api.compound.finance/api/v2/governance/proposals${requestParameters}`)
    const result = await response.json()

    let proposals = result.proposals

    console.log("Proposals:", proposals)
  }

  async fetchGovProposalRecieptsEvents() {
    let requestParameters = {
      "proposal_id": 4, // List of ids to filter on
      //"account": // Filter for proposals receipts for the given account address
      //"support": // Filter for proposals receipts by support votes with True and against votes with false
      "with_proposal_data": true, // Default false, to include a Proposal object
      "page_size": 10,
      "page_number": 1,
      "network": "mainnet",
    }

    requestParameters = '?' + new URLSearchParams(requestParameters).toString();

    const response = await fetch(`https://api.compound.finance/api/v2/governance/proposal_vote_receipts${requestParameters}`)
    const result = await response.json()

    let proposal_receipts = result.proposal_vote_receipts

    console.log("Proposal receipts:", proposal_receipts)
  }

  async getVotes(company, address) {
    const votes = await this.state.comp.methods.getCurrentVotes(address).call()
    this.setState({ orgVotes: { [company]: (votes.toString() / 1e18).toFixed(2) } })
  }

  async delegateVotes(company, address) {
    // await this.getBalance(this.state.empAddress)
    this.state.comp.methods.delegate(address)
      .send({ from: this.state.empAddress })
      .on('transactionHash', (hash) => {
        this.getVotes(company, address)
      })
    // await this.getBalance(this.state.empAddress)
  }

  async testSig() {
    const message = this.state.web3.utils.sha3("testing")
    await this.state.web3.eth.sign(message, this.state.empAddress, (err, result) => {
      if (err) {
        console.log("Error:", err)
      }
      else {
        this.setState({ signature: result, hashedMsg: message })
      }
    })
    console.log("Signature:", this.state.signature, "Hashed Msg:", this.state.hashedMsg)
  }

  async validateSig() {
    this.state.verify.methods.recover(this.state.hashedMsg, this.state.signature).call().then(function (result) {
      console.log('Recover', result)
    })
    console.log("Account", this.state.empAddress)
    // console.log("Validation results:", res.toString())
  }

  async testGovern() {
    const nonce = await this.state.web3.eth.getTransactionCount(this.state.empAddress);
    console.log("Nonce:", nonce)

    const expiry = 1896912000

    await this.state.mycontract.methods.decompose(this.state.empAddress, nonce, expiry, this.state.signature).call()

    console.log("sad")

    // const tx = await this.state.comp.methods.delegateBySig(this.state.supAddress, 1896912000, number2, v, r, s).send({
    //   from: this.state.empAddress,
    //   gasLimit: this.state.web3.utils.toHex(600000),
    //   gasPrice: this.state.web3.utils.toHex(20000000000),
    //   chainId: 1
    // })
  }

  async getCompoundNonces() {
  }

  constructor(props) {
    super(props)
    this.state = {
      web3: {},
      comp: {},
      verify: {},
      mycontract: {},
      empAddress: '',
      supAddress: '',
      orgAddresses: [],
      orgVotes: {},

      empTokens: 0,
      empVotes: 0,

      signature: '',
      hashedMsg: '',

    }
    this.initBalance = this.initBalance.bind(this);
    this.delegateVotes = this.delegateVotes.bind(this);
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="App">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <MyTokens
                initBalance={this.initBalance}
                empTokens={this.state.empTokens}
                empVotes={this.state.empVotes}
              />
              <Organizations
                orgAddresses={this.state.orgAddresses}
                orgVotes={this.state.orgVotes}
                delegateVotes={this.delegateVotes}
              />
            </div>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
