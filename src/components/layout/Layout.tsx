import styles from './layout.module.scss'
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';

export default function Layout(routeProps: any) {

    document.title = routeProps.title;
    return (
        <div>

            <div className={styles.navigation}>
                <Navigation />
            </div>

            <div>
                <>{routeProps.children}</>
            </div>

            <div>
                <Footer/>
            </div>

        </div>
    )
}