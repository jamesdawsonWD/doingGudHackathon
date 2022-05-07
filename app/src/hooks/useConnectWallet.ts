import { useCheckNetwork } from './useCheckNetwork';
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import * as userActions from 'store/users/actions'
import { addressZero } from 'helpers';
import { ethers } from 'ethers'
export const useConnectWallet = () => {

    const [address, setAddress] = useState(addressZero);
    const [error, setError] = useState(addressZero);
    const [networkId, setNetworkId] = useState('');
    const [provider, setProvider] = useState<any>(null);
    const { checkNetworkError, checkNetworkErrorMessage } = useCheckNetwork(networkId);
    const dispatch = useDispatch();

    const connect = () => {
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(([selectedAddress]: string[]) => {
                setAddress(selectedAddress)
                dispatch(userActions.setAddress(selectedAddress));
                dispatch(userActions.setProvider(provider));
            })
            .catch((e: unknown) => setError(e as string))
    }

    const disconnect = () => {
        setNetworkId('');
        setAddress(addressZero);
        dispatch(userActions.setAddress(addressZero));
        setError('');
    }

    window.ethereum.on("accountsChanged", ([newAddress]: string[]) => {
        if (newAddress === undefined) {
            setAddress(addressZero);
            dispatch(userActions.setAddress(newAddress));
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

