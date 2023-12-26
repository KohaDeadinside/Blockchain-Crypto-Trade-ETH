import React, { useState, useEffect } from "react";
import { Input, Popover, Radio, Modal, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined
} from "@ant-design/icons";
import Web3 from "web3";
import Contract from "../contracts/CryptoExchange.json";
const Transfer = props => {
  const unit = ["wei", "gwei", "ether"];
  const [amount, setAmount] = useState(null);
  const [unitChange, setUnitChange] = useState(unit[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState(null);
  const { fromAddress, isConnected, connect } = props;
  function openModal() {
    setIsOpen(true);
  }
  function modifyToken(i) {
    setUnitChange(unit[i]);

    setIsOpen(false);
  }
  const handleSend = async () => {
    if (!amount || !address) {
      alert("Address is empty || Amount is empty!");
    } else {
      console.log("from:::", fromAddress);
      console.log("to:::", address);
      console.log("unitChange:::", unitChange);
      console.log("amount:::", amount);
      send(address, "username", unitChange, amount);
    }
  };
  const send = async (receiverAddress, receiverName, unit2, amount) => {
    
    //Kết nối tới mạng blockchain. Ở đây dùng blockchain ganache tại địa chỉ như ở dưới
    const web3 = new Web3("http://127.0.0.1:7545/");
    //Tạo biến contract để tương tác với các phương thức của smart contract
    const contract = new web3.eth.Contract(
      Contract.abi,
      Contract.networks["5777"].address
    );
    //////////////////////////////////////////////////////////
    //Phương thức này gọi address của owner được lưu trong contract
    const ownerAddress = await contract.methods.owner().call();

    // Phương thức này lấy số dư của owner
    const balance = await contract.methods.getOwnerBalance().call();
      console.log("bef:", balance);
    // Phương thức này thêm thông tin người chuyển
    const addSuccess = await contract.methods
      .addReceiver(receiverAddress, receiverName, amount)
      .send({ from: fromAddress,  gas: 200000,
        gasPrice: 1000000000 });
    const receiver = await contract.methods.receiver().call();
    console.log(balance);

    // Sửa biến owner address, chuyển đổi đơn vị để gửi token
    const transactionObject = {
      from: fromAddress,
      value: web3.utils.toWei(amount, unit2) // Giá trị chuyển đi
    };

    // //Phương thức để chuyển token
    const sendToken = await contract.methods
      .withdrawToken()
      .send(transactionObject);

    const receiver2 = await contract.methods.receiver().call();
    // const balance2 = await contract.methods.getOwnerBalance().call();
    // console.log("after:", balance2);
    setAddress(null);
    setAmount(null);
    setUnitChange(unit[0]);
    alert("Send success");
  }
  return (
    <div>
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Select a unit"
      >
        <div className="modalContent">
        {unit?.map((e, i) => {
            return (
              <div
                className="tokenChoice"
                key={i}
                value={unitChange} 
                onClick={() => modifyToken(i)}
              >
                 {unit[i]}
              </div>
            );
          })}
        </div>
      </Modal>
      <div className="tradeBox">
        <div className="tradeBoxHeader">
          <h4>Transfer</h4>
        </div>
        <div className="inputs transfer">
          <Input
            placeholder="Send to"
            value={address}
            onChange={e => setAddress(e.target.value)}
            disabled={!isConnected}
          />
          <Input
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            disabled={!isConnected}
          />

          <div className="assetTwo" onClick={() => openModal(2)}>
            {unitChange}
            <DownOutlined />
          </div>
        </div>
        <div className="sendButon swapButton" onClick={handleSend} disabled={!isConnected}>
          Send
        </div>
      </div>
    </div>
  );
};

export default Transfer;
