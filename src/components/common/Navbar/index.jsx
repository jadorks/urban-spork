import React, { useState } from "react";
import styles from "./navbar.module.css";
import DWORMLogo from "@/assets/images/logo.svg";
import { Popover } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { shortenIfAddress, useEthers } from "@usedapp/core";
import WalletManager from "../WalletManager";
import Link from "next/link";
import Button from "../Button";
import { useRouter } from "next/router";

export default function Navbar() {
  const { account } = useEthers();
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function closeModal() {
    setIsDialogOpen(false);
  }

  function openModal() {
    setIsDialogOpen(true);
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.nav__left}>
          <a
            href="https://d-worm.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-32" src={DWORMLogo.src} alt="logo" />
          </a>
        </div>
        <div className={styles.nav__links}>
          <Link
            href={"/stake"}
            className={
              router.pathname == "/stake"
                ? "border-b-2 border-[#F762DA]"
                : undefined
            }
          >
            Stake
          </Link>
          <div className="text-gray-600 cursor-default">Farms</div>
          <div className="text-gray-600 cursor-default">Dewormer</div>
        </div>
        <div className={styles.nav__right}>
          <Button
            onClick={openModal}
            buttonAs="button"
            className={`${styles.button}`}
          >
            {account ? shortenIfAddress(account) : "Connect Wallet"}
          </Button>
        </div>
        <Popover className={styles.mobile__menu}>
          {({ open }) => (
            <>
              {" "}
              <Popover.Button
                className={`${
                  open ? "" : "text-opacity-90"
                } text-white group px-3 py-2 rounded-md inline-flex items-center outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <Bars3Icon
                  className={`${open ? "" : "text-opacity-100"}
                  h-8 w-8 text-white transition duration-150 ease-in-out group-hover:text-opacity-80`}
                  aria-hidden="true"
                />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-screen px-4 mt-3 left-0 right-0 ">
                <div className="overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-4 bg-[#38137f] p-4">
                    <div className="flex freude-18 text-white items-center flex-col gap-4">
                      <Link href={"/stake"}>Stake</Link>
                      <div className="text-gray-600 cursor-default">Farms</div>
                      <div className="text-gray-600 cursor-default">
                        Dewormer
                      </div>
                      <Button
                        onClick={openModal}
                        buttonAs="button"
                        className={`${styles.button}`}
                      >
                        {account ? shortenIfAddress(account) : "Connect Wallet"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </>
          )}
        </Popover>
      </div>
      <WalletManager isOpen={isDialogOpen} onCloseModal={closeModal} />
    </div>
  );
}
