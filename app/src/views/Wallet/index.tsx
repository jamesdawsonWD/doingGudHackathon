import "styles/index.scss";
import "./index.scss";
import Button from "components/generics/Button";
import NftItem from "components/generics/NftItem";
import contracts from "contracts/contract-address.json";
import { useNft } from "hooks/useNft";
import { useSelector } from "react-redux";
function Wallet() {
  const address = useSelector((state: any) => state.user.address);
  const { balance, mint } = useNft(contracts.TestNft, address);

  return (
    <div className="Wallet">
      <header>
        <h3>Wallet</h3>
        <Button title="Mint" onClick={mint} />
      </header>
      {balance.length == 0 && <h3 className="no-items">Empty Wallet</h3>}
      <body>
        {balance.map((id: any, index: number) => {
          return <NftItem tokenId={id} collection={contracts.TestNft} />;
        })}
      </body>
    </div>
  );
}

export default Wallet;
