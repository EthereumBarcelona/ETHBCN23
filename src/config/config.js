import { sepolia, mainnet } from "wagmi";

export const getConfig =
  process.env.REACT_APP_NETWORK === "mainnet"
    ? {
        network: mainnet,
        alchemyKey: process.env.REACT_APP_ALCHEMY_API_KEY,
        alchemyUrl: `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
        ticketContractAddress: "",
        usdcAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        explorerUrl: "https://etherscan.io",
      }
    : {
        network: sepolia,
        alchemyKey: process.env.REACT_APP_ALCHEMY_API_KEY,
        alchemyUrl: `https://eth-sepolia.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
        ticketContractAddress: "0xB378f24Ccb592B94c148bD1F7Bcb628c37e98058",
        usdcAddress: "0xBe473174D3913A13Ce80C157e685b994ad1c17C8",
        explorerUrl: "https://sepolia.etherscan.io",
      };
