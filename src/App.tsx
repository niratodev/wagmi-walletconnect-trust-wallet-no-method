import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { Home } from "./ Home";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [mainnet],
  [
    infuraProvider({ apiKey: import.meta.env.VITE_INFURA_KEY }),
    publicProvider(),
  ]
);

const connector = new WalletConnectConnector({
  chains,
  options: {
    projectId: import.meta.env.VITE_WC_PROJECT_ID,
  },
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [connector],
  publicClient,
});

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Home />
    </WagmiConfig>
  );
}

export default App;
