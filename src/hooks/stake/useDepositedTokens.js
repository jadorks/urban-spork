import { Mainnet, useCall } from "@usedapp/core";
import { useStakeContract } from "../useContract";

export const useDepositedTokens = (userAddress) => {
  const stakeContract = useStakeContract();

  const { value, error } =
    useCall(
      userAddress && {
        contract: stakeContract,
        method: "depositedDworm",
        args: [userAddress],
      },
      { refresh: "everyBlock", chainId: Mainnet.chainId }
    ) ?? {};

  if (error) {
    console.error(error.message);
    return undefined;
  }

  return value?.[0];
};
