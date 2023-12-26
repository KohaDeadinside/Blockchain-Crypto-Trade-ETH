import "./App.css";
import Header from "./components/Header";
import Swap from "./components/Swap";
import Tokens from "./components/Tokens";
import Transfer from "./components/Transfer";
import { Routes, Route } from "react-router-dom";
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

function App() {

  const { address, isConnected, name } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  return (

    <div className="App">
      <Header connect={connect} isConnected={isConnected} address={address} />
      {/* <Header/> */}
      <div className="mainWindow">
        <Routes>
          {/* isConnected={isConnected} address={address} */}
          {/* <Route path="/" element={<Swap  />} /> */}
          <Route path="/" element={<Transfer connect={connect} isConnected={isConnected} fromAddress={address}  />} />
          <Route path="/tokens" element={<Tokens />} />
        </Routes>
      </div>

    </div>
  )
}

export default App;