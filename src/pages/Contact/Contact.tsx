import styles from './contact.module.scss';
import navigationIcon from '../../assets/img/navigation.svg';
import pdfIcon from '../../assets/img/pdfIcon.svg';
import pdfFormMinsk from '../../assets/files/formularzReklamacyjny.pdf';

export default function Contact() {
    return (
        <div className={styles.general}>

            <div className={styles.contactContainer}>

                <p className={styles.contact}>Kontakt</p>

                <div className={styles.shopContainer}>


                    <div className={styles.shop1}>

                        <div className={styles.cityNavigationLinkDiv}>
                            <a href='https://goo.gl/maps/A4B7CHgHQ2oozQR69'>
                                <div className={styles.cityNameDiv}>
                                    <img className={styles.navigationIcon} alt='minsk mazowiecki' src={navigationIcon} />
                                    <p className={styles.cityName}>Mińsk Mazowiecki</p>
                                </div>
                            </a>
                        </div>


                        <div>

                            <div className={styles.adres}>

                                <strong>Adres sklepu: </strong>
                                <p className={styles.adresPart}>Stojadła ul. Warszawska 93/95</p>
                                <p className={styles.adresPart}>05-300 Mińsk Mazowiecki</p>
                                <strong>Czynne:</strong>
                                <p className={styles.adresPart}>Poniedziałek - Piątek 10:00-18:00</p>
                                <p className={styles.adresPart}>Sobota 10:00-14:00</p>

                            </div>

                            <div>
                                <strong>Obsługa klienta: </strong>
                                <p className={styles.adresPart}><a className={styles.adresPart} href='tel:25 758 12 17'>tel. 25-758-12-17</a></p>
                                <p className={styles.adresPart}><a className={styles.adresPart} href='tel:602 631 217'>tel. 602-631-217</a></p>
                                <p className={styles.adresPart}><a className={styles.adresPart} href='mailto:biuro@ufo-meble.pl'>Email: biuro@ufo-meble.pl</a></p>
                            </div>

                            <div>
                                <strong>Dział reklamacji</strong>
                                <p className={styles.adresPart}><a className={styles.adresPart} href='tel: 25 759 62 40'>tel. 25-759-62-40</a></p>
                                <p className={styles.adresPart}><a className={styles.adresPart} href='mailto:reklamacje@ufo-meble.pl'>Email: reklamacje@ufo-meble.pl</a></p>
                                <p className={styles.pdfIconContainer}>
                                    <a className={styles.pdfLink} href={pdfFormMinsk} download={'Formularz reklamacyjny UFO Mińsk Mazowiecki'}>
                                        Pobierz formularz reklamacyjny
                                        <img className={styles.pdfIcon} alt='pdf' src={pdfIcon} />
                                    </a>
                                </p>
                            </div>


                        </div>

                    </div>

                    <div className={styles.shop2}>

                        <div className={styles.cityNavigationLinkDiv}>
                            <a href='https://goo.gl/maps/mUvMC2SwZ9z2BqSF8'>
                                <div className={styles.cityNameDiv}>

                                    <img className={styles.navigationIcon} alt='piaseczno' src={navigationIcon} />
                                    <p className={styles.cityName}>Piaseczno</p>

                                </div>
                            </a>
                        </div>

                        <div>

                            <div className={styles.adres}>

                                <strong>Adres sklepu: </strong>
                                <p className={styles.adresPart}>plac Piłsudskiego 6</p>
                                <p className={styles.adresPart}>05-500 Piaseczno</p>
                                <strong>Czynne:</strong>
                                <p className={styles.adresPart}>Poniedziałek 12:00-20:00</p>
                                <p className={styles.adresPart}>Wtorek - Piątek 10:00-18:00</p>
                                <p className={styles.adresPart}>Sobota 10:00-14:00</p>

                            </div>

                            <div>
                                <strong>Obsługa klienta: </strong>
                                <p className={styles.adresPart}><a className={styles.adresPart} href='tel:22 716 70 17'>tel. 22-716-70-17</a></p>
                                <p className={styles.adresPart}><a className={styles.adresPart} href='mailto:ufopiaseczno@wp.pl'>Email: ufopiaseczno@wp.pl</a></p>
                            </div>


                        </div>




                    </div>

                </div>

            </div>


        </div>
    )
}