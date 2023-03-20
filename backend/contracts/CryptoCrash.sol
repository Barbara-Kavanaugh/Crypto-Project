pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract CryptoCrash {

    uint private start;
    uint private ticketLimit= 1000;
    uint private verify= 100;
    uint private claim= 100;

    mapping(address => uint) private _tickets;
    mapping(address => uint) private _winners;

    address public owner;

    address[] _totalPlayers;
    address[] _verifiedPlayers;

    uint private winner;
    bool private isWinner;
    address private winnerAddress;

    constructor() {
        owner= msg.sender;
        start= block.timestamp;
    }
    

    function hashPurchasedTicket(uint number, uint salt) public payable
        returns (bool) {
            return purchaseTicket(initiateHash(number, salt));
    }

    function initiateHash(uint number, uint salt) public pure
        returns (uint) {
            return uint(keccak256(number+salt));
    }

    function purchaseTicket(uint hash) public payable
        returns (bool) {
            require(block.timestamp < start+ticketLimit);
            require(1 ether == msg.value);
            require(_tickets[msg.sender]== 0);

            _tickets[msg.sender]= hash;
            _totalPlayers.push(msg.sender);

            return true;
    }

    function verifyTicket(uint number, uint salt) public 
        returns(bool) {
            require(block.timestamp >= start+ticketLimit);
            require(block.timestamp < start+ticketLimit+verify);

            // Validates entry
            require(_tickets[msg.sender]> 0);
            
            // Validates the hash
            require(salt>number);
            require(initiateHash(number, salt)== _tickets[msg.sender]);
            
            winner= winner ^ salt ^ uint(msg.sender);
            _verifiedPlayers.push(msg.sender);
        }

        function verifyWinner () public 
            returns (bool) {
                require(block.timestamp >= start+ticketLimit+verify);
                require(block.timestamp < start+ticketLimit+verify+claim);

                if (!isWinner) {
                    winnerAddress= _verifiedPlayers[winner % _verifiedPlayers.length];
                    _winners[winnerAddress]= _verifiedPlayers.length-10 ether;
                    isWinner= true;
                }

                return msg.sender== winnerAddress;
        }

        function claimWinnings() public {
            require(_winners[msg.sender]> 0);
            msg.sender.transfer(_winners[msg.sender]);
            _winners[msg.sender]= 0;
        }
}