import { sepolia, mainnet } from "wagmi";

export const getConfig =
  process.env.REACT_APP_NETWORK === "mainnet"
    ? {
        network: mainnet,
        alchemyKey: process.env.REACT_APP_ALCHEMY_API_KEY,
        alchemyUrl: `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
        ticketContractAddress: "0x6052ed5C646574D12c27E8D219C49C3394598b00",
        usdcAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        explorerUrl: "https://etherscan.io",
        waveNum: 1,
      }
    : {
        network: sepolia,
        alchemyKey: process.env.REACT_APP_ALCHEMY_API_KEY,
        alchemyUrl: `https://eth-sepolia.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
        ticketContractAddress: "0x7f45a4812BeC3Ce048196c87c71Ea54196DD41DF",
        usdcAddress: "0xBe473174D3913A13Ce80C157e685b994ad1c17C8",
        explorerUrl: "https://sepolia.etherscan.io",
        waveNum: 0,
      };
