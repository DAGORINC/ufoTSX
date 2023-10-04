import { FC, useState } from 'react';
import styles from './collectionsComponent.module.scss';
import producersController from '../../../../../Api/producersController';
import collectionsController, { IAddCollectionDto } from '../../../../../Api/collectionsController';
import ListPartWithEditForm from './Components/ListPartWithEditForm';
import { ICollection } from '../../../../../interfaces/ICollection';
import { IProducer } from '../../../../../interfaces/IProducer';
import CsvDownloadButton from 'react-json-to-csv';

interface CollectionsComponentProps {

}

const CollectionsComponent: FC<CollectionsComponentProps> = () => {

    const [collectionsData, setCollectionsData] = useState<ICollection[]>([]);
    const [showCollectionsData, setShowCollectionsData] = useState<boolean>(false);

    const [showAddForm, setShowAddForm] = useState<boolean>(false);

    const [nameAddForm, setNameAddForm] = useState<string>('');
    const [producerAddForm, setProducerAddForm] = useState<string>('');
    const [imageAddForm, setImageAddForm] = useState<string>('');

    const [producersData, setProducersData] = useState<IProducer[]>([]);

    const changeNameAddFormHandler = (event: any) => {
        const name = event.target.value;
        setNameAddForm(name);
    }

    const changeProducerAddFormHandler = (event: any) => {
        const producer = event.target.value;
        setProducerAddForm(producer);
    }

    const changeImageAddFormHandler = (event: any) => {
        const image = event.target.files[0];
        setImageAddForm(image);
    }

    const showAddFormHandler = async () => {
        // setShowAddForm
        if (!showAddForm) {
            getAllProducers();
            setShowAddForm(true);
        } else {
            setShowAddForm(false);
        }
    }

    const getAllCollections = async () => {
        const res = await collectionsController.getAllCollections();
        setCollectionsData(res.collections);
    }

    const getAllCollectionsHandler = () => {
        if (!showCollectionsData) {
            setShowCollectionsData(true);
            getAllProducers();
            getAllCollections();
        } else {
            setShowCollectionsData(false);
        }
    }

    const addCollection = async () => {

        const collection: IAddCollectionDto = {
            name: nameAddForm,
            producer: producerAddForm,
            image: imageAddForm
        }

        if (!nameAddForm || !producerAddForm || !imageAddForm) return null;

        try {
            const res = await collectionsController.addCollection(collection);

            if (res.ok) {
                const collections = [...collectionsData];
                const newCollection = res.collection;
                newCollection && collections.push(newCollection)
                setCollectionsData(collections);
            }
        } catch (error) {
            return 'cannot add collection'
        }

        setNameAddForm('');
        setImageAddForm('');
    }

    const editCollection = async (collection: ICollection) => {

        const res = await collectionsController.editCollection(collection);

        const collections = [...collectionsData];
        const index = collections.findIndex(x => x._id === collection._id)

        if (res.updatedCollection) collections[index] = res.updatedCollection;
        setCollectionsData(collections);
    }

    const deleteCollection = async (_id: string) => {
        await collectionsController.deleteCollection(_id);
        setCollectionsData(collectionsData.filter(collection => collection._id !== _id))
    }

    const getAllProducers = async () => {
        const res = await producersController.getAllProducers();
        if (!res.producers) return
        if (res.producers) setProducersData(res.producers);
        if (res.producers[0]) setProducerAddForm(res.producers[0]._id)
    }

    const collectionsWithoutV = collectionsData?.map((item) => {
        const { __v, ...rest } = item;
        return rest;
    });

    return (
        <div className={styles.general}>

            <h1
                className={styles.collections}
                onClick={getAllCollectionsHandler}
            >
                Kolekcje
            </h1>

            <div className={styles.buttonContainer}>
                <button
                    className={styles.addButton}
                    onClick={showAddFormHandler}
                >
                    {
                        showAddForm
                            ? 'Anuluj dodawanie'
                            : 'Dodaj kolekcję'
                    }
                </button>
            </div>

            {
                showAddForm && (
                    <div className={styles.formContainer}>

                        <div>
                            Nazwa kolekcji
                            <input
                                type='text'
                                className={styles.input}
                                value={nameAddForm}
                                onChange={changeNameAddFormHandler}
                            />
                        </div>

                        <div>
                            Producent
                            <select
                                className={styles.input}
                                value={producerAddForm}
                                onChange={changeProducerAddFormHandler}
                            >
                                {
                                    !producersData || !Array.isArray(producersData) ? (
                                        <>
                                            No producers data!
                                        </>
                                    ) : (
                                        producersData.map((producer, index) => {
                                            return (
                                                <option key={index} value={producer._id}>
                                                    {producer.name}
                                                </option>
                                            )
                                        })
                                    )
                                }
                            </select>
                        </div>

                        <div>
                            Zdjęcie aranżacji
                            <input
                                type='file'
                                className={styles.input}
                                id='files'
                                onChange={changeImageAddFormHandler}
                            />
                        </div>

                        <button
                            className={styles.addButton}
                            onClick={addCollection}
                        >
                            Dodaj kolekcję
                        </button>

                    </div>
                )
            }
            {
                showCollectionsData && (
                    <>
                        <CsvDownloadButton data={collectionsWithoutV} />
                        {
                            <div className={styles.collectionsData}>
                                {
                                    !collectionsData || !Array.isArray(collectionsData) ? (

                                        <div>
                                            No collections data!
                                        </div>

                                    ) : (
                                        collectionsData.map((collection, index) => {
                                            return (
                                                <div key={index}>
                                                    <ListPartWithEditForm
                                                        _id={collection._id}
                                                        name={collection.name}
                                                        producer={collection.producer}
                                                        image={collection.image}
                                                        producers={producersData}
                                                        onDelete={_id => deleteCollection(_id)}
                                                        onEdit={collection => editCollection(collection)}
                                                    />
                                                </div>
                                            )
                                        })
                                    )
                                }
                            </div>
                        }
                    </>
                )
            }
        </div>
    )
}

export default CollectionsComponent;