import { useGallery } from "hooks/useGallery";
import { useNft } from "hooks/useNft";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./index.scss";
import { ReactComponent as MyLogo } from "assets/download.svg";

interface NftItemProps {
  tokenId: string;
  collection: string;
  onClick?: any;
  className?: string;
}
function NftItem(props: NftItemProps) {
  const address = useSelector((state: any) => state.user.address);
  const { name, symbol } = useNft(props.collection, address);

  return (
    <article
      onClick={() => props.onClick(props.collection, props.tokenId)}
      className={`${props.className} box NftItem`}
    >
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
      </body>
    </article>
  );
}

export default NftItem;
