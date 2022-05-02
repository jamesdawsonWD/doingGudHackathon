import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

function _init() {
    const uniswapPool = watchPool('0x...', 5000, fetchPoolPrice);
}

function watchPool(_address: string, _timeout: number, _callback: (string) => void) {
    return setTimeout(_callback.bind(null, _address), _timeout);
}

function fetchPoolPrice(_address: string) {

}
