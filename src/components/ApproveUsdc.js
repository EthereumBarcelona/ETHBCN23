import React, { useEffect } from "react";
import {
  erc20ABI,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { getConfig } from "../config/config";
// import erc20ABI from "../ethereum/build/ERC20Abi.json";

const ApproveUsdc = ({ ticketPrice, numberOfTokens, setApproved }) => {
  const { address } = useAccount();

  // console.log(
  //   "tokens to approve: ",
  //   ticketPrice.mul(numberOfTokens).toString()
  // );

  const { config } = usePrepareContractWrite({
    address: getConfig.usdcAddress,
    abi: erc20ABI,
    functionName: "approve",
    args: [
      getConfig.ticketContractAddress,
      // "10000000000000000000"
      ticketPrice?.mul(numberOfTokens),
    ],
    enabled: false, // parseInt(numberOfTokens) > 0,
    overrides: {
      from: address,
    },
    onSuccess(data) {
      setApproved(true);
      console.log("usdc approved");
    },
    onError(data) {
      console.log("Usdc approval error");
    },
  });
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    setApproved(isSuccess);
  }, [isSuccess]);

  return (
    <button
      disabled={isLoading || isSuccess}
      onClick={() => {
        console.log("approving..");
        write?.();
      }}
    >
      {isLoading ? <span>Approving...</span> : <span>Approve USDC</span>}
    </button>
  );
};

export default ApproveUsdc;
