import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import merge from "lodash.merge";
import "./WalletConnect.css";
import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  Theme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [mainnet, optimism],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "ETH Barcelona 2023",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});


const WalletConnect = () => {
  return (
    <div>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
        <ConnectButton className="custom-connect-button" />
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
};

export default WalletConnect;
