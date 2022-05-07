import { useGalleryFactory } from "hooks/useGalleryFactory";
import "styles/index.scss";
import "./index.scss";
import Button from "components/generics/Button";
import GalleryItem from "components/generics/GalleryItem";
import contracts from "contracts/contract-address.json";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as userActions from "store/users/actions";

function GalleryList() {
  const { create, galleries } = useGalleryFactory(contracts.GalleryFactory);
  const navigate = useNavigate();

  const onGallerySelected = (id: string) => {
    navigate(`/${id}`);
  };
  const dispatch = useDispatch();
  const onModal = () => {
    dispatch(userActions.setModal({ type: "create", show: true }));
  };
  return (
    <div className="GalleryList">
      <header>
        <h3>Funds:</h3>
        <Button title="Create" onClick={onModal} />
      </header>
      {galleries.length == 0 && <h3 className="no-items">No funds created</h3>}

      {galleries.map((gallery: any, index: number) => {
        return (
          <GalleryItem
            address={gallery}
            onClick={(id: string) => onGallerySelected(id)}
          />
        );
      })}
    </div>
  );
}

export default GalleryList;
