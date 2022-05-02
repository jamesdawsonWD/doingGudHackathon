import { useEffect, useState } from "react";

const HARDHAT_NETWORK_ID = '31337';

export const useCheckNetwork = (chainId: string): { checkNetworkErrorMessage: string, checkNetworkError: boolean } => {

    const [checkNetworkErrorMessage, setcheckNetworkErrorMessage] = useState('');
    const [checkNetworkError, setCheckNetworkErrorr] = useState(false);
    useEffect(() => {
        setCheckNetworkErrorr(chainId !== HARDHAT_NETWORK_ID);
        if (chainId !== HARDHAT_NETWORK_ID) {
            setcheckNetworkErrorMessage('Please connect Metamask to Localhost:8545');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chainId]);

    return { checkNetworkErrorMessage, checkNetworkError };
}
