// Solidity contract for storing hashed AI bias reports on Monad blockchain
pragma solidity ^0.8.0;

contract BiasReport {
    struct Report {
        bytes32 reportHash;
        uint256 timestamp;
    }
    mapping(address => Report[]) public reports;

    function storeReport(bytes32 _reportHash) public {
        reports[msg.sender].push(Report(_reportHash, block.timestamp));
    }

    function getReports(address _user) public view returns (Report[] memory) {
        return reports[_user];
    }
}
