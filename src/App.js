import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import QR from "./pages/qrcode";

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
              {/* <Route
                exact
                path="/redeem/:chainName/:chainId/:tokenId/:ticketId"
                element={<Redeem />}
              />
              <Route
                exact
                path="/tickets/:chainId/:tokenId/:ticketId/qrcode"
                element={<QR />}
              /> */}

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </RainbowKitProvider>
        </WagmiConfig>
      </Router>
    </div>
  );
}

export default App;
