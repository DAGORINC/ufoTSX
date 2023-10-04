import { Link } from 'react-router-dom'
import styles from './tile.module.scss'
import { FC } from 'react';

interface ITileProps {
    link: string,
    image: string,
    name: string,
}

const Tile: FC <ITileProps> = ({
    link,
    image,
    name,
}) => {
    return (

        <div className={styles.container}>

            <Link to={link}>
                <div className={styles.tile} style={{ backgroundImage: `url(${image})` }}>
                    <Link to={`${link}`}><div className={styles.text}>{name}</div></Link>

                </div>
            </Link>

        </div>

    )
};

export default Tile;