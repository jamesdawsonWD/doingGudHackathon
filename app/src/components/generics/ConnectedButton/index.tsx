import React, { MouseEventHandler } from 'react';
import './index.scss';
import makeBlockie from 'ethereum-blockies-base64';
import { shortAddress } from 'helpers';
interface ButtonProps {
    address: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
    className?: string
}
function ConnectedButton(props: ButtonProps) {
  return (
    <button onClick={props.onClick} className={`${props.className} connected-button`}>
        <h4>{shortAddress(props.address)}</h4>
        <img className="blockie"  alt="blockie icon" src={makeBlockie(props.address)} />
    </button>
  );
}

export default ConnectedButton;
