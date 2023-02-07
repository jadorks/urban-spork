import Head from "next/head";
import Footer from "../common/Footer";
import NavBar from "../common/Navbar";
import styles from "./layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <Head></Head>
      <div className={styles.Layout}>
        <NavBar />
        <main className={styles.content}>{children}</main>
        <Footer />
      </div>
    </>
  );
}
