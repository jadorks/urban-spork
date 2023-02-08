import styles from "../forms.module.css";
import DWORMLogo from "@/assets/images/currency.svg";
import DisclaimerIcon from "@/assets/icons/disclaimer.svg";
import { Localhost, useEthers, useTokenBalance } from "@usedapp/core";
import { TOKEN_ADDRESS } from "@/constants/address";
import {
  compareNonTokenWithToken,
  genFormatter,
  onInputNumberChange,
  parseDecimals,
} from "@/utils/utils";
import { utils } from "ethers";
import { useState, useEffect } from "react";
import { ApprovalState, useApproveCallback } from "@/hooks/useApproveCallback";
import { useStakeContract } from "@/hooks/useContract";
import Spinner from "@/assets/images/spinner.svg";
import { useDeposit } from "@/hooks/stake/useDeposit";
import { useRouter } from "next/router";
import WalletManager from "@/components/common/WalletManager";
import { useDwormDapp } from "@/providers/DwormProvider/DwormDappProvider";

export default function StakeForm() {
  const { account } = useEthers();
  const contract = useStakeContract();
  const balance = useTokenBalance(TOKEN_ADDRESS[Localhost.chainId], account, {
    chainId: Localhost.chainId,
  });
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isStaking, setIsStaking] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isChainError } = useDwormDapp();

  function closeModal() {
    setIsDialogOpen(false);
  }

  function openModal() {
    setIsDialogOpen(true);
  }

  const {
    approvalState,
    approve,
    state: approveState,
  } = useApproveCallback(amount, contract?.address);

  const { send: stake, state: stakeState } = useDeposit();

  const router = useRouter();

  const handleApprove = () => {
    try {
      setIsApproving(true);
      approve();
    } catch (e) {
      console.error("Exception Thrown: ", e);
      setIsApproving(false);
    }
  };

  const stakeTokens = () => {
    try {
      setIsStaking(true);
      void stake(utils.parseUnits(amount, 9));
    } catch (e) {
      setIsStaking(false);
      console.error(e);
    }
  };

  useEffect(() => {
    if (approvalState == ApprovalState.APPROVED) {
      setIsApproved(true);
    } else {
      setIsApproved(false);
    }
  }, [approvalState]);

  useEffect(() => {
    if (isApproving && approveState.status == "Success") {
      alert("Tokens approved successfully");
      setIsApproved(true);
      setIsApproving(false);
    } else if (
      isApproving &&
      (approveState.status == "Fail" || approveState.status == "Exception")
    ) {
      alert("Approval failed");
      setIsApproved(false);
      setIsApproving(false);
    }
  }, [approveState]);

  useEffect(() => {
    if (isStaking && stakeState.status == "Success") {
      alert("Successfully Staked");
      setIsStaking(false);
      router.reload();
    } else if (
      isStaking &&
      (stakeState.status == "Fail" || stakeState.status == "Exception")
    ) {
      alert(
        `Failed to stake tokens: ${
          stakeState.errorMessage.charAt(0).toUpperCase() +
          stakeState.errorMessage.slice(1)
        }`
      );
      setIsStaking(false);
    }
  }, [stakeState]);

  useEffect(() => {
    if (account) {
      if (amount <= 0) {
        setErrorMessage("Enter an Amount");
      } else if (
        balance != undefined &&
        compareNonTokenWithToken(balance, amount, 9) == -1
      ) {
        setErrorMessage("Insufficient balance");
      } else {
        setErrorMessage("");
      }
    }
  }, [amount]);

  const handleStakeAmountChange = (value) => {
    setAmount(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.form}>
          <div className={styles.currency}>
            <img src={DWORMLogo.src} />
            <p>DWORM</p>
          </div>
          <input
            type="text"
            placeholder="0.00"
            className={styles.form_input}
            value={amount}
            onChange={(e) => {
              onInputNumberChange(e, handleStakeAmountChange);
            }}
          />
          <div className={styles.balance}>
            <p>Available Balance</p>
            <p>
              {balance ? parseDecimals(utils.formatUnits(balance, 9), 4) : "-"}{" "}
              DWORM
            </p>
          </div>
        </div>
        <div className={styles.disclaimer}>
          <img src={DisclaimerIcon.src} alt="" />
          <p>Stake your DWORM to earn rewards</p>
        </div>
        {account != undefined &&
          !isChainError &&
          (isApproved ? (
            <button
              onClick={stakeTokens}
              disabled={amount <= 0 || errorMessage.length > 0}
              className={styles.button}
            >
              {errorMessage.length <= 0 ? "Stake" : errorMessage}
              {isStaking && <img src={Spinner.src} className="w-6" />}
            </button>
          ) : (
            <button
              onClick={handleApprove}
              disabled={amount <= 0 || errorMessage.length > 0}
              className={styles.button}
            >
              {errorMessage.length <= 0 ? "Approve" : errorMessage}
              {isApproving && <img src={Spinner.src} className="w-6" />}
            </button>
          ))}

        {account != undefined && isChainError && (
          <button
            className={`${styles.button} !bg-red-700 !border-0 cursor-not-allowed`}
          >
            Wrong Network
          </button>
        )}

        {account == undefined && (
          <button onClick={openModal} className={styles.button}>
            Connect Wallet{" "}
          </button>
        )}
      </div>
      <WalletManager isOpen={isDialogOpen} onCloseModal={closeModal} />
    </div>
  );
}
