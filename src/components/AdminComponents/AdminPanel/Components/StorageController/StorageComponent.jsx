import styles from './StorageComponent.module.scss';
import storageController from '../../../../../Api/storageController';

const StorageComponent = () => {


    const handleDownloadStorage = () => {
        storageController.downloadStorageFolder(); // Wywołaj funkcję do pobierania
    };


    return (
        <div>
            <h1 onClick={handleDownloadStorage} className={styles.downloadStorageLink}>Pobierz folder storage</h1>
        </div>
    )
}

export default StorageComponent;