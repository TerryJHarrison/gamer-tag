# gamer-tag dApp

One-time, one-per-address, unique claimable gamer tags built and living on the blockchain. Once claimed, they can not be transferred.
Updatable nickname linked to each tag that players can optionally use to change their in-game display names whenever they want.

### Path to Decentralization
This application is designed to be a public good owned by no one and requiring no maintenance or support to stay available. 
Below is our roadmap to make sure that it remains that way for all-time. 
```mermaid
flowchart LR
	A{"<h1>Contracts deployed</h1><h2>No proxies, immutable contract. No contract owner</h2><h2>Once deployed the contract becomes a public good.</h2>"}
	B{"<h1>Website deployed on centralized architecture</h1><h2>Via Namecheap and AWS at gamer-tag.xyz.</h2><h2>Quick and easy - work out the site's kinks in this phase before deploying the permanent front-end.</h2>"}
	C{"<h1>Website deployed on IPFS</h1><h2>This will replace AWS from the centralized architecture.</h2>"}
	D{"<h1>Permanent domain registered<h1> <h2>At gamer-tag.blockchain through Unstoppable Domains.</h2><h2>Unstoppable offers permanent (buy once, own forever) domains whose ownership is controlled via NFTs.</h2><h2>This will replace Namecheap from the centralized architecture. Once configured, the decentralized architecutre will be fully available for use.</h2>"}
	E{"<h1>Ownership of the gamer-tag.blockchain domain transferred to the smart contract</h1><h2>This will ensure no further changes to the front-end of the application.</h2><h2>Once transferred the website becomes a public good.</h2>"}
	A --> B
	C --> D --> E 
	
	style A text-size:22px;
```

- [Contract Interface - IGamerTag](contracts/IGamerTag.sol)
- [Client Overview](client/README.md)

### Contracts currently deployed on:
- [Mumbai Testnet](https://mumbai.polygonscan.com/address/TODO)
- [Polygon](https://polygonscan.com/address/TODO)

### Tools used:
- [OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/)
- [Truffle](https://trufflesuite.com/)
- [Mermaid markdown charts](https://mermaid-js.github.io/mermaid/#/flowchart)