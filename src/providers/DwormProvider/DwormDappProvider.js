import { useDepositedTokens } from "@/hooks/stake/useDepositedTokens";
import { usePendingDivs } from "@/hooks/stake/usePendingDivs";
import { useStakingTime } from "@/hooks/stake/useStakingTime";
import { useTotalStakedTokens } from "@/hooks/stake/useTotalStakedTokens";
import { useDwormEthContract, useEthUSDTContract } from "@/hooks/useContract";
import { usePrice } from "@/hooks/usePrice";
import { useEthers, useUpdateConfig, ChainId, Localhost, Mainnet } from "@usedapp/core";
import React, { useState, useEffect } from "react";
import DwormDappContext from "./context";

function DwormDappProvider({ children }) {
  const { account, chainId, library } = useEthers();
  const updateConfig = useUpdateConfig();
  const totalStakedTokens = useTotalStakedTokens();
  const userPendingDivs = usePendingDivs(account);
  const userDepositedTokens = useDepositedTokens(account);
  const userStakingTime = useStakingTime(account);
  const [prices, setPrices] = useState({});
  const [isChainError, setIsChainError] = useState(false);

  const dwormEthContract = useDwormEthContract();
  const ethUsdtContract = useEthUSDTContract();

  const ethValue = usePrice(dwormEthContract, false, 18);
  const usdtValue = usePrice(ethUsdtContract, true, 12);

  useEffect(() => {
    setPrices({
      ethValue,
      usdtValue,
    });
  }, [usdtValue]);

  // useEffect(() => {
  //   try {
  //     if (account != undefined && library != undefined) {
  //       updateConfig({ readOnlyUrls: { [ChainId.Mainnet]: library } });
  //     } else {
  //       updateConfig({
  //         readOnlyUrls: {
  //           [ChainId.Mainnet]: process.env.NEXT_PUBLIC_MAINNET_RPC_URL,
  //         },
  //       });
  //     }
  //   } catch (e) {
  //     console.error("Provider switch failed. Going back to alchemy: ", e);
  //     updateConfig({
  //       readOnlyUrls: {
  //         [ChainId.Mainnet]: process.env.NEXT_PUBLIC_MAINNET_RPC_URL,
  //       },
  //     });
  //   }
  // }, [account]);

  // useEffect(() => {
  //   if (account != undefined && chainId != undefined) {
  //     if (chainId != Mainnet.chainId) {
  //       setIsChainError(true);
  //       updateConfig({
  //         readOnlyUrls: {
  //           [ChainId.Mainnet]: process.env.NEXT_PUBLIC_MAINNET_RPC_URL,
  //         },
  //       });
  //     } else {
  //       setIsChainError(false);
  //       updateConfig({
  //         readOnlyUrls: {
  //           [ChainId.Mainnet]: library,
  //         },
  //       });
  //     }
  //   }
  // }, [account, chainId]);

  // useEffect(() => {
  //   if (isChainError && account === undefined) {
  //     setIsChainError(false);
  //   }
  // }, [isChainError, account]);

  return (
    <DwormDappContext.Provider
      value={{
        totalStakedTokens,
        userPendingDivs,
        userDepositedTokens,
        userStakingTime,
        prices,
        isChainError
      }}
    >
      {children}
    </DwormDappContext.Provider>
  );
}

function useDwormDapp() {
  const context = React.useContext(DwormDappContext);
  if (context === undefined) {
    throw new Error("useDwormDapp must be used within a DwormDappProvider");
  }
  return context;
}

export { DwormDappProvider, useDwormDapp };
