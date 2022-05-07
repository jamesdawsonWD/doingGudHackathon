import { useProvider } from './useProvider';
import { useEffect, useState } from "react";
import { ethers } from 'ethers'
import nft from 'contracts/TestNFT.json';
import { useSelector } from 'react-redux';

export const getEvent = (receipt: any, event: string) =>
    receipt.events?.filter((x: any) => x.event == event);

export async function getEventArg(tx: any, eventName: string, eventArg: string) {
    const receipt = await tx.wait();
    const event = getEvent(receipt, eventName);
    return event[0].args[eventArg];
}

export const useNft = (collection: string, wallet: string) => {

    const { signer } = useProvider();
    const [Nft, setNft] = useState<any>();
    const [balance, setBalance] = useState<any>([]);
    const [approvals, setApprovals] = useState<any>();
    const [totalSupply, setTotalSupply] = useState<any>();
    const [name, setName] = useState<any>();
    const [symbol, setSymbol] = useState<any>();

    const setup = async () => {
        const _nft = await new ethers.Contract(collection, nft.abi, signer);
        const _totalSupply = await _nft.totalSupply();
        const _symbol = await _nft.symbol();
        const _name = await _nft.name();

        setTotalSupply(_totalSupply);
        setSymbol(_symbol);
        setName(_name);
        setNft(_nft);

        await fetchBalance(wallet);
    }

    const approve = async (to: string, tokenId: string) => {
        Nft.approve(to, tokenId)
            .then(() => {
                setApprovals({
                    ...approvals,
                    tokenId: to
                })
            })
            .catch((e: Error) => console.log(e));
    }

    const fetchApproved = async (tokenId: string, address: string) => {
        Nft.getApproved(tokenId).then((approved: string) => {
            setApprovals({
                ...approvals,
                tokenId: address
            })
        });
    }

    const mint = async () => {
        const tx = await Nft.mint();
        const tokenId = await getEventArg(tx, "Transfer", "tokenId");
        console.log(tokenId.toString());
        setBalance([...balance, tokenId.toString()]);
    }

    const fetchBalance = async (owner: string) => {
        const _balance = [];
        console.log(totalSupply);
        for (let i = 1; i < totalSupply.toString(); i++) {
            const owned = await Nft.ownerOf(i);

            if (owned.toLowerCase() === owner.toLowerCase()) {
                _balance.push(i);
            }
        }
        setBalance([...balance, ..._balance]);
    }


    useEffect(() => {
        fetchBalance(wallet);
    }, [totalSupply]);

    useEffect(() => {
        setup();
    }, [signer]);


    return { Nft, approve, fetchApproved, approvals, mint, balance, fetchBalance, name, symbol }
}

