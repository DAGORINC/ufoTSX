import { useState } from 'react';
import styles from './producersComponent.module.scss';
import producersController from '../../../../../Api/producersController';
import ListPartWithEditForm from '../../Components/ProducersComponent/Components/ListPart/ListPartWithEditForm';
import CsvDownloadButton from 'react-json-to-csv';

export default function ProducersComponent() {

    const [showAddForm, setShowAddForm] = useState(false);
    const [showProducers, setShowProducers] = useState(false);

    const [producersData, setProducers] = useState([]);

    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [image, setImage] = useState('');

    const changeNameHandler = event => {
        const name = event.target.value;
        setName(name);
    }


    const changeLinkHandler = event => {
        const link = event.target.value;
        setLink(link);
    }


    const changeImageHandler = event => {
        const img = event.target.files[0];
        setImage(img);
    }


    const addProducer = async () => {

        const producer = {
            name: name,
            logo: image,
            link: link
        }

        if (!name || !image) return null;
        try {
            const res = await producersController.addProducer(producer);
            const producers = [...producersData];
            producers.push(res.newProducer)

            setProducers(producers)
        } catch (error) {
            return 'cannot add producer'
        }

        setName('');
        setLink('');
        setImage('');

    }


    const deleteProducer = async (_id) => {
        await producersController.deleteProducer(_id);
        setProducers(producersData.filter(producer => producer._id !== _id))
    }


    const getAllProducers = async () => {
        const res = await producersController.getAllProducers();
        setProducers(res.producers);
    }


    const getAllProducersHandler = () => {
        if (!showProducers) {
            setShowProducers(true);
            getAllProducers();
        } else {
            setShowProducers(false);
        }
    }


    const editProducer = async (producer) => {

        const res = await producersController.editProducer(producer);

        const producers = [...producersData];
        const index = producers.findIndex(x => x._id === producer._id);

        if (index >= 0) {
            producers[index] = res.editedProducer;
            setProducers(producers)
        }
    }

    const producersDataWithoutV = producersData.map((item) => {
        const { __v, ...rest } = item;
        return rest;
    });

    return (
        <div className={styles.general}>

            <div className={styles.producersContainer}>

                <h1 className={styles.producers} onClick={getAllProducersHandler}>Producenci</h1>

                <div className={styles.buttonContainer}>

                    <button className={styles.addButton} onClick={() => setShowAddForm(!showAddForm)}>{showAddForm ? 'Anuluj dodawanie' : 'Dodaj producenta'}</button>

                </div>

                {
                    showAddForm && (
                        <div className={styles.formContainer}>

                            <div>
                                Nazwa producenta
                                <input type='text' className={styles.input} value={name} onChange={changeNameHandler} />
                            </div>

                            <div>
                                Link producenta
                                <input type='text' className={styles.input} value={link} onChange={changeLinkHandler} />
                            </div>

                            <div>
                                Zdjęcie producenta
                                <input type='file' className={styles.input} id='files' onChange={changeImageHandler} />
                            </div>

                            <button className={styles.addButton} onClick={addProducer}>Dodaj producenta</button>

                        </div>
                    )
                }

                {
                    showProducers && (
                        <>
                            <CsvDownloadButton data={producersDataWithoutV} />
                            {
                                <div className={styles.producersData}>
                                    {
                                        !producersData || !Array.isArray(producersData) ? (

                                            <div>
                                                No producers data!
                                            </div>

                                        ) : (
                                            producersData.map((producer, index) => {
                                                return (
                                                    <div key={index}>
                                                        <div>
                                                            <ListPartWithEditForm
                                                                key={index}
                                                                _id={producer._id}
                                                                name={producer.name}
                                                                link={producer.link}
                                                                image={`${producer.logo}`}
                                                                onDelete={(_id) => { deleteProducer(_id) }}
                                                                onEdit={(producer) => { editProducer(producer) }}
                                                            />
                                                        </div>
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

        </div>
    )
}