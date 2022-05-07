import { useGallery } from "hooks/useGallery";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import "./index.scss";
import Button from "../Button";
import { ReactComponent as MyLogo } from "assets/download.svg";
import { useNft } from "hooks/useNft";
import { useSelector } from "react-redux";
import { fromWeiToReadable } from "helpers";

interface NftPurchaseItemProps {
  receiptId: string;
  address: string;
  price: string;
  tokenId: string;
  donator: string;
  collection: string;
  sold: boolean;
  className?: string;
}
function NftPurchaseItem(props: NftPurchaseItemProps) {
  const { totalDonations, totalNftDonations, buy } = useGallery(props.address);
  const address = useSelector((state: any) => state.user.address);

  const { name, symbol } = useNft(props.collection, address);

  const onBuy = async () => {
    console.log(props.address);
    await buy(props.receiptId, ethers.utils.formatEther(props.price));
  };

  return (
    <article className={`${props.className} box NftItem`}>
      <header>
        <MyLogo />
      </header>
      <body>
        <header>
          <h4>
            {name + " #"}
            {props.tokenId}
          </h4>
        </header>
        <div className="content">
          <h5>{symbol}</h5>
        </div>

        <Button
          title={"Buy for " + fromWeiToReadable(props.price) + " ETH"}
          onClick={onBuy}
        />
      </body>
    </article>
  );
}

export default NftPurchaseItem;
