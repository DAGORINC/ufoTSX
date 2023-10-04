import { Link } from 'react-router-dom'
import styles from './tile.module.scss'
import { FC } from 'react';


interface Tile2Props {
    image: string,
    link: string,
    name: string,
}

const Tile2: FC <Tile2Props> = ({
    image,
    link,
    name,
}) => {

    return (

        <div className={styles.container}>

            <img className={styles.image} alt='Tile2Image' src={`${image}`} />

            <Link to={`${link}`}><div className={styles.text}>{name}</div></Link>

        </div>

    )
};

export default Tile2;