import styles from './selectShowroomPage.module.scss';
import logo from '../../assets/img/ufo.png';

export default function SelectShowroomPage() {

    const selectShowroomHandler = (showroom: string) => {
        localStorage.setItem('selectedShowroom', showroom);
        window.location.href = "/";
    }

    return (
        <>
        <title>UFO Meble</title>
            <div className={styles.general}>

                <div onClick={() => selectShowroomHandler('minsk')} className={styles.select1}>

                    <div className={styles.cityName}>
                        Mińsk Mazowiecki
                    </div>

                </div>

                <div onClick={() => selectShowroomHandler('piaseczno')} className={styles.select2}>

                    <div className={styles.cityName}>
                        Piaseczno
                    </div>

                </div>

                <div className={styles.logoContainer}>

                    <div className={styles.descriptionContainer}>
                        <div className={styles.description}>

                            <p>JEDNA NAZWA DWIE OFERTY</p>
                            <p>WYBIERZ SWÓJ SALON MEBLOWY</p>
                        </div>
                    </div>

                    <img src={logo} className={styles.logo} alt={'logo'} />
                </div>


            </div>


            <div className={styles.mobileGeneral}>

                <div onClick={() => selectShowroomHandler('minsk')} className={styles.mobileSelect1}>

                    MIŃSK MAZOWIECKI

                </div>

                <div className={styles.mobileLogoContainer}>

                    <div className={styles.mobileDescription}>JEDNA NAZWA DWIE OFERTY</div>

                    <img src={logo} className={styles.mobileLogo} alt={'mobileLogo'} />

                    <div className={styles.mobileDescription}>WYBIERZ SWÓJ SALON MEBLOWY</div>

                </div>


                <div onClick={() => selectShowroomHandler('piaseczno')} className={styles.mobileSelect2}>

                    PIASECZNO

                </div>

            </div>
        </>
    )
}