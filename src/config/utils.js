// mainnet polygon
// export const wertDetails = {
//   origin: "https://widget.wert.io",
//   partnerId: process.env.REACT_APP_WERT_PARTNER_ID,
//   contractAddress: "0x25e302dF0d301AF5874Fd3C7B461d46be60473dF",
//   network: "polygon",
//   commodity: "USDC",
//   ticketPrice: 444, //usdc on polygon
//   mintAbi: {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "_waveNum",
//         type: "uint256",
//       },
//       {
//         internalType: "address",
//         name: "_account",
//         type: "address",
//       },
//       {
//         internalType: "uint256",
//         name: "_numberOfTokens",
//         type: "uint256",
//       },
//     ],
//     name: "mintTicketTo",
//     outputs: [],
//     stateMutability: "payable",
//     type: "function",
//   },
// };

// testnet
export const wertDetails = {
  origin: "https://sandbox.wert.io", // https://widget.wert.io
  partnerId: process.env.REACT_APP_WERT_PARTNER_ID,
  privateKey: process.env.REACT_APP_WERT_PRIVATE_KEY,
  contractAddress: "0x25e302dF0d301AF5874Fd3C7B461d46be60473dF",
  network: "goerli",
  commodity: "ETH",
  ticketPrice: 0.001, //usdc on polygon
  mintAbi: {
    inputs: [
      {
        internalType: "uint256",
        name: "_waveNum",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_numberOfTokens",
        type: "uint256",
      },
    ],
    name: "mintTicketTo",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
};
