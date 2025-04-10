// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1_000_000 * 1e18;
    bool public presaleActive;
    mapping(address => bool) public whitelist;
    uint256 public presaleRate = 1000; // 1 ETH = 1000 tokens
    
    constructor(string memory name, string memory symbol)
        ERC20(name, symbol)
        Ownable(msg.sender)
    {
        _mint(msg.sender, MAX_SUPPLY / 2); // 初始分配50%代币
    }

    // 增强版铸造函数
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
    }

    // 带白名单的预售功能
    function buyTokens() external payable {
        require(presaleActive, "Presale not active");
        require(whitelist[msg.sender], "Not in whitelist");
        
        uint256 tokens = msg.value * presaleRate;
        _transfer(owner(), msg.sender, tokens);
    }

    // 代币销毁功能
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    // 管理功能
    function addToWhitelist(address[] calldata addresses) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            whitelist[addresses[i]] = true;
        }
    }

    function togglePresale(bool status) external onlyOwner {
        presaleActive = status;
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
