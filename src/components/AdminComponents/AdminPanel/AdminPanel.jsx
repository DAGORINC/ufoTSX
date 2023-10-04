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

    const fakeTokenMinsk = '1ht21908g19unggb18670gbnfy89fn12y189fn2y89nf21y89fn12y89nf12y89nf12nyf93y79n193ay7asy79ny79nc7y379564g846er45s2s3df1sfc826cfgvbysach7h812f590nq1g3g21ghg2hy454jh54jyn';
    const fakeTokenPiaseczno = 'd1230yfybcb8989ym89yz1mem8y9089my0e890my32yt707t0cvt73f4v9y78fyv9397b7byy9byb9yzq1y1y9ybxy23eyy79x2yeyx327ybn9vu890g543iuhghsjdgfhjksdgfoiug80p8238n9k0-09j2j2ugb';


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