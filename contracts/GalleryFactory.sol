// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;
import "./Gallery.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GalleryFactory is Ownable {
    address public libraryAddress;

    event GalleryCreated(address _galleryAddress);
    uint256 public totalGalleries;
    mapping(uint256 => address) public galleries;

    constructor(address _libraryAddress) {
        libraryAddress = _libraryAddress;
    }

    function setLibraryAddress(address _libraryAddress) public onlyOwner {
        libraryAddress = _libraryAddress;
    }

    function createGallery(string memory _name, string memory _description, uint256 _goal) public {
        address clone = Clones.clone(libraryAddress);
        Gallery(clone).init(_name, _description, msg.sender, _goal);
        totalGalleries = totalGalleries + 1;
        galleries[totalGalleries] = clone;
        emit GalleryCreated(clone);
    }
}
