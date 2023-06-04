import { sepolia, mainnet, optimism, optimismGoerli } from "wagmi/chains";
import ethTicketAbi from "../ethereum/build/TicketAbi.json";
import optimismTicketAbi from "../ethereum/build/optimism/TicketAbi.json";

const waveNum = {
  mainnet: 4,
  optimism: 0,
  testnet: 0,
};

const usdcAddress = {
  mainnet: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  optimism: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
  sepolia: "0xBe473174D3913A13Ce80C157e685b994ad1c17C8",
  optimismGoerli: "0x6B77712429DEebB0B2551668cD9314B5d52ECdD2",
};

export const getConfig =
  process.env.REACT_APP_NETWORK === "mainnet"
    ? {
        env: "mainnet",
        networks: [mainnet, optimism],
        alchemyKey: process.env.REACT_APP_ALCHEMY_API_KEY,
        // waveNum: waveNum.mainnet,
        /*mainnet*/ 1: {
          network: mainnet,
          waveNum: waveNum.mainnet,
          alchemyUrl: `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
          ticketContractAddress: "0x6052ed5C646574D12c27E8D219C49C3394598b00",
          usdc: {
            address: usdcAddress.mainnet,
          },
          explorerUrl: "https://etherscan.io",
          ticketAbi: ethTicketAbi,
          // mintArgs: {
          //   usdc: [waveNum.testnet],
          // },
        },
        /*optimism*/ 10: {
          network: optimism,
          waveNum: waveNum.optimism,
          alchemyUrl: `https://opt-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
          ticketContractAddress: "0x1175f205ad133BF36227976b110E93Ad5dcBEe74",
          usdc: {
            address: usdcAddress.optimism,
          },
          explorerUrl: "https://optimism.etherscan.io",
          ticketAbi: optimismTicketAbi,
          // mintArgs: {
          //   usdc: [waveNum.testnet, usdcAddress.optimismGoerli],
          //   dai: [waveNum.testnet, daiAddress.optimismGoerli],
          // },
        },
      }
    : {
        env: "testnet",
        networks: [sepolia, optimismGoerli],
        alchemyKey: process.env.REACT_APP_ALCHEMY_API_KEY,
        // waveNum: waveNum.testnet,
        /*sepolia*/ 11155111 /*chainId*/: {
          network: sepolia,
          waveNum: waveNum.testnet,
          alchemyUrl: `https://eth-sepolia.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
          ticketContractAddress: "0x7f45a4812BeC3Ce048196c87c71Ea54196DD41DF",
          usdc: {
            address: usdcAddress.sepolia,
          },
          explorerUrl: "https://sepolia.etherscan.io",
          ticketAbi: ethTicketAbi,
          // mintArgs: {
          //   usdc: [waveNum.testnet],
          // },
        },
        /*optimismGoerli*/ 420: {
          network: optimismGoerli,
          waveNum: waveNum.testnet,
          alchemyUrl: `https://opt-goerli.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
          ticketContractAddress: "0xA335c7498D1EF9430b9805c5399051159531F424",
          usdc: {
            address: usdcAddress.optimismGoerli,
          },
          explorerUrl: "https://goerli-optimism.etherscan.io",
          ticketAbi: optimismTicketAbi,
          // mintArgs: {
          //   usdc: [waveNum.testnet, usdcAddress.optimismGoerli],
          //   dai: [waveNum.testnet, daiAddress.optimismGoerli],
          // },
        },
      };
