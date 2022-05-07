import React, { useRef, useState } from "react";
import "./index.scss";
import Button from "components/generics/Button";
import ConnectedButton from "components/generics/ConnectedButton";
import { addressZero } from "helpers";
import { useConnectWallet } from "hooks/useConnectWallet";
import { Link } from "react-router-dom";

function Header() {
  const [isConnected, setConnected] = useState(false);
  const { address, connect, disconnect } = useConnectWallet();

  return (
    <header className="header">
      <h2>GoFundMeNFT</h2>
      <div className="side-menu">
        <Link to="/wallet">Wallet</Link>
        <Link to="/">Funds</Link>
        {address !== addressZero ? (
          <ConnectedButton address={address} onClick={disconnect} />
        ) : (
          <Button title="Connect" onClick={connect} />
        )}
      </div>
    </header>
  );
}

export default Header;
