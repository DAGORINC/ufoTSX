import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { navigationButtons } from './navigationButtons'
import menuIcon from '../../../../assets/img/list.svg'
import styles from './navigation.module.scss';
import logo from '../../../../assets/img/ufo.png';

export default function Navigation() {

    const [position, setPosition] = useState('none')
    const [showMobileMenu, setShowMobileMenu] = useState('-114vh');

    const setShowroomHandler = (showroom: any) => {
        const confirm = window.confirm("Czy na pewno chcesz zmienić salon?")
        if (!confirm) return;
        localStorage.setItem('selectedShowroom', showroom);
        window.location.reload();
    }


    window.addEventListener('scroll', function () {
        const scroll = window.scrollY;
        85 >= scroll ? setPosition('none') : setPosition('block');
    })


    const logoutHandler = () => {

        const confirm = window.confirm('Czy na pewno chcesz się wylogować?')
        if (!confirm) return;

        localStorage.removeItem('fakeTokenMinsk');
        localStorage.removeItem('fakeTokenPiaseczno');
        window.location.reload();
    }



    return (
        <>
            <img
                className={styles.mobileMenuIcon}
                src={menuIcon}
                alt='menu'
                onClick={() => showMobileMenu === '-114vh' ? setShowMobileMenu('0') : setShowMobileMenu('-114vh')}
            />

            <div
                className={styles.mobileMenu}
                style={{ marginTop: showMobileMenu }}
            >

                <div>
                    {
                        localStorage.getItem('fakeTokenMinsk') || localStorage.getItem('fakeTokenPiaseczno')
                            ? (
                                <div className={styles.forAdminMobileContainer}>
                                    <button
                                        onClick={() => window.location.href = '/adminpanel'}
                                        className={styles.adminPanelMobileFButton}
                                    >
                                        Panel Admina
                                    </button>
                                    <button
                                        onClick={logoutHandler}
                                        className={styles.logoutButtonMobile}
                                    >
                                        WYLOGUJ
                                    </button>
                                </div>
                            ) : (
                                <></>
                            )
                    }

                    <div
                        className={styles.mobileNavigationButtonsContainer}
                    >
                        {
                            navigationButtons.map((button, index) => (
                                <div className={styles.mobileNavigationPart}
                                    key={index}
                                >
                                    <div>
                                        <Link
                                            to={button.url}
                                            onClick={() => setShowMobileMenu('-114vh')}
                                        >
                                            <img
                                                className={styles.mobileMenuImage}
                                                src={button.mobileIcon}
                                                alt={button.name}
                                            />
                                        </Link>
                                        <Link
                                            to={button.url}
                                            onClick={() => setShowMobileMenu('-114vh')}
                                        >
                                            <p
                                                className={styles.mobileMenuName}
                                            >
                                                {button.name}
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div
                style={position === 'none'
                    ? { display: 'none', marginTop: '-300' }
                    : { display: 'flex', position: 'fixed', marginTop: '0' }}
                className={styles.popUpNavigation}
            >
                {
                    navigationButtons.map((button, index) => (
                        <Link
                            to={button.url}
                            key={index}
                        >
                            <div
                                key={index}
                                className={styles.popUpButtonPart}
                            >
                                {button.name}
                                {/* {
                                    button.hasArrow ? (
                                        <svg className={styles.arrowDown} xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                    ) : (
                                        <></>
                                    )
                                } */}
                            </div>
                            {/* {button.hasArrow ? <div className={styles.expand} /> : <></>} */}
                        </Link>
                    ))
                }
                <Link className={styles.mobileLogoContainer} to='/'><img className={styles.mobileLogo} alt='logo' src={logo} /></Link>
            </div>

            <div className={styles.general}>

                <div className={styles.firstLane} >

                    <div className={styles.logoContainer}>
                        <Link
                            to='/'
                            className={styles.logoLink}
                        >
                            <img
                                className={styles.logo}
                                alt='logo'
                                src={logo}
                            />
                        </Link>
                    </div>

                    <div className={styles.selectShowroomContainer}>

                        {localStorage.getItem('selectedShowroom') === 'minsk' ? (
                            <div className={styles.selectedShowroomContainer}>
                                <div className={styles.selectedShowroom}>
                                    <Link
                                        className={styles.selectShowroomLink}
                                        to='/wybierz-salon'
                                    >
                                        Mińsk Mazowiecki
                                        <svg
                                            className={styles.arrow}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                                <div
                                    className={styles.unselectedShowroom}
                                    onClick={() => { setShowroomHandler('piaseczno') }}
                                >
                                    | Piaseczno
                                </div>
                            </div>

                        ) : (

                            <div
                                className={styles.selectedShowroomContainer}
                            >
                                <div
                                    className={styles.selectedShowroom}
                                >
                                    <Link
                                        className={styles.selectShowroomLink}
                                        to='/wybierz-salon'
                                    >
                                        Piaseczno
                                        <svg
                                            className={styles.arrow}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                                <div
                                    className={styles.unselectedShowroom}
                                    onClick={() => { setShowroomHandler('minsk') }}>
                                    | Mińsk Mazowiecki
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={styles.forAdminContainer}>

                        <div className={styles.cityLoginCheckContainer}>
                            <div>
                                {
                                    localStorage.getItem('fakeTokenMinsk') && <>Jesteś zalogowany w UFO Mińsk</>
                                }
                            </div>

                            <div>
                                {
                                    localStorage.getItem('fakeTokenPiaseczno') && <>Jesteś zalogowany w UFO Piaseczno</>
                                }
                            </div>
                        </div>

                        <div>
                            {
                                localStorage.getItem('fakeTokenMinsk') || localStorage.getItem('fakeTokenPiaseczno') ? (
                                    <div>
                                        <Link to={'/adminpanel'} className={styles.adminPanelButton}>Panel Admina</Link>
                                        <button onClick={logoutHandler} className={styles.logoutButton}>WYLOGUJ</button>
                                    </div>
                                ) : (
                                    <></>
                                )
                            }
                        </div>
                    </div>
                </div>

                <div className={styles.buttons}>
                    {
                        navigationButtons.map((button, index) => (
                            <Link to={button.url} key={index}>
                                <div key={index} className={styles.buttonPart}>
                                    {button.name}
                                    {/* {
                                        button.hasArrow ? (
                                            <svg className={styles.arrowDown} xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                            </svg>
                                        ) : (
                                            <></>
                                        )
                                    } */}
                                </div>
                                {/* {button.hasArrow ? <div className={styles.expand} /> : <></>} */}
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    )
}