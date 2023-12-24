// SPDX-License-Identifier: Unlicensed

pragma solidity 0.8.19;

contract CryptoExchange {
    address owner;
    // Receiver[] public receivers;
    Receiver receiver;

    constructor() {
        owner = msg.sender;
    }

    struct Receiver {
        address payable walletAddress;
        string Name;
        uint256 timestamp;
        uint256 amount; //số tiền cần chuyển đến
        bool hasReceived;
    }

    // Receiver receiver;

    // function getReceiverIndex(address payable walletAddress) private view returns (uint256)
    // {
    //     for (uint256 i = 0; i < receivers.length; i++) {
    //         if (receivers[i].walletAddress == walletAddress) {
    //             return i;
    //         }
    //     }
    //     return 9999;
    // }

    // add receiver to contract
    // function addReceiver(address payable walletAddress, string memory name, uint256 timestamp, uint256 amount, bool hasReceived) public {
    //     if (getReceiverIndex(walletAddress) == 9999) {
    //         receivers.push(Receiver(walletAddress, name, timestamp, amount , hasReceived));
    //     }
    // }
    function getReceiver() public view returns (Receiver memory) {
        return receiver;
    }

    function getBalance() public view returns (uint) {
        return owner.balance;
    }   

    function addReceiver(address payable walletAddress, string memory name, uint256 amount) public {
        receiver = Receiver(walletAddress, name, block.timestamp, amount, false);
    }

    // function balanceOf() public view returns (uint256) {
    //     return address(this).balance;
    // }

    // function deposit(address payable walletAddress) public payable {
    //     receivers[getReceiverIndex(walletAddress)].amount += msg.value;
    // }

    // function withdrawToken(address payable walletAddress) public payable {
    //     Receiver memory tmpReceiver = receivers[getReceiverIndex(walletAddress)];
    //     tmpReceiver.walletAddress.transfer(tmpReceiver.amount);
    // }

    function withdrawToken() public payable {
        // Kiểm tra người thực hiện có đủ token hay không
        // require(owner.balance <= msg.value, "Not enough tokens");
        if (owner.balance >= msg.value){
            receiver.walletAddress.transfer(msg.value);
            receiver.amount = msg.value;
            receiver.hasReceived = true;
        }
    }

}
