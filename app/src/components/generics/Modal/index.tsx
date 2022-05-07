import React, { MouseEventHandler, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import * as userActions from "store/users/actions";
import CreateGallery from "components/forms/CreateGallery";
import Donate from "views/Donate";
function Modal() {
  const modal: boolean = useSelector((state: any) => state.user.modal.show);
  const type: string = useSelector((state: any) => state.user.modal.type);
  const container = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const checkClick = (event: any) => {
    const modalRect = container.current?.getBoundingClientRect();
    if (modalRect === null || modalRect === undefined) return;
    const mousePos = {
      x: event.clientX,
      y: event.clientY,
    };
    if (mousePos.x === 0 && mousePos.y === 0) return;
    if (
      mousePos.x <= modalRect.x ||
      mousePos.x >= modalRect.x + modalRect.width ||
      mousePos.y <= modalRect.y ||
      mousePos.y >= modalRect.y + modalRect.height
    )
      dispatch(userActions.setModal({ type: "", show: false }));
  };

  return (
    <div>
      {modal && (
        <article className="modal">
          <div className="modal-mask" onClick={checkClick}>
            <div className="modal-wrapper">
              <div className="modal-container" ref={container}>
                {
                  {
                    create: <CreateGallery />,
                    donate: <Donate />,
                  }[type]
                }
              </div>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}

export default Modal;
