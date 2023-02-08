import { Mainnet, useCall } from "@usedapp/core";
import { useStakeContract } from "../useContract";

export const useTotalStakedTokens = () => {
  const stakeContract = useStakeContract();

  const { value, error } =
    useCall(
      stakeContract && {
        contract: stakeContract,
        method: "getTotalStaked",
        args: [],
      },
      { refresh: 10, chainId: Mainnet.chainId }
    ) ?? {};

  if (error) {
    console.error(error.message);
    return undefined;
  }

  return value?.[0];
};
