import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import "./WalletConnect.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const WalletConnect = () => {
  return (
    <div>
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
    </div>
  );
};

export default WalletConnect;
