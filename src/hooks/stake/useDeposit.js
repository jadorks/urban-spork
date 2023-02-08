import { useContractFunction } from "@usedapp/core";
import { useStakeContract } from "../useContract";

export const useDeposit = () => {
  const contract = useStakeContract();

  const { state, send } = useContractFunction(contract, "deposit", {
    transactionName: "Stake Tokens",
  });

  return { state, send };
};
