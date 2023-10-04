import styles from './infoBar.module.scss';
import { infoBarData } from './infoBarData';

export default function InfoBar() {
    return (
        <div className={styles.general}>
            {
                !infoBarData ? (
                    <div>
                        Cannot find info bar data!
                    </div>
                ) : (
                    <div className={styles.infoContainer}>
                        {
                            infoBarData.map((info, index) => {
                                if (info.image) {
                                    return (
                                        <div className={styles.infoWithImage} key={index}>
                                            <div>

                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <img src={info.image} className={styles.image} alt={info.name} />
                                                </div>

                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <div className={styles.text}>{info.text}</div>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className={styles.infoWithoutImage} key={index}>

                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <div className={styles.text2}>{info.text2}</div>
                                            </div>

                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <div className={styles.text}>{info.text}</div>
                                            </div>

                                        </div>
                                    )
                                }
                            })}
                    </div>
                )
            }
        </div>
    )
}