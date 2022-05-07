pragma solidity 0.8.7;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Gallery {
    using SafeMath for uint256;
    uint256 public totalNftDonations;
    uint256 public totalDonations;
    string public name;
    string public description;
    uint256 public goal;
    struct Donation {
        address collection;
        uint256 tokenId;
        address donator;
        uint256 price;
        bool sold;
        uint256 receiptId;
    }

    mapping(uint256 => Donation) public donations;

    address public guardian;

    modifier onlyGuardian() {
        require(msg.sender == guardian, "ONLY_BY_GUARDIAN");
        _;
    }

    event Donated(uint256 donationID, uint256 tokenID, address collection, address from);
    event Purchase(uint256 donationID, address buyer);

    function init(
        string memory _name,
        string memory _description,
        address _guardian,
        uint256 _goal
    ) public {
        guardian = _guardian;
        description = _description;
        name = _name;
        goal = _goal;
    }

    /**
     *   Donates an nft to the gallery
     *   @param _collection - the nft collection address
     *   @param _donationTokenId - the token Id to be donated
     *   @param _price - the price for the donation to be sold at
     **/
    function donate(
        address _collection,
        uint256 _donationTokenId,
        uint256 _price
    ) external {
        totalNftDonations = totalNftDonations + 1;

        Donation memory newDonation = Donation({
            donator: msg.sender,
            collection: _collection,
            tokenId: _donationTokenId,
            price: _price,
            sold: false,
            receiptId: totalNftDonations
        });

        donations[totalNftDonations] = newDonation;
        IERC721(_collection).transferFrom(msg.sender, address(this), _donationTokenId);

        emit Donated(totalNftDonations, _donationTokenId, _collection, msg.sender);
    }

    /**
     *   Buy a donated NFT
     *   @param _donationId - the donation 'msg.sender' wishes to purchase
     **/
    function buy(uint256 _donationId) external payable {
        Donation memory donation = donations[_donationId];

        require(!donation.sold, "Item already sold");
        require(msg.value >= donation.price, "Does not meet minimum price");

        IERC721(donation.collection).transferFrom(address(this), msg.sender, donation.tokenId);
        donation.sold = true;

        totalDonations = totalDonations + msg.value;
        donations[_donationId] = donation;

        emit Purchase(_donationId, msg.sender);
    }

    function withdraw() external onlyGuardian {
        payable(guardian).transfer(address(this).balance);
    }
}
