const {Web3} = require('web3');
const Contract = require('./contracts/CryptoExchange.json');    //gọi json của smart contract
// require("dotenv").config();


const init = async() =>{
    const web3 = new Web3('http://127.0.0.1:7545/');

    // const contract = await new web3.eth.Contract(Contract.abi, Contract.networks['5777'].address);

    console.log(Contract.networks['5777'].address);
}

init();