import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import '@rainbow-me/rainbowkit/dist/index.css';
import {
  connectorsForWallets,
  wallet,
  RainbowKitProvider,
  lightTheme
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import {publicProvider} from 'wagmi/providers/public';
import {SnackbarProvider} from 'notistack';

const {chains, provider, webSocketProvider} = configureChains(
  [chain.polygonMumbai],
  [publicProvider()]
);

const needsInjectedWalletFallback =
  typeof window !== 'undefined' &&
  window.ethereum &&
  !window.ethereum.isMetaMask &&
  !window.ethereum.isCoinbaseWallet;
const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      wallet.argent({chains}),
      wallet.brave({chains}),
      wallet.coinbase({chains, appName: '#gamer-tag'}),
      wallet.ledger({chains}),
      wallet.metaMask({chains}),
      wallet.rainbow({chains}),
      wallet.trust({chains}),
      wallet.walletConnect({chains}),
      ...(needsInjectedWalletFallback
        ? [wallet.injected({chains})]
        : []),
    ]
  },
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider
})

ReactDOM.render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains} theme={lightTheme({
      accentColor: '#1976d2',
      borderRadius: 'small',
      fontStack: 'system',
      overlayBlur: 'small'
    })}>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
          <App/>
        </SnackbarProvider>
      </BrowserRouter>
    </RainbowKitProvider>
  </WagmiConfig>,
  document.getElementById('root')
);
