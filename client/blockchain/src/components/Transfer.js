import React, { useState, useEffect } from "react";
import { Input, Popover, Radio, Modal, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined
} from "@ant-design/icons";
import Web3 from 'web3'
import Contract from '../contracts/CryptoExchange.json'
const Transfer = () => {
  const unit = ['Wei', 'Gwei', 'Ether']
  const [slippage, setSlippage] = useState(2.5);
  const [amount, setAmount] = useState(null);
  const [unitChange, setUnitChange] = useState(unit[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState(null);

  function handleSlippageChange(e) {
    setSlippage(e.target.value);
  }

  function openModal() {
    setIsOpen(true);
  }
  function modifyToken(i){
    setUnitChange(unit[i])
    
    setIsOpen(false);
  }

  const handleSend = async() =>{
    if(!amount || !address){
        alert("Address is empty || Amount is empty!")
    }
    else {
        send(address, "username", unit, amount)
    }
   
  }
  const send = async (receiverAddress,receiverName, unit, amount) => {
    //Kết nối tới mạng blockchain. Ở đây dùng blockchain ganache tại địa chỉ như ở dưới
    const web3 = new Web3('http://127.0.0.1:7545/');
    //Tạo biến contract để tương tác với các phương thức của smart contract
    const contract = new web3.eth.Contract(Contract.abi, Contract.networks['5777'].address);
//////////////////////////////////////////////////////////


    //Phương thức này gọi address của owner được lưu trong contract
    const ownerAddress = await contract.methods.owner().call();

    // Phương thức này lấy số dư của owner
    const balance = await contract.methods.getOwnerBalance().call();

    // Phương thức này thêm thông tin người chuyển
    const addSuccess = await contract.methods.addReceiver("0x7b79D862cfB24390e2eA88A0a367C126eB7F4089",receiverName, 0)
        .send({ from: "0x1a7160A8DDf486a25a8df62AC4927f6B0b10d387" });
    const receiver = await contract.methods.receiver().call();
    console.log(balance);

    // Sửa biến owner address, chuyển đổi đơn vị để gửi token
    const transactionObject = {
        from: "0x1a7160A8DDf486a25a8df62AC4927f6B0b10d387",
        value: web3.utils.toWei(1, 'ether'), // Giá trị chuyển đi
    };

    //Phương thức để chuyển token
    const sendToken = await contract.methods.withdrawToken().send(transactionObject);

    const receiver2 = await contract.methods.receiver().call();
    console.log(receiver2);
    console.log(balance);
    console.log(balance);
}
  return (
    <div>
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Select a unit"
      >
        <div className="modalContent" />
        <div className="modalContent">
          {unit?.map((e, i) => {
            return (
              <div
                className="tokenChoice"
                key={i}
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
          <Input placeholder="Send to"   onChange={(e)=> setAddress(e.target.value)}/>
          <Input placeholder="Amount"   onChange={(e)=> setAmount(e.target.value)}/>
         
          <div className="assetTwo" onClick={() => openModal(2)}>
            {unitChange}
              <DownOutlined />
          </div>
        </div>
        <div className="sendButon" onClick={handleSend}>Send</div>
      </div>
    </div>
  );
};

export default Transfer;
