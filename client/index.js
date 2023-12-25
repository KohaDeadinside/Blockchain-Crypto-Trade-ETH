const { Web3 } = require('web3');
const Contract = require('./contracts/CryptoExchange.json');    //gọi json của smart contract
// require("dotenv").config();


const init = async () => {
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
    // Bắt giá trị vào các biến dưới đây
    var receiverAddress = ;
    var receiverName = ;
    const addSuccess = await contract.methods.addReceiver(receiverAddress, receiverName, 0)
        .send({ from: "0x054776Faa7617f3a370267e21617ff61a16f3336" });
    const receiver = await contract.methods.receiver().call();

    // console.log(ownerAddress);
    // console.log(balance);
    // console.log(receiver);

    // Sửa biến owner address, chuyển đổi đơn vị để gửi token
    const transactionObject = {
        from: "0x054776Faa7617f3a370267e21617ff61a16f3336",
        value: web3.utils.toWei(1, "ether"), // Giá trị chuyển đi
    };

    //Phương thức để chuyển token
    const sendToken = await contract.methods.withdrawToken().send(transactionObject);

    const receiver2 = await contract.methods.receiver().call();
    console.log(receiver2);
}

init();