import { useGalleryFactory } from "hooks/useGalleryFactory";
import "styles/index.scss";
import "./index.scss";
import Button from "components/generics/Button";
import NftPurchaseItem from "components/generics/NftPurchaseItem";
import contracts from "contracts/contract-address.json";
import { useGallery } from "hooks/useGallery";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useNft } from "hooks/useNft";
import { useDispatch, useSelector } from "react-redux";
import NftItem from "components/generics/NftItem";
import { fromWeiToReadable } from "helpers";
import * as userActions from "store/users/actions";

function Gallery() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    name,
    donations,
    goal,
    totalDonations,
    description,
    guardian,
    totalNftDonations,
  } = useGallery(id as string);

  const dispatch = useDispatch();
  const onModal = () => {
    dispatch(userActions.setModal({ type: "donate", show: true }));
    dispatch(userActions.setSelectedFund(id as string));
  };

  return (
    <div className="Gallery">
      <header>
        <h3>{name}</h3>
        <Button title="Donate" onClick={onModal} />
      </header>
      <div className="item">
        <h5>Description:</h5>
        <p>{description}</p>
      </div>
      <div className="item">
        <h5>Guardian:</h5>
        <h4>{guardian}</h4>
      </div>
      <body>
        <div className="item">
          <h5>Goal:</h5>
          <h4>{fromWeiToReadable(goal as string)} ETH</h4>
        </div>
        <div className="item">
          <h5>Total raised:</h5>
          <h4>{fromWeiToReadable(totalDonations.toString())} ETH</h4>
        </div>
        <div className="item">
          <h5>Total NFTs donated:</h5>
          <h4>{totalNftDonations}</h4>
        </div>
      </body>
      <h3 className="donated-title">Donations for sale:</h3>
      {donations.length == 0 && <h3 className="no-items">No items donated</h3>}
      <div className="donated">
        {donations.map((donation: any, index: number) => {
          return (
            donation.sold == false && (
              <NftPurchaseItem
                address={id as string}
                receiptId={donation.receiptId}
                tokenId={donation.tokenId}
                collection={donation.collection}
                donator={donation.donator}
                price={donation.price}
                sold={donation.sold}
              />
            )
          );
        })}
      </div>
    </div>
  );
}

export default Gallery;
