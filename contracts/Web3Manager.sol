// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// 基础管理合约
contract Web3Manager is ERC20, Ownable {
    uint256 public totalTransactions;
    
    constructor() ERC20("Web3ManagerToken", "W3M") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    // 代币转账功能
    function transferToken(address to, uint256 amount) external returns (bool) {
        totalTransactions++;
        _transfer(msg.sender, to, amount);
        return true;
    }

    // 查询合约余额
    function contractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
