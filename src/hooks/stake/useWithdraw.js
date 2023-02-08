import { useContractFunction } from "@usedapp/core";
import { useStakeContract } from "../useContract";

export const useWithdraw = () => {
  const contract = useStakeContract();

  const { state, send } = useContractFunction(contract, "withdraw", {
    transactionName: "Unstake Tokens",
  });

  return { state, send };
};
