import { useGallery } from "hooks/useGallery";
import { Link } from "react-router-dom";
import "./index.scss";
import Button from "components/generics/Button";
import { useGalleryFactory } from "hooks/useGalleryFactory";
import contracts from "contracts/contract-address.json";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as userActions from "store/users/actions";

function CreateGallery() {
  const { create } = useGalleryFactory(contracts.GalleryFactory);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onCreate = async (data: any) => {
    await create(data.title, data.description, data.goal);
    dispatch(userActions.setModal({ type: "create", show: true }));
  };
  return (
    <article className="createGallery">
      <form onSubmit={handleSubmit(onCreate)}>
        <div className="form-row">
          <label>Title</label>
          <input {...register("title")} />
        </div>
        <div className="form-row">
          <label>Description</label>
          <input {...register("description")} />
        </div>
        <div className="form-row">
          <label>Goal</label>
          <input {...register("goal")} />
        </div>
        <input type="submit" />
      </form>
    </article>
  );
}

export default CreateGallery;
