pragma solidity 0.8.7;

import './ERC721.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

contract Parcel is ERC721 {
    using SafeMath for uint256;
    uint256 public lastAttempt;
    uint256 public totalAttempts;
    uint256 public attemptPrice;
    uint256 public auctionStartTime;
    uint256 public highestBid;
    uint256 public lastBid;
    address public highestBidder;
    uint256 private winningNumber;
    bool public isAuctionRequested;
    bool private gameOver;

    uint256 MAXIMUM_TOTAL_ATTEMPTS = 1000000;
    uint256 WINNING_NUMBER = 69420;

    address private guardian;
    mapping(address => uint256) private _bids;

    modifier isParcelOwner() {
        if (msg.sender == ownerOf(1)) _;
    }
    modifier isGuardian() {
        if (msg.sender == guardian) _;
    }
    modifier isGameLive() {
        if (!gameOver) _;
    }
    modifier isGameOver() {
        if (gameOver) _;
    }

    constructor() public ERC721("Meta Parcel", "MetaParcel", address(this)) {
        _safeMint(msg.sender, 1);
        guardian = msg.sender;
        attemptPrice = 0.005 ether;
        gameOver = false;
    }

    function roll() private {
        // need to get chain link random number
        uint256 attempt = random();
        if (attempt == WINNING_NUMBER) {
            distributeWinnings(msg.sender);
        } else {
            attemptFailed();
        }
    }
    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
    }
    function attempt() public payable isParcelOwner isGameLive {
        require(msg.value >= attemptPrice, "Insufficient attempt price");
        roll();
        totalAttempts += 1;
        if(totalAttempts >= MAXIMUM_TOTAL_ATTEMPTS) distributeWinnings(msg.sender);
    }

    function claim() public payable isGameLive {
        require(ownerOf(1) == address(this), "The parcel is not home");
        require(!isAuctionRequested, "Cannot when an auction has been requested");
        require(msg.value >= attemptPrice, "Insufficient attempt price");
        safeTransferFrom(address(this), msg.sender, 1);
    }
    function recover() public isGameLive {
        require(block.timestamp.sub(lastAttempt) >= 3 days, "Recover period not met");
        lastAttempt = block.timestamp;
        _forceTransfer(ownerOf(1), msg.sender, 1);
    }

    function distributeWinnings(address _winner) private {
        uint256 winnings = address(this).balance.mul(0.9 ether).div(1 ether);
        uint256 royalties = address(this).balance.mul(0.05 ether).div(1 ether);
        payable(_winner).transfer(winnings);
        payable(guardian).transfer(royalties);
        gameOver = true;
    }

    function attemptFailed() private {
        lastAttempt = block.timestamp;
    }

    // Guardian
    function newGame(uint256 _attemptPrice) public isGuardian isGameOver {
        lastAttempt = block.timestamp;
        attemptPrice = _attemptPrice;
        _forceTransfer(ownerOf(1), address(this), 1);
        totalAttempts = 0;
        isAuctionRequested = false;
    }

    // Auction
    function requestAuction() external isGameLive {
        isAuctionRequested = true;
    }

    function bid() external payable isGameLive {
        require(msg.value > highestBid, "Bid must be greater than current highest");
        lastBid = block.timestamp;
        highestBid = msg.value;
        _bids[msg.sender] = msg.value;
    }

    function withdrawBid() external {
        require(_bids[msg.sender] > 0, "Nothing to withdraw");
        uint256 amount = _bids[msg.sender];
        _bids[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    function startAuction() external isGameLive {
        require(isAuctionRequested, "Can only start an auction if it has been requested");
        auctionStartTime = block.timestamp;
        highestBid = 0.05 ether;
    }

    function claimAuction() external payable isGameLive {
        require(msg.sender == highestBidder, "Insufficent funds");
        require(block.timestamp.sub(auctionStartTime) > 1 days || block.timestamp.sub(lastBid) > 4 hours, "Auction has not completed");
        safeTransferFrom(address(this), highestBidder, 1);
        isAuctionRequested = false;
    }

    function destroyAuction() external isGameLive {
        require(isAuctionRequested, "Can only start an auction if it has been requested");
        require(block.timestamp.sub(auctionStartTime) > 1.5 days, "Never claimed & Auction expired");
        isAuctionRequested = false;
    }

    // ERC721 Overrides
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external virtual  {
        //solhint-disable-next-line max-line-length
        require(!isAuctionRequested, "Cannot transfer when auction has been requested");
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        _transfer(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual  {
        require(!isAuctionRequested, "Cannot transfer when auction has been requested");
        _safeTransfer(from, to, tokenId, "");
    }
}
