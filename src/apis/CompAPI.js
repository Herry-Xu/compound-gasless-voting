export async function fetchGovProposalsEvents() {
  let requestParameters = {
    //"proposal_ids" [23, 25] List of ids to filter on
    // "state": ["pending", "active"], //"pending", "active", "canceled", "defeated", "succeeded", "queued", "expired", "executed"
    "with_detail": false, // Default false, to include proposer and action data
    "page_size": 100,
    "page_number": 1,
    "network": "mainnet",
  }

  requestParameters = '?' + new URLSearchParams(requestParameters).toString();

  const response = await fetch(`https://api.compound.finance/api/v2/governance/proposals${requestParameters}`)
  const result = await response.json()

  let proposals = result.proposals

  return proposals
}

export async function fetchGovProposalRecieptsEvents() {
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

export async function fetchGovAccountsEvents() {
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