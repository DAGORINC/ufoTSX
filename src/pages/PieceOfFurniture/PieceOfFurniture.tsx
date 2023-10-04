import styles from './pieceOfFurniture.module.scss';
import furnitureController from '../../Api/furnitureController';
import promotionalFurnitureController from '../../Api/promotionalFurnitureController';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import dimensionIcon from '../../assets/img/dimension.svg';
import { getShowroomUrl } from '../../services/getShowroomUrl';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/animations/Morphing.json';
import { IFurniture } from '../../interfaces/IFurniture';

const BASE_URL = getShowroomUrl();



export default function Product() {

    const [pieceOfFurnitureData, setPieceOfFurnitureData] = useState<IFurniture | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();

    const getPieceOfFurniture = async () => {
        setLoading(true)

        const res = await furnitureController.getPieceOfFurniture(query.get('furnitureid'));

        if (res.ok) {
            setPieceOfFurnitureData(res.furniture)
        }

        setLoading(false)
    }

    const getPromotionalPieceOfFurniture = async () => {
        setLoading(true)
        const furnitureId = query.get("furnitureid")
        if (!furnitureId) return
        const res = await promotionalFurnitureController.getPieceOfFurniture(furnitureId);
        if (!res?.furniture) return null;
        setPieceOfFurnitureData(res.furniture);
        setLoading(false)
    }

    useEffect(() => {
        getPieceOfFurniture();
        getPromotionalPieceOfFurniture();
    }, [])


    return (
        <>
            {
                loading ? (
                    <div className={styles.loadingContainer}>
                        <Lottie
                            style={{
                                maxWidth: '250px',
                                maxHeight: '250px',
                            }}
                            animationData={loadingAnimation}
                            loop={true}
                        />
                    </div>
                ) : (

                    pieceOfFurnitureData ? (
                        <div className={styles.general} >

                            <div className={styles.firstLineContainer}>

                                <div className={styles.imageDiv}>
                                    <img
                                        className={styles.image}
                                        alt='furniture'
                                        src={`${BASE_URL}${pieceOfFurnitureData.image}`}
                                    />
                                </div>

                                <div>

                                    <div className={styles.name}>
                                        {pieceOfFurnitureData.name}
                                    </div>

                                    <div
                                        className={styles.priceContainer}
                                        style={pieceOfFurnitureData.isPriceVissible
                                            ? { display: 'flex' }
                                            : { display: 'none' }}
                                    >

                                        <div className={styles.crossedPrice}>
                                            {pieceOfFurnitureData.crossed ? `${pieceOfFurnitureData.crossed}zł` : ''}
                                        </div>

                                        <div className={styles.price}>
                                            {pieceOfFurnitureData.price ? `${pieceOfFurnitureData.price}zł` : ''}
                                        </div>

                                    </div>



                                    {pieceOfFurnitureData.depth || pieceOfFurnitureData.height || pieceOfFurnitureData.width
                                        ? <p className={styles.dimensionText}
                                        >
                                            Wymiary
                                        </p>
                                        :
                                        <></>
                                    }

                                    {pieceOfFurnitureData.depth || pieceOfFurnitureData.height || pieceOfFurnitureData.width ? (

                                        <div className={styles.dimensionContainer}>

                                            <img className={styles.dimensionIcon} src={dimensionIcon} alt={'dimension visualisation'}></img>

                                            <div className={styles.dimension}>
                                                <div
                                                    className={`${styles.dimensionPart} ${styles.depth}`}
                                                >
                                                    Głębokość: {pieceOfFurnitureData.depth}cm
                                                </div>

                                                <div
                                                    className={`${styles.dimensionPart} ${styles.height}`}
                                                >
                                                    Wysokość: {pieceOfFurnitureData.height}cm
                                                </div>

                                                <div
                                                    className={`${styles.dimensionPart} ${styles.width}`}
                                                >
                                                    Szerokość: {pieceOfFurnitureData.width}cm
                                                </div>
                                            </div>

                                        </div>
                                    ) : (
                                        <></>
                                    )
                                    }

                                    <div
                                        className={styles.producerLinkContainer}
                                        style={pieceOfFurnitureData.producer
                                            ? { display: 'block' }
                                            : { display: 'none' }}
                                    >
                                        <Link
                                            to={`/meble?producerId=${pieceOfFurnitureData.producer}`}
                                            className={styles.producerLink}
                                        >
                                            Wszystkie meble tego producenta
                                        </Link>
                                    </div>

                                    <div
                                        className={styles.collectionLinkContainer}
                                        style={pieceOfFurnitureData.partCollection
                                            ? { display: 'block' }
                                            : { display: 'none' }}>
                                        <Link
                                            to={`/meble?collectionId=${pieceOfFurnitureData.partCollection}`}
                                            className={styles.collectionLink}
                                        >
                                            Wszystkie meble z tej kolekcji
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.secondLineContainer}>
                                {
                                    pieceOfFurnitureData.description ? (
                                        <div>
                                            <div
                                                className={styles.descriptionName}
                                            >
                                                Opis
                                            </div>
                                            <div
                                                className={styles.description}
                                            >
                                                {pieceOfFurnitureData.description}
                                            </div>

                                        </div>
                                    ) : (
                                        <></>
                                    )
                                }
                            </div>
                        </div >
                    ) : (
                        <div>
                            Dany mebel nie znajduje się w bazie
                        </div>
                    )

                )
            }
        </>
    );
}