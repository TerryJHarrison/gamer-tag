# gamer-tag dApp

One-time, one-per-address, unique claimable gamer tags built and living on the blockchain. Once claimed, they can not be transferred.
Updatable nickname linked to each tag that players can optionally use to change their in-game display names whenever they want.

### Path to Decentralization
This application is designed to be a public good owned by no one and requiring no maintenance or support to stay available. 
See the roadmap below to make sure that it remains that way for all-time. 
```mermaid
flowchart TD
	testContract["Contract deployed on testnet (DONE)"]
	centralizedWeb["Website deployed on centralized architecture (DONE)"]
	centralizedTestSite["Test site deployed (DONE)<br/>Centralized frontend with decentralized backend<br/><b>gamer-tag.xyz</b>"]
	contract["Contracts deployed on Polygon"]
	decentralizedWeb["Website deployed on IPFS"]
	permanentDomain["Permanent domain registered (DONE)"]
	noDomainOwner["Ownership of the gamer-tag.blockchain domain transferred to the smart contract"]
	decentralizedApplication["Fully decntralized public good<br/><b>gamer-tag.blockchain</b>"]
	
	testContract --> centralizedTestSite
	contract --> centralizedTestSite
	centralizedWeb --> centralizedTestSite
	
	testContract --> decentralizedWeb
	contract --> decentralizedWeb
	decentralizedWeb --> permanentDomain --> noDomainOwner
	
	testContract --> decentralizedApplication
	contract --> decentralizedApplication
	decentralizedWeb --> decentralizedApplication
	permanentDomain --> decentralizedApplication
	noDomainOwner --> decentralizedApplication
	
	style testContract fill:#42b983
	style centralizedWeb fill:#42b983
	style centralizedTestSite fill:#42b983
	style permanentDomain fill:#42b983
```
- No proxies, immutable contract. 
- No contract owner.
- Permanent domain registered through Unstoppable Domains.
- Website hosted on IPFS. 
- Domain ownership transferred to the smart contract.

- [Contract Interface - IGamerTag](contracts/IGamerTag.sol)
- [Client Overview](client/README.md)

### Contracts currently deployed on:
- [Mumbai Testnet](https://mumbai.polygonscan.com/address/0x580d9b3f016b9759db279381877bf69e9dac22e1)
- Polygon - Coming soon...

### Tools used:
- [OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/)
- [Truffle](https://trufflesuite.com/)
- [Mermaid markdown charts](https://mermaid-js.github.io/mermaid/#/flowchart)