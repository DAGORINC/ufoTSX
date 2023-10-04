import { useEffect, useState } from 'react';
import styles from './promotions.module.scss';
import promotionalFurnitureController from '../../Api/promotionalFurnitureController';
import SalesWindow from '../../components/_common/SalesWindow/SalesWindow';
import { getShowroomUrl } from '../../services/getShowroomUrl';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/animations/Morphing.json';
import { IFurniture } from '../../interfaces/IFurniture';

const BASE_URL = getShowroomUrl();

export default function Promotions() {

    const [promotionalFurnitureData, setPromotionalFurnitureData] = useState<IFurniture[] | null>(null);
    const [loading, setLoading] = useState(true);

    const getAllFurniture = async () => {
        setLoading(true)
        const res = await promotionalFurnitureController.getAllFurniture();
        setPromotionalFurnitureData(res.furniture);
        setLoading(false)
    }

    useEffect(() => {
        getAllFurniture();
    }, []);

    return (
        <div className={styles.general}>

            <div className={styles.furnitureContainer}>

                {
                    loading ? (
                        <Lottie
                            style={{
                                maxWidth: '250px',
                                maxHeight: '250px',
                            }}
                            animationData={loadingAnimation}
                            loop={true}
                        />
                    ) : (
                            !promotionalFurnitureData
                            || !Array.isArray(promotionalFurnitureData)
                            || promotionalFurnitureData.length === 0
                            ? (
                                <div style={{
                                    marginTop: '150px'
                                }}>
                                    Brak mebli
                                </div>
                            ) : (

                                promotionalFurnitureData.map((furniture, index) => {
                                    return (
                                        <div key={index}>
                                            <SalesWindow
                                                key={index}
                                                furniture={furniture}
                                                image={`${BASE_URL}${furniture.image.replace('promotionalFurnitureImages', 'promotionalFurnitureImages/thumbnailImages')}`}
                                            />
                                        </div>
                                    )
                                })

                            )
                    )
                }

            </div>

        </div>
    )
}