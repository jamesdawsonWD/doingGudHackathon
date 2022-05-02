pragma solidity 0.8.7;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

interface IFlashLoanReceiver {
    function executeOperation(
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata premiums,
        address initiator,
        bytes calldata params
    ) external returns (bool);
}

interface IWETH {
    function deposit() external payable;

    function withdraw(uint256) external;

    function approve(address guy, uint256 wad) external returns (bool);

    function transferFrom(
        address src,
        address dst,
        uint256 wad
    ) external returns (bool);
}

abstract contract AavaFlashLoan is IFlashLoanReceiver {
    address internal LENDING_POOL;

    constructor(address _lendingPool) {
        LENDING_POOL = _lendingPool;
    }
}
