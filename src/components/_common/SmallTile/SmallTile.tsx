import { Link } from 'react-router-dom';
import styles from './smallTile.module.scss';
import { FC } from 'react';

interface SmallTileProps {
    link: string,
    logo: string,
    name: string,
    key?: number,
}

const SmallTile: FC<SmallTileProps> = ({
    link,
    logo,
    name,
}) => {
    return (
        <div className={styles.general}>

            <Link className={styles.link} to={link}>
                <div className={styles.container}>
                    <img className={styles.image} alt='furniture' src={logo} />
                </div>

                <div className={styles.name}>
                    {name}
                </div>
            </Link>

        </div>
    )
}

export default SmallTile;