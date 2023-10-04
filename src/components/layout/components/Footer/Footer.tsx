import styles from './footer.module.scss';
import mailIcon from '../../../../assets/img/mailIcon.svg';
import telephoneIcon from '../../../../assets/img/telephone.svg';
import navigationIcon from '../../../../assets/img/navigationblack.svg';
import { useLocation } from 'react-router-dom';
import { FC } from 'react';

const Contact: FC = () => {
    return (
        <div className={styles.contact}>

            <div className={styles.shop}>

                <h2>Mińsk Mazowiecki</h2>

                <div>

                    <div className={styles.adresContainer}>
                        <img className={styles.telephoneIcon} src={telephoneIcon} alt='phone' />
                        <a className={styles.adresPart} href='tel:25 758 12 17'> 25-758-12-17</a>
                    </div>

                    <div className={styles.adresContainer}>
                        <img className={styles.mailIcon} src={mailIcon} alt='mail' />
                        <a className={styles.adresPart} href='mailto:biuro@ufo-meble.pl'> biuro@ufo-meble.pl</a>
                    </div>

                    <div className={styles.adresContainer}>
                        <img className={styles.navigationIcon} src={navigationIcon} alt='adres' />
                        <a className={styles.adresPart} href='https://goo.gl/maps/A4B7CHgHQ2oozQR69'> 05-300 Mińsk Mazowiecki,<p style={{ margin: 0 }} /> Stojadła ul. Warszawska 93/95</a>
                    </div>

                </div>

            </div>

            <div className={styles.shop}>

                <h2>Piaseczno</h2>

                <div>

                    <div className={styles.adresContainer}>
                        <img className={styles.telephoneIcon} src={telephoneIcon} alt='phone' />
                        <a className={styles.adresPart} href='tel:25 758 12 17'> 22-716-70-17</a>
                    </div>

                    <p className={styles.adresContainer}>
                        <img className={styles.mailIcon} src={mailIcon} alt='mail' />
                        <a className={styles.adresPart} href='mailto:ufopiaseczno@wp.pl'> ufopiaseczno@wp.pl</a>
                    </p>

                    <div className={styles.adresContainer}>
                        <img className={styles.navigationIcon} src={navigationIcon} alt='adres' />
                        <a className={styles.adresPart} href='https://goo.gl/maps/mUvMC2SwZ9z2BqSF8'> 05-500 Piaseczno,<p style={{ margin: 0 }} /> plac Piłsudskiego 6</a>
                    </div>

                </div>


            </div>

        </div>
    )
}

const Footer: FC = () => {

    const navigation = useLocation()

    return (
        <div className={styles.general}>

            {
                navigation.pathname !== '/kontakt' && <Contact />
            }

            <div style={{ textAlign: 'center', padding: '30px', fontSize: '16px', flexWrap: 'wrap' }}>

                Przedstawiona oferta nie stanowi oferty w rozumieniu Kodeksu Cywilnego, jest jedynie zaproszeniem do rozpoczęcia rokowań (zgodnie z art. 71 k.c.)
                Z uwagi na różnorodność monitorów oraz kart graficznych z których klienci korzystają wyświetlane kolory mogą różnic się od rzeczywistych.

            </div>

            <div className={styles.copyrightsContainer}>

                <div className={styles.copyrightsBottomContainer}>

                    <div style={{ display: 'flex' }}>
                        UFO Spółka z ograniczoną odpowiedzialnością 2023  |
                    </div>

                    <a className={styles.myEmail} href="mailto:DAMIAM.G.PG@GMAIL.COM"> Realizacja: © Damian Gorzkowski</a>

                </div>

            </div>


        </div>
    )
}

export default Footer