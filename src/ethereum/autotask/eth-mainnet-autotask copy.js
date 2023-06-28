const axios = require("axios");
const Web3 = require("web3");
const web3 = new Web3();

const chainId = "1";

const inputs = [
  {
    name: "from",
    type: "address",
    indexed: true,
  },
  {
    name: "to",
    type: "address",
    indexed: true,
  },
  {
    name: "tokenId",
    type: "uint256",
    indexed: true,
  },
];

// Main function, exported separately for testing
exports.main = async function (payload) {
  let events = payload.events;

  for (let i = 0; i < events.length; i++) {
    let evt = events[i];
    console.log("Number of logs: ", evt.transaction.logs.length);
    console.log(evt.transaction.logs);

    const burnHash = evt.transaction.transactionHash;

    const hexString = evt.transaction.logs[0].data;
    const topics = evt.transaction.logs[0].topics;
    const decodedLog = web3.eth.abi.decodeLog(
      inputs,
      hexString,
      topics.slice(1)
    );
    console.log({ decodedLog });
    var { from, tokenId } = decodedLog;
    console.log({ from, tokenId, burnHash });

    try {
      const url = "https://ethbcn-backend.herokuapp.com/qrcode";
      var tkt_data = {
        walletAddress: from,
        tokenId,
        chainId,
        hash: burnHash,
      };
      await axios.post(url, tkt_data, {
        headers: {
          "Content-Type": "application/json",
          validate: "alpha romeo tango",
        },
      });
    } catch (err) {
      if (typeof tokenId === "undefined") {
        throw err;
      }
      console.error(err);
    }
  }

  return tkt_data;
};

// Entrypoint for the Autotask
exports.handler = async function (event) {
  const {
    body, // Object with JSON-parsed POST body
  } = event.request;
  const payload = body;
  return exports.main(payload);
};
