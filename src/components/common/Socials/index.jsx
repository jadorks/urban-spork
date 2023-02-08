import React from "react";
import styles from "./socials.module.css";
import Twitter from "@/assets/icons/twitter.svg";
import Telegram from "@/assets/icons/telegram.svg";
import Medium from "@/assets/icons/medium.svg";

const Socials = () => {
  return (
    <div className={styles.social_links}>
      <a href="https://twitter.com/DwormDev" rel="noopener noreferrer" target="_blank">
        <img src={Twitter.src} alt="" />
      </a>
      <a href="https://t.me/dwormportalgroup" rel="noopener noreferrer" target="_blank">
        <img src={Telegram.src} alt="" />
      </a>
      <a href="/#" rel="noopener noreferrer" target="_blank">
        <img src={Medium.src} alt="" />
      </a>
    </div>
  );
};

export default Socials;
