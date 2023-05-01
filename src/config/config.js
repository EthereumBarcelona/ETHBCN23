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
        ticketContractAddress: "0xc655BeE055E1F1caAA3ECbadA72d4987932377ED",
        usdcAddress: "0x66E1DFa5685546a559596Fc2295c82B95f3fDF02",
        explorerUrl: "https://sepolia.etherscan.io",
      };
