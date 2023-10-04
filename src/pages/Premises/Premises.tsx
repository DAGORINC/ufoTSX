import styles from './premises.module.scss';
import { premisesData } from './premisesData';
import Tile from '../../components/_common/Tile/Tile';

export default function Premises() {
    return (
        <div className={styles.general}>
            

            {
                !premisesData || !Array.isArray(premisesData) ? (

                    <div>
                        No premise data!
                    </div>

                ) : (

                    premisesData.map((premise, index) => {
                        return (
                            <Tile key={index} {...premise} link={`/meble?premiseName=${premise.name}`}/>
                        )
                    })
                )
            }
        </div>
    )
}
