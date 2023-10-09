import styles from './adminPanel.module.scss';
import ProducersComponent from './Components/ProducersComponent/ProducersComponent';
import CollectionsComponent from './Components/CollectionsComponent/CollectionsComponent';
import FurnitureComponent from './Components/FurnitureComponent/FurnitureComponent';
import PromotionalFurnitureComponent from './Components/PromotionalFurnitureComponent/PromotionalFurnitureComponent';
import ImageSlider from './Components/ImageSliderComponent/ImageSlider';
import viewCountController from '../../../Api/viewCountController';
import { useLayoutEffect, useState } from 'react';
import StorageComponent from './Components/StorageController/StorageComponent';

export default function AdminPanel() {

    const [isLoggedValue, setIsLoggedValue] = useState(false);



    const isLogged = () => {
        if (localStorage.getItem('selectedShowroom') === 'minsk' && localStorage.getItem('fakeTokenMinsk') === fakeTokenMinsk) {
            setIsLoggedValue(true);
        } else if (localStorage.getItem('selectedShowroom') === 'piaseczno' && localStorage.getItem('fakeTokenPiaseczno') === fakeTokenPiaseczno) {
            setIsLoggedValue(true);
        } else {
            window.location.href = '/signin';
        }

    }

    const [counts, setCounts] = useState(0);

    const getCounts = async () => {

        const res = await viewCountController.getAllViews();
    
        if (!res.ok && !res.counts) return null;

        setCounts(res.counts);
    }


    useLayoutEffect(() => {
        isLogged();
        getCounts();
    }, [])


    return (
        <div className={styles.general}>
            {

                isLoggedValue ? (
                    <>
                        <ImageSlider />
                        <ProducersComponent />
                        <CollectionsComponent />
                        <FurnitureComponent />
                        <PromotionalFurnitureComponent />
                        <StorageComponent />
                        <h1>Liczba odwiedzin: {counts}</h1>
                    </>
                ) : (
                    <>
                    </>
                )

            }

        </div>
    )
}