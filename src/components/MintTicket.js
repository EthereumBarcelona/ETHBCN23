import React from "react";
import styled from "styled-components";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { getConfig } from "../config/config";
import { ethers } from "ethers";
import ticketAbi from "../ethereum/build/TicketAbi.json";

const MintButton = styled.button`
  border: 1px solid #bc563c;
  font-family: "Dahlia-Bold";
  font-size: 24px;
  color: #bc563c;
  border-radius: 100px;
  width: 350px;
  height: 80px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    cursor: pointer;
    background: #bc563c;
    color: #e5dcd0;
  }

  @media screen and (max-width: 767px) {
    margin: 0;
    width: 300px;
  }
`;

const MintTicket = ({ waveRead, numberOfTokens }) => {
  const { address } = useAccount();
  const { config } = usePrepareContractWrite({
    address: getConfig.ticketContractAddress,
    abi: ticketAbi,
    functionName: "mintTicket",
    args: [0, parseInt(numberOfTokens)], // wave num = 0
    enabled: false, // parseInt(numberOfTokens) > 0,
    overrides: {
      from: address,
      //   value: ethers.utils.parseEther(
      //     `${parseInt(waveRead?.price.toString()) * parseInt(numberOfTokens)}`
      //   ),
    },
    onSuccess(data) {
      console.log(`Minted ${numberOfTokens} tickets`);
    },
    onError(data) {
      console.log("Some error");
    },
  });
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <>
      <MintButton
        disabled={parseInt(numberOfTokens) <= 0 || isLoading}
        onClick={() => {
          console.log(`Minting ${numberOfTokens} tickets for ${address}`);
          write?.();
        }}
      >
        {isLoading ? <span>Minting..</span> : <span>Mint</span>}
      </MintButton>

      <a
        href={`${getConfig.explorerUrl}/tx/${data?.hash}`}
        target={"_blank"}
        rel="noreferrer"
      >
        {isSuccess ? (
          <span>Successfully minted {numberOfTokens} tickets</span>
        ) : isLoading ? (
          <span>Pending txn {data?.hash}</span>
        ) : null}
      </a>
    </>
  );
};

export default MintTicket;
