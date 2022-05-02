import { useCheckNetwork } from './useCheckNetwork';
import { useEffect, useState } from "react";
import { addressZero } from 'helpers';
export const useConnectWallet = () => {

    const [address, setAddress] = useState(addressZero);
    const [error, setError] = useState(addressZero);
    const [networkId, setNetworkId] = useState('');

    const { checkNetworkError, checkNetworkErrorMessage } = useCheckNetwork(networkId);

    const connect = () => {
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(([selectedAddress]: string[]) => setAddress(selectedAddress))
            .catch((e: unknown) => setError(e as string))
    }

    const disconnect = () => {
        setNetworkId('');
        setAddress(addressZero);
        setError('');
    }

    window.ethereum.on("accountsChanged", ([newAddress]: string[]) => {
        if (newAddress === undefined) {
            setAddress(addressZero);
        } else {
            setAddress(newAddress);
        }
    });

    window.ethereum.on("chainChanged", ([networkId]: string[]) => {
        setNetworkId(networkId);
    });
    useEffect(() => {
        setNetworkId(window.ethereum.networkVersion);
    }, [networkId]);

    useEffect(() => {
        if (checkNetworkError)
            setError(checkNetworkErrorMessage);
    }, [checkNetworkError, checkNetworkErrorMessage]);


    return { address, connect, disconnect, error }
}

