import { useAccount, useConnect, useSignTypedData } from "wagmi";

export const Home = () => {
  const { address, isConnected } = useAccount();
  const {
    connect,
    connectors,
    isLoading: isConnectorLoading,
    pendingConnector,
  } = useConnect();
  const { data, isError, isLoading, isSuccess, signTypedData } =
    useSignTypedData({
      domain: {
        name: "Ether Mail",
        version: "1",
        chainId: 1,
        verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
      },
      types: {
        Person: [
          { name: "name", type: "string" },
          { name: "wallet", type: "address" },
        ],
        Mail: [
          { name: "from", type: "Person" },
          { name: "to", type: "Person" },
          { name: "contents", type: "string" },
        ],
      },
      primaryType: "Mail",
      message: {
        from: {
          name: "Cow",
          wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
        },
        to: {
          name: "Bob",
          wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
        },
        contents: "Hello, Bob!",
      },
    });

  return (
    <div style={{ padding: "32px" }}>
      <div>
        {isConnected
          ? `Connected as ${address}`
          : connectors.map((connector) => (
              <button
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect({ connector })}
              >
                {connector.name}
                {isConnectorLoading &&
                  pendingConnector?.id === connector.id &&
                  " (connecting)"}
              </button>
            ))}
      </div>

      <div style={{ marginTop: "32px" }}>
        <button disabled={isLoading} onClick={() => signTypedData()}>
          Sign Typed Data
        </button>
      </div>
      {isSuccess && <div>Signature: {data}</div>}
      {isError && <div>Error signing message</div>}
    </div>
  );
};
