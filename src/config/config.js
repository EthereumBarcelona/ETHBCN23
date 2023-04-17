// Deploying dummy erc20 token...
// Dummy ERC20 deployed to 0xCE58D0692b1a471d778Dd21cBFD555f5b371eFD4
// Minting 1000 dummy tokens to 0x66Dc3BFCD29E24fDDeE7f405c705220E6142e4cD
// Deploying...
// ETH BCN Tickets deployed to 0xAdcE027D273Bd76d043941b2C362b5e7E0E70B64
// Owner: 0x66Dc3BFCD29E24fDDeE7f405c705220E6142e4cD

// Sepolia
export const getConfig = {
  alchemyKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  alchemyUrl: `https://eth-sepolia.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
  ticketContractAddress: "0x277997B81ef753136769f97CF5257C9fe75A7655",
  usdcAddress: "0xCE58D0692b1a471d778Dd21cBFD555f5b371eFD4",
  explorerUrl: "https://sepolia.etherscan.io",
};
