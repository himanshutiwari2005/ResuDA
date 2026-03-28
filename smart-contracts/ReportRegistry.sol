// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReportRegistry {
    struct BiasReport {
        uint256 id;
        string report;
        address reporter;
        uint256 timestamp;
    }

    BiasReport[] public reports;
    uint256 public reportCounter;

    event ReportCreated(uint256 id, string report, address indexed reporter);

    function createReport(string memory _report) public {
        reportCounter++;
        reports.push(BiasReport(reportCounter, _report, msg.sender, block.timestamp));
        emit ReportCreated(reportCounter, _report, msg.sender);
    }

    function getReport(uint256 _id) public view returns (BiasReport memory) {
        require(_id > 0 && _id <= reportCounter, "Invalid report ID");
        return reports[_id - 1];
    }

    function getReportsCount() public view returns (uint256) {
        return reportCounter;
    }
}