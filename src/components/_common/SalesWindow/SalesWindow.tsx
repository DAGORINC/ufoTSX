import { Link } from 'react-router-dom';
import styles from './salesWindow.module.scss';
import { IFurniture } from '../../../interfaces/IFurniture';
import { FC } from 'react';

interface SalesWindowProps {
    furniture: IFurniture,
    image: string,
    
}

const SalesWindow: FC <SalesWindowProps> = ({
    furniture,
    image,
}) => {
    return (
        <Link to={`/mebel?furnitureid=${furniture._id}`}>
            <div className={styles.container}>

                {/* <a href={`/pieceOfFurniture?furnitureid=${furniture._id}`} > */}
                <div>

                    <div className={styles.imageDiv}>
                        <img className={styles.image} src={image} key={furniture.name} alt={furniture.name} />
                    </div>

                    <div className={styles.name}>
                        {furniture.name}
                    </div>

                    {furniture.width ? (
                        <div className={styles.dimensions}>

                            <div className={styles.dimension}>
                                Szerokość:
                            </div>

                            <div className={styles.dimensionValue}>
                                {furniture.width} cm
                            </div>

                        </div>
                    ) : (
                        <div style={{ color: 'white' }} className={styles.dimensions}>

                            <div style={{ color: 'white' }} className={styles.dimension}>
                            </div>

                            <div style={{ color: 'white' }} className={styles.dimensionValue}>
                                cm
                            </div>

                        </div>
                    )
                    }

                    {furniture.depth ? (
                        <div className={styles.dimensions}>

                            <div className={styles.dimension}>
                                Głębokość:
                            </div>

                            <div className={styles.dimensionValue}>
                                {furniture.depth} cm
                            </div>

                        </div>
                    ) : (
                        <div style={{ color: 'white' }} className={styles.dimensions}>

                            <div style={{ color: 'white' }} className={styles.dimension}>
                            </div>

                            <div style={{ color: 'white' }} className={styles.dimensionValue}>
                                cm
                            </div>

                        </div>
                    )
                    }

                    {furniture.height ? (
                        <div className={styles.dimensions}>

                            <div className={styles.dimension}>
                                Wysokość:
                            </div>

                            <div className={styles.dimensionValue}>
                                {furniture.height} cm
                            </div>

                        </div>
                    ) : (
                        <div style={{ color: 'white' }} className={styles.dimensions}>

                            <div style={{ color: 'white' }} className={styles.dimension}>
                            </div>

                            <div style={{ color: 'white' }} className={styles.dimensionValue}>
                                cm
                            </div>

                        </div>
                    )
                    }


                    {furniture.isPriceVissible ? (
                        <div className={styles.price}>
                            {/* <div className={styles.addImage}>
                            <a className={styles.addIcon} href={'SOME ADD FUNCTION'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-folder-plus" viewBox="0 0 16 16">
                                    <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z" />
                                    <path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z" />
                                </svg>
                            </a>
                        </div> */}

                            {furniture.price}zł

                            <div className={styles.crossed}>
                                {furniture.crossed ? `${furniture.crossed}zł` : ''}
                            </div>

                        </div>
                    ) : (
                        <div className={styles.price} >
                            {/* <div className={styles.addImage}>
                            <a className={styles.addIcon} href={'SOME ADD FUNCTION'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-folder-plus" viewBox="0 0 16 16">
                                    <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z" />
                                    <path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z" />
                                </svg>
                            </a>
                        </div> */}
                        </div>
                    )
                    }

                </div>
            </div>
        </Link>
    )
}

export default SalesWindow;