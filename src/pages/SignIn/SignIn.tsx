import { useState } from 'react';
import styles from './signIn.module.scss';
import adminPanelIcon from '../../assets/img/ufo.png';

const SignIn = () => {

    const [passwordValue, setPassword] = useState('');

    const passwordMinsk = 'VE%V^*w4x5w4x75h098iqwjdfm08';
    const passwordPiaseczno = 'piunhi0h^*&F%^dcg608h78';
    const fakeTokenMinsk = '1ht21908g19unggb18670gbnfy89fn12y189fn2y89nf21y89fn12y89nf12y89nf12nyf93y79n193ay7asy79ny79nc7y379564g846er45s2s3df1sfc826cfgvbysach7h812f590nq1g3g21ghg2hy454jh54jyn';
    const fakeTokenPiaseczno = 'd1230yfybcb8989ym89yz1mem8y9089my0e890my32yt707t0cvt73f4v9y78fyv9397b7byy9byb9yzq1y1y9ybxy23eyy79x2yeyx327ybn9vu890g543iuhghsjdgfhjksdgfoiug80p8238n9k0-09j2j2ugb';


    const changePasswordHandler = (event: any) => {
        const password = event.target.value;
        setPassword(password);
    }


    const changeShowroom = (showroom: string) => {
        localStorage.setItem('selectedShowroom', showroom);
        window.location.reload();
    }


    const checkPassword = () => {
        if (localStorage.getItem('selectedShowroom') === 'minsk' && passwordValue === passwordMinsk) {
            localStorage.setItem('fakeTokenMinsk', fakeTokenMinsk)
            window.location.href = '/adminPanel';
        } else if (localStorage.getItem('selectedShowroom') === 'piaseczno' && passwordValue === passwordPiaseczno) {
            localStorage.setItem('fakeTokenPiaseczno', fakeTokenPiaseczno)
            window.location.href = '/adminPanel';
        } else {
            return null;
        }

    }

    return (
        <div className={styles.general}>

            <div className={styles.generalContainer}>


                <div className={styles.loginContainer}>

                    <div className={styles.imageContainer}>
                        <img onClick={() => window.location.href = '/'} className={styles.logo} alt='ufo logo' src={adminPanelIcon} />
                    </div>


                    <div className={styles.cityNameContainer}>{localStorage.getItem('selectedShowroom') === 'minsk' ?
                        (
                            <div>
                                <div className={styles.selectedShowroom}>Mińsk Mazowiecki</div>
                                <div onClick={() => changeShowroom('piaseczno')} className={styles.unselectedShowroom}>Piaseczno</div>
                            </div>
                        ) : (
                            <div>
                                <div className={styles.selectedShowroom}>Piaseczno</div>
                                <div onClick={() => changeShowroom('minsk')} className={styles.unselectedShowroom}>Mińsk Mazowiecki</div>
                            </div>
                        )
                    }</div>


                    <div className={styles.captionLogin}>Logowanie</div>


                    <div className={styles.captionPassword}>
                        Hasło
                    </div>

                    <div className={styles.passwordInputContainer}>
                        <input className={styles.passwordInput}
                            onKeyDown={e => { if (e.key === 'Enter') checkPassword() }}
                            onChange={changePasswordHandler}
                            value={passwordValue}
                            type='password' />
                    </div>

                    <div className={styles.buttonContainer}>
                        <button
                            className={styles.loginButton}
                            onClick={checkPassword}>
                            Zaloguj
                        </button>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default SignIn;