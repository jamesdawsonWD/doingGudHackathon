import { useGallery } from "hooks/useGallery";
import { fromWeiToReadable } from "helpers";
import { Link } from "react-router-dom";
import "./index.scss";
import { BigNumber, ethers } from "ethers";
interface GalleryItemProps {
  address: string;
  onClick: any;
  className?: string;
}
function GalleryItem(props: GalleryItemProps) {
  const { totalDonations, totalNftDonations, donate, name, description, goal } =
    useGallery(props.address);

  return (
    <article
      onClick={() => props.onClick(props.address)}
      className={`${props.className} box galleryItem`}
    >
      <header>
        <h4>{name}</h4>
        <h4 className="address">{props.address}</h4>
      </header>
      <p>{description}</p>
      <body>
        <div className="stats">
          <h5>Total Raised</h5>
          <h3>{fromWeiToReadable(totalDonations.toString())} ETH</h3>
        </div>
        <div className="stats">
          <h5>Goal</h5>
          <h3>{fromWeiToReadable(goal as string)} ETH</h3>
        </div>
        <div className="stats">
          <h5>Total NFTs Donated</h5>
          <h3>{totalNftDonations} NFTs</h3>
        </div>
      </body>
    </article>
  );
}

export default GalleryItem;
