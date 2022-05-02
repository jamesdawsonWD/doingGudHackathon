pragma solidity 0.8.7;

import '../interfaces/IUniswapV2Router01.sol';
contract UniswapV2Swapper {

    IUniswapV2Router01 internal router;
    constructor(address _uniswap) {
        router = IUniswapV2Router01(_uniswap);
    }

    function swap(address _from, address _to, uint256 _amountOut, uint256 _amountInMax) public returns (uint[] memory ){
         address[] memory _path = new address[](2);
             _path[0] = _from;
             _path[1] = _to;
        return router.swapTokensForExactTokens( _amountOut, _amountInMax, _path, msg.sender, block.timestamp + 1 minutes);
    }
}
