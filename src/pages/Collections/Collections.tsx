import styles from './collections.module.scss';
import Tile from '../../components/_common/Tile2/Tile';
import { useState, useEffect, FC } from 'react';
import collectionsController from '../../Api/collectionsController';
import { getShowroomUrl } from '../../services/getShowroomUrl';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/animations/Morphing.json';
import { ICollection } from '../../interfaces/ICollection';

const BASE_URL = getShowroomUrl();

interface CollectionsProps {
}

const Collections: FC<CollectionsProps> = () => {

    const [collectionsData, setCollectionsData] = useState<ICollection[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getAllCollections = async () => {
        setLoading(true)
        const res = await collectionsController.getAllCollections();
        setCollectionsData(res.collections)
        setLoading(false)
    }

    useEffect(() => {
        getAllCollections();
    }, [])

    return (
        <div className={styles.general}>
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
                    !collectionsData || !Array.isArray(collectionsData) || collectionsData.length === 0 ? (
                        <div>
                            Nie znaleziono kolekcji
                        </div>
                    ) : (
                        collectionsData.map((collection, index) => {
                            return (
                                <Tile
                                    key={index}
                                    link={`/meble?collectionId=${collection._id}`}
                                    name={collection.name}
                                    image={`${BASE_URL}${collection.image}`}
                                />
                            )
                        })
                    )
                )
            }
        </div>
    )
}

export default Collections;