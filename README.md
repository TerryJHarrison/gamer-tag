# gamer-tag dApp

One-time, one-per-address, unique claimable gamer tags built and living on the blockchain. Once claimed, they can not be transferred.
Updatable nickname linked to each tag that players can optionally use to change their in-game display names whenever they want.

### Path to Decentralization
This application is designed to be a public good owned by no one and requiring no maintenance or support to stay available. 
Below is our roadmap to make sure that it remains that way for all-time. 
```mermaid
flowchart LR
	A{"Contracts deployed. No proxies, immutable contracts. No contract owner, once deployed the contract becomes a public good."}
	B{"Website deployed on centralized architecture (Namecheap + AWS) at gamer-tag.xyz. Quick and easy - work out the site's kinks in this phase before deploying the permanent front-end."}
	C{"Website deployed on IPFS. This will replace AWS from the centralized architecture."}
	D{"Permanent domain registered (gamer-tag.blockchain) through Unstoppable Domains. Unstoppable offers permanent (buy once, own forever) domains whose ownership is controlled via NFTs. This will replace Namecheap from the centralized architecture. Once configured, the decentralized architecutre will be fully available for use."}
	E{"Ownership of the gamer-tag.blockchain domain transferred to the smart contract. This will ensure no further changes to the front-end of the application. Once transferred the website becomes a public good."}
	A --> B
	C --> D --> E 
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