// SPDX-License-Identifier: Unlicensed

pragma solidity 0.8.19;

contract CryptoExchange {
    address public owner;
    // Receiver[] public receivers;
    Receiver public receiver;

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

    function getOwnerBalance() public view returns (uint) {
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
