import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { Localhost, Mainnet } from "@usedapp/core";
import STAKE_ABI from "@/contracts/DwormStakingV1.json";
import ERC20 from "@/contracts/IERC20.json";
import UNI_V2 from "@/contracts/UniswapV2.json";
import {
  DWORM_ETH_PAIR,
  ETH_USDT_PAIR,
  STAKE_ADDRESS,
  TOKEN_ADDRESS,
} from "@/constants/address";

export function useTokenContract() {
  return new Contract(
    TOKEN_ADDRESS[Localhost.chainId],
    new utils.Interface(ERC20)
  );
}

export function useStakeContract() {
  return new Contract(
    STAKE_ADDRESS[Localhost.chainId],
    new utils.Interface(STAKE_ABI)
  );
}

export function useDwormEthContract() {
  return new Contract(DWORM_ETH_PAIR, new utils.Interface(UNI_V2));
}

export function useEthUSDTContract() {
  return new Contract(ETH_USDT_PAIR, new utils.Interface(UNI_V2));
}
