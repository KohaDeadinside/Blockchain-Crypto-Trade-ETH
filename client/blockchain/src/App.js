import "./App.css";
import Header from "./components/Header";
import Swap from "./components/Swap";
import Tokens from "./components/Tokens";
import Transfer from "./components/Transfer";
import { Routes, Route } from "react-router-dom";
// import { useConnect, useAccount } from "wagmi";
// import { MetaMaskConnector } from "wagmi/connectors/metaMask";

function App() {


  return (

    <div className="App">
      {/* <Header connect={connect} isConnected={isConnected} address={address} /> */}
      <Header/>
      <div className="mainWindow">
        <Routes>
          {/* isConnected={isConnected} address={address} */}
          <Route path="/" element={<Swap  />} />
          <Route path="/transfer" element={<Transfer  />} />
          <Route path="/tokens" element={<Tokens />} />
        </Routes>
      </div>

    </div>
  )
}

export default App;