import { useProvider } from './useProvider';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from 'store/users/actions'
import { addressZero } from 'helpers';
import { ethers } from 'ethers'
import gallery from 'contracts/Gallery.json';


export const useGallery = (galleryAddress: string) => {

    const address = useSelector((state: any) => state.user.address);
    const [totalDonations, setTotalDonations] = useState(0);
    const { signer } = useProvider();
    const [totalNftDonations, setTotalNftDonations] = useState(0);
    const [donations, setDonations] = useState<any[]>([]);
    const [guardian, setGuardian] = useState();
    const [name, setName] = useState();
    const [goal, setGoal] = useState<string>();
    const [description, setDescription] = useState();
    const [Gallery, setGallery] = useState<any>();

    const donate = async (collection: string, tokenID: string, price: string) => {
        console.log(price);
        return Gallery.donate(collection, tokenID, ethers.utils.parseEther(price)).then(() => {
            setTotalNftDonations(totalNftDonations + 1);
            return true
        }).catch((e: Error) => {
            console.log(e);
            return false;
        })
    }
    const buy = (donationID: string, price: string) => {
        return Gallery.buy(donationID, { value: ethers.utils.parseEther(price) }).then(() => {
            return true
        }).catch(() => {
            return false;
        })
    }

    const setup = async () => {
        const _gallery = await new ethers.Contract(galleryAddress, gallery.abi, signer);
        const _totalDonations = await _gallery.totalDonations();
        const _totalNftDonations = await _gallery.totalNftDonations();
        const _guardian = await _gallery.guardian();
        const _name = await _gallery.name();
        const _description = await _gallery.description();
        const _goal = await _gallery.goal();
        setGallery(_gallery);
        setTotalDonations(_totalDonations.toString());
        setTotalNftDonations(_totalNftDonations.toString());
        setGuardian(_guardian);
        setName(_name);
        setGoal(_goal.toString());
        setDescription(_description);
    }

    const fetchDonations = async (total: number) => {
        const donationsP = [];
        for (let i = 1; i <= total; i++) {
            donationsP.push(Gallery.donations(i));
        }
        const donations = await Promise.all(donationsP);
        console.log(donations);
        const newDonations = [];
        for (let donation of donations) {
            const item = {
                collection: donation['collection'],
                donator: donation['donator'],
                price: donation['price'].toString(),
                sold: donation['sold'],
                tokenId: donation['tokenId'].toString(),
                receiptId: donation['receiptId'].toString(),
            }
            newDonations.push(item);

        }
        setDonations(newDonations)
    }

    useEffect(() => {
        fetchDonations(totalNftDonations);
    }, [totalNftDonations]);


    useEffect(() => {
        setup();
    }, [signer]);


    return { donate, buy, fetchDonations, setup, guardian, totalDonations, totalNftDonations, donations, name, description, goal }
}

