const {Web3} = require('web3');
const Contract = require('./contracts/CryptoExchange.json');    //gọi json của smart contract
require("dotenv").config();


const init = async() =>{
    const web3 = new Web3('http://127.0.0.1:7545/');

    //  Tham số thứ 2 của phương thức Contract nhận một String là contract address sau khi được deployed lên blockchain
    // Contract address lấy sau khi chạy lệnh migrate, copy lại từ output terminal
    // Nên dùng .env để lưu contract address dưới tên biến như bên dưới
    const contract = await new web3.eth.Contract(Contract.abi, process.env.CRYPTO_EXCHANGE_DEPLOYED_ADDRESS);

    console.log(contract);
}

init();