import React, { MouseEventHandler } from 'react';
import './index.scss';

interface ButtonProps {
    title: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
    className?: string
}
function Header(props: ButtonProps) {
  return (
    <button onClick={props.onClick} className={`${props.className} button`}>
        {props.title}
    </button>
  );
}

export default Header;
