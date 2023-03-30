// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */

contract VRFv2Consumer is VRFConsumerBaseV2, ConfirmedOwner {
    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(uint256 requestId, uint256[] randomWords);

    uint public gameId;
    uint256 public lastGameId;

    struct Spin {
        uint requestId;
        string bet;
        uint256 amount;
        address payable player;
        string spinResult;
        uint spinRandomNumber;
    }

    mapping(uint=> Spin) public spins;

    struct RequestStatus {
        bool fulfilled; // whether the request has been successfully fulfilled
        bool exists; // whether a requestId exists
        uint256[] randomWords;
    }
    mapping(uint256 => RequestStatus)
        public s_requests; /* requestId --> requestStatus */
    VRFCoordinatorV2Interface COORDINATOR;

    // Your subscription ID.
    uint64 s_subscriptionId;

    // past requests Id.
    uint256[] public requestIds;
    uint256 public lastRequestId;

    // https://docs.chain.link/docs/vrf/v2/subscription/supported-networks/#configurations
    // Goerli testnet keyHash
    bytes32 keyHash =
        0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15;

    uint32 callbackGasLimit = 100000;

    // The default is 3, but you can set this higher.
    uint16 requestConfirmations = 3;

    uint32 numWords = 2;

    // Goerli testnet address
    constructor(
        uint64 subscriptionId
    )
        VRFConsumerBaseV2(0x326C977E6efc84E512bB9C30f76E30c160eD06FB)
        ConfirmedOwner(msg.sender)
    {
        COORDINATOR = VRFCoordinatorV2Interface(
            0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D
        );
        s_subscriptionId = subscriptionId;
    }

    function spin (string memory bet) public payable {
        require(COORDINATOR.balanceOf(address(this)), "request not found");
        require(compareStrings(bet, "red") || compareStrings(bet, "black"), "ERROR: Please enter Black or Red");  // colors for npm wheel
        require(address(this).balance >= msg.value*2, "ERROR: Insufficient Funds");
        require(msg.value >= 0, "Place Your Bet");

        spins[gameId]= Spin(gameId, bet, msg.value, payable(msg.sender), '', 0);
        gameId= gameId+1;

        requestRandomWords();
    }

    function compareStrings (string memory string1, string memory string2) public pure returns(bool) {
        return (keccak256(abi.encodePacked(string1)) == keccak256(abi.encodePacked(string2)));
    }

    // Assumes the subscription is funded sufficiently.
    function requestRandomWords()
        external
        onlyOwner
        returns (uint256 requestId)
    {
        // Will revert if subscription is not set and funded.
        requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
        s_requests[requestId] = RequestStatus({
            randomWords: new uint256[](0),
            exists: true,
            fulfilled: false
        });
        requestIds.push(requestId);
        lastRequestId = requestId;
        emit RequestSent(requestId, numWords);
        return requestId;
    }

    function fulfillRandomWords(uint256 _requestId, uint256[] memory _randomWords) internal override {
       randomResult= (randomWords%37);
       payOut();
    }

     function payOut() public returns(uint256) {
        for (uint256 i= lastGameId; i< gameId; i++) {
            uint winAmount= 0;
            string memory winColor= '';

            if ((randomResult<= 18 && compareStrings(spins[i].bet, "red") && randomResult!= 0) || (randomResult>= 19 && compareStrings(spins[i].bet, "black"))) {
                winAmount= spins[i].amount*2;
                spins[i].player.transfer(winAmount);
            }
        }

    }

    function getRequestStatus(
        uint256 _requestId
    ) external view returns (bool fulfilled, uint256[] memory randomWords) {
        require(s_requests[_requestId].exists, "request not found");
        RequestStatus memory request = s_requests[_requestId];
        return (request.fulfilled, request.randomWords);
    }
}
