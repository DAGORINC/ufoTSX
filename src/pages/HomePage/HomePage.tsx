import ImageSlider from './components/ImageSlider/ImageSlider';
import InfoBar from './components/InfoBar/InfoBar';
import Premises from './components/Premises/Premises';
import Map from './components/Map/Map';
import { useEffect } from 'react';
import viewCounterController from '../../Api/viewCountController';

export default function HomePage() {

    const addCount = async () => {

        const today = new Date();
        const day = today.getDate().toString().padStart(2, "0");
        const month = (today.getMonth() + 1).toString().padStart(2, "0");
        const year = today.getFullYear().toString();

        const formattedDate = `${day}-${month}-${year}`;


        if((localStorage.getItem('LastVisit') !== formattedDate || !localStorage.getItem('LastVisit')) && !localStorage.getItem('fakeTokenMinsk') && !localStorage.getItem('fakeTokenPiaseczno')){
            localStorage.setItem('LastVisit', formattedDate)
            await viewCounterController.newView();
        }
    }

    useEffect(() => {
        addCount();
    }, [])

    return (
        <div>

            <ImageSlider />

            <InfoBar />

            <Premises />

            <Map />

        </div>
    )
}