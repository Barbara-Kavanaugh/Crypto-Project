import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { publicProvider } from 'wagmi/providers/public';
import { goerli } from 'wagmi/chains';
import { 
  configureChains,
  createClient,
  WagmiConfig
} from 'wagmi';

const { chains, provider }= configureChains(
  [goerli],
  [publicProvider()]
);

const { connectors }= getDefaultWallets({
  appName: 'casino',
  goerli
});

const wagmiClient= createClient({
  autoConnect: true,
  connectors,
  provider
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WagmiConfig client={wagmiClient}>
    <App chains={chains} provider={provider} />
  </WagmiConfig>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
