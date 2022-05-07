pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract TestNFT is ERC721Enumerable {
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mint() public returns (uint256) {
        uint256 id = totalSupply() + 1;
        _safeMint(msg.sender, id);
    }
}
