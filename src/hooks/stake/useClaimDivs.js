import { useContractFunction } from "@usedapp/core";
import { useStakeContract } from "../useContract";

export const useClaimRewards = () => {
  const contract = useStakeContract();

  const { state, send } = useContractFunction(contract, "claimDivs", {
    transactionName: "Claim Rewards",
  });

  return { state, send };
};
