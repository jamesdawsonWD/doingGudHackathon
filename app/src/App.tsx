import { useConnectWallet } from 'hooks/useConnectWallet';
import React from 'react';
import './styles/index.scss';

function App() {
  const { address } = useConnectWallet();
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {address}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
