import styles from './map.module.scss';

export default function Map() {
    return (
        <div className={styles.general}>

            <h1 className={styles.text}>Odwiedź jeden z naszych salonów!</h1>


            <div className={styles.mapsContainer}>


                <div className={styles.mapsContainerChild}>

                    <h1 className={styles.text}>Mińsk Mazowiecki</h1>

                    <div className={styles.mapContainer}>

                        <iframe title={'mińsk map'} className={styles.map} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4891.707324497183!2d21.521839331867426!3d52.191532646210455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471f2e83bff6b377%3A0x8b3e88356864cf35!2sUFO%20Salon%20meblowy!5e0!3m2!1spl!2spl!4v1661857585234!5m2!1spl!2spl" />

                    </div>

                </div>




                <div className={styles.mapsContainerChild}>

                    <h1 className={styles.text}>Piaseczno</h1>

                    <div className={styles.mapContainer}>

                        <iframe title={'piaseczno map'} className={styles.map} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d613.0719425139616!2d21.02806531547433!3d52.0744911250938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47192e412091b9c5%3A0x218cf2fdd80113e4!2sSALON%20MEBLOWY%20UFO%20MEBLE!5e0!3m2!1spl!2spl!4v1661859259432!5m2!1spl!2spl" />
                    </div>

                </div>



            </div>


        </div>
    )
}