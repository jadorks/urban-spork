import { Mainnet, useCall } from "@usedapp/core";
import { useStakeContract } from "../useContract";

export const useStakingTime = (userAddress) => {
  const stakeContract = useStakeContract();

  const { value, error } =
    useCall(
      userAddress && {
        contract: stakeContract,
        method: "stakingTime",
        args: [userAddress],
      },
      { refresh: 10, chainId: Mainnet.chainId }
    ) ?? {};

  if (error) {
    console.error(error.message);
    return undefined;
  }

  return value?.[0];
};
