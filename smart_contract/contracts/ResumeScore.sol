// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ResumeScore {
    struct ResumeRecord {
        string ipfsHash;
        uint256 score;
    }

    mapping(address => ResumeRecord) public resumes;

    function uploadResume(string memory ipfsHash, uint256 score) public {
        resumes[msg.sender] = ResumeRecord(ipfsHash, score);
    }

    function getResume(address user) public view returns (string memory, uint256) {
        ResumeRecord memory r = resumes[user];
        return (r.ipfsHash, r.score);
    }
}
