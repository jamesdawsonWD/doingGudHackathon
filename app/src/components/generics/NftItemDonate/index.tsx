import { useGallery } from "hooks/useGallery";
import { useNft } from "hooks/useNft";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./index.scss";
import Button from "components/generics/Button";
import { useState } from "react";
import contracts from "contracts/contract-address.json";
import { ReactComponent as MyLogo } from "assets/download.svg";

interface NftItemDonateProps {
  tokenId: string;
  collection: string;
  onClick?: any;
  className?: string;
}
function NftItemDonate(props: NftItemDonateProps) {
  const address = useSelector((state: any) => state.user.address);
  const { name, symbol, approve } = useNft(props.collection, address);
  const [approved, setApproved] = useState(false);
  const [price, setPrice] = useState(false);
  const id: string = useSelector((state: any) => state.user.fund);

  const { totalDonations, totalNftDonations, donate } = useGallery(id);
  const onApprove = async () => {
    await approve(id as string, props.tokenId);
    setApproved(true);
  };
  const onDonate = async () => {
    await donate(props.collection, props.tokenId, price.toString());
    navigate(`/wallet`);
  };
  const handleChange = async (event: any) => {
    setPrice(event.target.value);
  };
  const navigate = useNavigate();

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
        {approved ? (
          <div className="input">
            <input
              type="text"
              placeholder="0.420 ETH"
              onChange={handleChange}
            />
            <Button title="Donate" onClick={onDonate} />
          </div>
        ) : (
          <Button title="Approve" onClick={onApprove} />
        )}
      </body>
    </article>
  );
}

export default NftItemDonate;
