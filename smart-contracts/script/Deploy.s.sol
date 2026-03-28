// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {ResuDA} from "../src/ResuDA.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        ResuDA resuda = new ResuDA();

        console.log("ResuDA deployed to:", address(resuda));

        vm.stopBroadcast();
    }
}
