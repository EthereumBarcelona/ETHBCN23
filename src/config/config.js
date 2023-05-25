import { sepolia, mainnet, optimism, optimismGoerli } from "wagmi/chains";
import ethTicketAbi from "../ethereum/build/TicketAbi.json";
import optimismTicketAbi from "../ethereum/build/optimism/TicketAbi.json";

const waveNum = {
  mainnet: 3,
  testnet: 0,
};

const usdcAddress = {
  mainnet: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  optimism: "",
  sepolia: "0xBe473174D3913A13Ce80C157e685b994ad1c17C8",
  optimismGoerli: "0x93e36D6e7897C332bBe1402a5A34acb234b3af5F",
};

const daiAddress = {
  optimism: "",
  optimismGoerli: "0x4D64AA556b26fcAe24F49B075e676F120401aC29",
};

export const getConfig =
  process.env.REACT_APP_NETWORK === "mainnet"
    ? {
        env: "mainnet",
        networks: [mainnet, optimism],
        alchemyKey: process.env.REACT_APP_ALCHEMY_API_KEY,
        waveNum: waveNum.mainnet,
        /*mainnet*/ 1: {
          network: mainnet,
          alchemyUrl: `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
          ticketContractAddress: "0x6052ed5C646574D12c27E8D219C49C3394598b00",
          usdcAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          explorerUrl: "https://etherscan.io",
          ticketAbi: ethTicketAbi,
          mintArgs: {
            usdc: [waveNum.testnet],
          },
        },
        /*optimism*/ 10: {
          network: optimism,
          alchemyUrl: `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
          ticketContractAddress: "",
          usdcAddress: "",
          daiAddress: "",
          explorerUrl: "https://etherscan.io",
          ticketAbi: optimismTicketAbi,
          mintArgs: {
            usdc: [waveNum.testnet, usdcAddress.optimismGoerli],
            dai: [waveNum.testnet, daiAddress.optimismGoerli],
          },
        },
      }
    : {
        env: "testnet",
        networks: [sepolia, optimismGoerli],
        alchemyKey: process.env.REACT_APP_ALCHEMY_API_KEY,
        waveNum: waveNum.testnet,
        /*sepolia*/ 11155111 /*chainId*/: {
          network: sepolia,
          alchemyUrl: `https://eth-sepolia.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
          ticketContractAddress: "0x7f45a4812BeC3Ce048196c87c71Ea54196DD41DF",
          usdcAddress: "0xBe473174D3913A13Ce80C157e685b994ad1c17C8",
          explorerUrl: "https://sepolia.etherscan.io",
          ticketAbi: ethTicketAbi,
          mintArgs: {
            usdc: [waveNum.testnet],
          },
        },
        /*optimismGoerli*/ 420: {
          network: optimismGoerli,
          alchemyUrl: `https://opt-goerli.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
          ticketContractAddress: "0x900ef56a34af973C39f476b76656dA258Dd811F9",
          usdc: {
            address: "0x93e36D6e7897C332bBe1402a5A34acb234b3af5F",
          },
          dai: {
            address: "0x4D64AA556b26fcAe24F49B075e676F120401aC29",
          },
          usdcAddress: "0x93e36D6e7897C332bBe1402a5A34acb234b3af5F",
          daiAddress: "0x4D64AA556b26fcAe24F49B075e676F120401aC29",
          explorerUrl: "https://goerli-optimism.etherscan.io",
          ticketAbi: optimismTicketAbi,
          mintArgs: {
            usdc: [waveNum.testnet, usdcAddress.optimismGoerli],
            dai: [waveNum.testnet, daiAddress.optimismGoerli],
          },
        },
      };
