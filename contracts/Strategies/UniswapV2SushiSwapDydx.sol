pragma solidity ^0.8.7;

import "../Flashloans/DydxFlashloan.sol";
import "../interfaces/IUniswapV2Router01.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UniswapV2SushiSwapDydx is DyDxFlashLoan, Ownable {
    uint256 private loanAmount;
    IUniswapV2Router01 internal uniswap;
    IUniswapV2Router01 internal sushiswap;

    function callFunction(
        address,
        /* sender */
        Info calldata,
        /* accountInfo */
        bytes calldata data
    ) external override onlyPool {
        (
            address flashToken,
            uint256 flashAmount,
            uint256 balanceBefore,
            address arbToken,
            bytes memory zrxData,
            uint256 oneSplitMinReturn,
            uint256[] memory oneSplitDistribution
        ) = abi.decode(data, (address, uint256, uint256, address, bytes, uint256, uint256[]));

        uint256 balanceAfter = IERC20(flashToken).balanceOf(address(this));
        require(balanceAfter - balanceBefore == flashAmount, "contract did not get the loan");
        loanAmount = balanceAfter;
    }

    function arbitrage(
        address _fromPool,
        address _toPool,
        address _from,
        address _to,
        uint256 _amountOut,
        uint256 _amountInMax
    ) public onlyOwner {
        uint256 _startBalance = IERC20(_from).balanceOf(address(this));

        swap(IUniswapV2Router01(_fromPool), _from, _to, _amountOut, _amountInMax);
        swap(IUniswapV2Router01(_toPool), _to, _from, _amountOut, _amountInMax);

        uint256 _endBalance = IERC20(_from).balanceOf(address(this));
        require(_endBalance > _startBalance, "Failed to make profit");
    }

    function swap(
        IUniswapV2Router01 pool,
        address _from,
        address _to,
        uint256 _amountOut,
        uint256 _amountInMax
    ) public returns (uint256[] memory) {
        address[] memory _path = new address[](2);
        _path[0] = _from;
        _path[1] = _to;
        // solhint-disable-next-line
        uint256 cancelTime = block.timestamp + 1 minutes;
        return pool.swapTokensForExactTokens(_amountOut, _amountInMax, _path, msg.sender, cancelTime);
    }
}
