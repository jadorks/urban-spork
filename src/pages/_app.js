import Layout from "@/components/Layout";
import { DwormDappProvider } from "@/providers/DwormProvider/DwormDappProvider";
import "@/styles/globals.css";
import {
  Mainnet,
  DAppProvider,
  MetamaskConnector,
  CoinbaseWalletConnector,
} from "@usedapp/core";
import { WalletConnectConnector } from "@usedapp/wallet-connect-connector";

const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: process.env.NEXT_PUBLIC_MAINNET_RPC_URL,
  },
  connectors: {
    metamask: new MetamaskConnector(),
    coinbase: new CoinbaseWalletConnector(),
    walletConnect: new WalletConnectConnector({
      chainId: Mainnet.chainId,
      rpc: {
        [Mainnet.chainId]: process.env.NEXT_PUBLIC_MAINNET_RPC_URL,
      },
    }),
  },
  multicallVersion: 2,
  multicallAddresses: {
    [Mainnet.chainId]: "0x5ba1e12693dc8f9c48aad8770482f4739beed696",
  },
  gasLimitBufferPercentage: 20,
  autoConnect: true,
  networks: [Mainnet],
  noMetamaskDeactivate: true,
};

export default function App({ Component, pageProps }) {
  return (
    <DAppProvider config={config}>
      <DwormDappProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DwormDappProvider>
    </DAppProvider>
  );
}
