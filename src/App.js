import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/profile";
import "./App.css";
import Mint from "./pages/mint";
import Redeem from "./pages/redeem";

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
  Theme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { getConfig } from "./config/config";

const { chains, provider } = configureChains(
  [...getConfig.networks],
  [alchemyProvider({ apiKey: getConfig.alchemyKey }), publicProvider()]
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

function App() {
  return (
    <div className="App">
      <Router>
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
            <Routes>
              <Route exact path="/" element={<Profile />} />
              <Route exact path="/mint" element={<Mint />} />
              <Route exact path="/redeem" element={<Redeem />} />
            </Routes>
          </RainbowKitProvider>
        </WagmiConfig>
      </Router>
    </div>
  );
}

export default App;
