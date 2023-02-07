import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { Localhost, Mainnet } from "@usedapp/core";
import STAKE_ABI from "@/contracts/DwormStakingV1.json";
import ERC20 from "@/contracts/IERC20.json";
import { TOKEN_ADDRESS } from "@/constants/address";

export function useTokenContract() {
  return new Contract(
    TOKEN_ADDRESS[Localhost.chainId],
    new utils.Interface(ERC20)
  );
}

export function useStakeContract() {
  return new Contract(
    TOKEN_ADDRESS[Localhost.chainId],
    new utils.Interface(STAKE_ABI)
  );
}
