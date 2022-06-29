import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import '@rainbow-me/rainbowkit/dist/index.css';
import {
  getDefaultWallets,
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

const {connectors} = getDefaultWallets({
  appName: '#gamer-tag',
  chains
});
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
