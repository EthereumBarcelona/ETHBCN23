import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import merge from "lodash.merge";
import "./WalletConnect.css";
import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
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
        <RainbowKitProvider
          coolMode
          chains={chains}
          theme={lightTheme({
            accentColor: "#E5DCD0",
            accentColorForeground: "#BC563B",
            connectButtonBackground: "#BC563B",
            connectButtonInnerBackground: "#BC563B",
            connectButtonText: "#BC563B",
            generalBorder: "#BC563B",
            modalBackground: "#BC563B",
          })}
        >
          <ConnectButton
            chainStatus="none"
            showBalance={{
              smallScreen: false,
              largeScreen: false,
            }}
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          />
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
};

export default WalletConnect;
