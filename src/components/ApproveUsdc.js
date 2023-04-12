import React from "react";
import {
  erc20ABI,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { getConfig } from "../config/config";
import { ethers } from "ethers";

const ApproveUsdc = ({ approved, setApproved }) => {
  const { address } = useAccount();
  const { config } = usePrepareContractWrite({
    address: getConfig.usdcAddress,
    abi: erc20ABI,
    functionName: "approve",
    args: [getConfig.ticketContractAddress, ethers.utils.parseEther("10")],
    // enabled: true,
    overrides: {
      from: address,
    },
    onSuccess(data) {
      setApproved(true);
      console.log("usdc approved");
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
    <button
      disabled={isLoading || isSuccess}
      onClick={() => {
        console.log("approving...");
        write?.();
      }}
    >
      {isLoading ? <span>Approving...</span> : <span>Approve USDC</span>}
    </button>
  );
};

export default ApproveUsdc;
