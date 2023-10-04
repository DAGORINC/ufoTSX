import styles from './producers.module.scss';
import SmallTile from '../../components/_common/SmallTile/SmallTile';
import { useState } from 'react';
import { useEffect } from 'react';
import producersController from '../../Api/producersController';
import { getShowroomUrl } from '../../services/getShowroomUrl';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/animations/Morphing.json';
import { IProducer } from '../../interfaces/IProducer';

const BASE_URL = getShowroomUrl();

export default function Producers() {

    const [producersData, setProducers] = useState<IProducer[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getAllProducers = async () => {
        setLoading(true)
        const res = await producersController.getAllProducers();
        setProducers(res.producers);
        setLoading(false)
    }

    useEffect(() => {
        getAllProducers();
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
                    !producersData || !Array.isArray(producersData) || producersData.length === 0 ? (

                        <div>
                            Nie znaleziono producentów
                        </div>

                    ) : (

                        producersData.map((producer, index) => {
                            return (
                                <SmallTile
                                    key={index}
                                    name={producer.name}
                                    logo={`${BASE_URL}${producer.logo}`}
                                    link={producer.link || '/producenci'}
                                // link={`/meble?producerId=${producer._id}`}
                                />
                            )
                        })
                    )
                )
            }


        </div>
    )
}