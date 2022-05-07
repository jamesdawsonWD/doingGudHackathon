import { useProvider } from './useProvider';
import { useEffect, useState } from "react";
import { ethers } from 'ethers'
import factory from 'contracts/GalleryFactory.json';

export const getEvent = (receipt: any, event: string) =>
    receipt.events?.filter((x: any) => x.event == event);

export async function getEventArg(tx: any, eventName: string, eventArg: string) {
    const receipt = await tx.wait();
    const event = getEvent(receipt, eventName);
    return event[0].args[eventArg];
}

export const useGalleryFactory = (address: string) => {

    const { signer } = useProvider();
    const [GalleryFactory, setGalleryFactory] = useState<any>();
    const [galleries, setGalleries] = useState<any>([]);
    const [totalGalleries, setTotalGalleries] = useState<any>('');
    const setup = async () => {
        const _galleryFactory = await new ethers.Contract(address, factory.abi, signer);
        console.log(signer);
        setGalleryFactory(_galleryFactory);
        const _totalGalleries = await _galleryFactory.totalGalleries();
        setTotalGalleries(_totalGalleries);
    }

    const create = async (name: string, description: string, goal: string) => {
        await GalleryFactory.createGallery(name, description, ethers.utils.parseEther(goal));
        await fetchGalleries();

    }
    const fetchGalleries = async () => {
        const _galleries = [];
        for (let i = 1; i <= totalGalleries.toString(); i++) {
            console.log(GalleryFactory);
            const address = await GalleryFactory.galleries(i);

            _galleries.push(address);
        }
        setGalleries([...galleries, ..._galleries]);
    }

    useEffect(() => {
        setup();
    }, [signer]);

    useEffect(() => {
        fetchGalleries();
    }, [totalGalleries]);


    return { galleries, create }
}

