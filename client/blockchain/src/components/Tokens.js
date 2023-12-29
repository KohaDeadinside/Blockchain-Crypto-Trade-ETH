import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Contract from "../contracts/CryptoExchange.json";
import { useBalance, useTransaction } from "wagmi";
import { publicClient } from "./client";
const Tokens = props => {
  console.log("hello");
  const [balance, setBalance] = useState(0);
  const { fromAddress } = props;

  useEffect(() => {
    const getTran = async () => {
      //Kết nối tới mạng blockchain. Ở đây dùng blockchain ganache tại địa chỉ như ở dưới
      const web3 = new Web3("http://127.0.0.1:7545/");
      //Tạo biến contract để tương tác với các phương thức của smart contract
      const contract = new web3.eth.Contract(
        Contract.abi,
        Contract.networks["5777"].address
      );
      // Phương thức này lấy số dư của owner
      const balanceInWei = await contract.methods.getOwnerBalance().call();
      // Chuyển đổi từ Wei sang Ether
      const balance = web3.utils.fromWei(balanceInWei, "ether");
      setBalance(balance);
    };
    getTran();
  }, []);

  return (
    <div >
      {" "}Balance: {balance.toString()} ETH{" "}
    </div>
  );
};

export default Tokens;
