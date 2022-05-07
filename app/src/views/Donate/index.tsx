import { useGalleryFactory } from "hooks/useGalleryFactory";
import "styles/index.scss";
import "./index.scss";
import Button from "components/generics/Button";
import NftItemDonate from "components/generics/NftItemDonate";
import contracts from "contracts/contract-address.json";
import { useGallery } from "hooks/useGallery";
import { Link, useParams } from "react-router-dom";
import { useNft } from "hooks/useNft";
import { useSelector } from "react-redux";
function Donate() {
  const address = useSelector((state: any) => state.user.address);
  const { balance, mint } = useNft(contracts.TestNft, address);

  return (
    <div className="Donate">
      <header>
        <h3>Donate</h3>
      </header>
      <body>
        {balance.map((id: any, index: number) => {
          return <NftItemDonate tokenId={id} collection={contracts.TestNft} />;
        })}
      </body>
    </div>
  );
}

export default Donate;
