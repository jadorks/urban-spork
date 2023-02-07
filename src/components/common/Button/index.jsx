import React, { FC } from "react";
import styles from "./button.module.css";

const ButtonSVG = ({ children, type = "primary" }) => {
  return (
    <svg
      className={`${styles.button__bg}`}
      width="100%"
      height="100%"
      viewBox="0 0 171 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.75648 38.5079L7.76996 38.5091L71.3287 42.1611C75.9574 42.5486 80.6632 42.7466 85.3009 42.7466C89.9471 42.7466 94.6529 42.5486 99.2816 42.1611L162.827 38.5098L162.84 38.5091L162.854 38.5079C164.517 38.3702 166.069 37.6146 167.203 36.3898C168.337 35.1651 168.971 33.56 168.981 31.8909V31.8847L168.981 12.124L168.981 12.118C168.971 10.4482 168.338 8.84247 167.204 7.61638C166.071 6.39031 164.519 5.63254 162.855 5.49235L162.841 5.49115L162.827 5.49033L99.2817 1.83905C94.6529 1.45156 89.9385 1.25358 85.3009 1.25358C80.6632 1.25358 75.9574 1.45156 71.3287 1.83905L7.78347 5.49033L7.76921 5.49115L7.75498 5.49235C6.09102 5.63254 4.5398 6.39032 3.4063 7.61638C2.27279 8.84247 1.63897 10.4482 1.62957 12.118H1.62955V12.124L1.62953 31.8847L1.62957 31.8909C1.63919 33.56 2.27345 35.1651 3.40749 36.3898C4.54155 37.6146 6.09311 38.3702 7.75648 38.5079Z"
        fill="#38137F"
        stroke="#F762DA"
        stroke-width="2.14324"
      />
      <text x="50%" y="56%" className={styles.button__text}>
        {children}
      </text>
    </svg>
  );
};

const Button = ({
  children,
  onClick,
  className = "",
  buttonType,
  buttonAs,
  buttonFormat = "default",
  ...props
}) => {
  return (
    <>
      {
        {
          button: (
            <button
              className={`${styles.button} ${className}`}
              onClick={onClick}
              {...props}
            >
              <ButtonSVG type={buttonType}>{children}</ButtonSVG>
            </button>
          ),
          a: (
            <a {...props}>
              <p className={`${styles.button} ${className}`}>
                <ButtonSVG type={buttonType}>{children}</ButtonSVG>
              </p>
            </a>
          ),
        }[props.disabled ? "button" : buttonAs || "button"]
      }
    </>
  );
};

export default Button;
