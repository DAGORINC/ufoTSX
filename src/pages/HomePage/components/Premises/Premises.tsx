import styles from './premises.module.scss';
import Tile from '../../../../components/_common/Tile/Tile';
import { premisesData } from '../../../../pages/Premises/premisesData';
import img from '../../../../assets/img/ufo.png';

export default function Premises() {
    return (
        <div className={styles.premises}>
            {
                !premisesData || !Array.isArray(premisesData) ? (

                    <div>
                        No premise data!
                    </div>

                ) : (

                    premisesData.map((premise, index) => {
                        return (
                            index < 4 ? <Tile key={index} {...premise} link={`/meble?premiseName=${premise.name}`}/> : null
                        )
                    })
                )
            }
            <Tile key={'unique'} name={'Zobacz więcej'} link={'/pomieszczenia'} image={img}  />
            
        </div>
    )
}