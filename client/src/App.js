import React, { Component } from "react";
import GamerTag from "./contracts/GamerTag.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { tag: "", nickname: "", web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = GamerTag.networks[networkId];
      const gamerTag = new web3.eth.Contract(GamerTag.abi, deployedNetwork && deployedNetwork.address);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, gamerTag }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert("Failed to load web3, accounts, or contract. Check console for details.");
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, gamerTag } = this.state;

    // Stores a given value, 5 by default.
    const tag = await gamerTag.methods.getTag(accounts[0]).call();
    const nickname = await gamerTag.methods.getNickname(accounts[0]).call();

    // Update state with the result.
    this.setState({ tag, nickname });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Gamer Tag</h1>
        <div>Your GamerTag: {this.state.gamerTag}</div>
        <div>Your nickname: {this.state.nickname}</div>
      </div>
    );
  }
}

export default App;
