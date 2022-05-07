import { useEffect, useState } from "react";

import { ethers } from 'ethers'
export const useProvider = () => {

    const [provider, setProvider] = useState<any>();
    const [signer, setSigner] = useState<any>();

    useEffect(() => {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        const _signer = _provider.getSigner()
        setProvider(_provider);
        setSigner(_signer);
    }, []);
    return { provider, signer }
}

