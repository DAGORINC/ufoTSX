import { FC, useEffect } from 'react';
import { useState } from 'react';
import styles from './listPartWithEditForm.module.scss';
import { getShowroomUrl } from '../../../../../../services/getShowroomUrl';
import { IProducer } from '../../../../../../interfaces/IProducer';
import { ICollection } from '../../../../../../interfaces/ICollection';
const BASE_URL = getShowroomUrl();

interface ListPartProps {
    _id: string,
    name: string,
    producer: string,
    image: string,
    producers: IProducer[],
    onDelete: (_id: string) => void,
    onEdit: (collection: ICollection) => void,
}

const ListPart: FC<ListPartProps> = ({
    _id,
    name,
    producer,
    image,
    producers,
    onDelete,
    onEdit,
}) => {

    const [showEditForm, setShowEditForm] = useState<boolean>(false);
    const [nameEditForm, setNameEditForm] = useState<string>(name);
    const [producerEditForm, setProducerEditForm] = useState<string>(producer);
    const [imageEditForm, setImageEditForm] = useState<string>('');

    const findProducerName = () => {
        const producer_id = producer;
        const index = producers.findIndex(x => x._id === producer_id)

        if (index >= 0) return producers[index].name;
    }

    useEffect(() => {

    }, [])

    const changeNameEditFormHandler = (event: any) => {
        const value = event.target.value;
        setNameEditForm(value);
    }

    const changeProducerEditFormHandler = (event: any) => {
        const value = event.target.value;
        setProducerEditForm(value);
    }

    const changeImageEditFormHandler = (event: any) => {
        const value = event.target.files[0];
        setImageEditForm(value);
    }

    const editCollectionHandler = async () => {

        const collection = {
            _id: _id,
            name: nameEditForm,
            producer: producerEditForm,
            image: imageEditForm
        }

        onEdit(collection);
    }

    return (
        <div className={styles.general}>

            <div className={styles.listContainer}>

                <div className={styles.container}>

                    <div className={styles.imageContainer}>

                        {image ? (<img alt={name} className={styles.image} src={`${BASE_URL}${image}`} />) : (<></>)}

                    </div>


                    <div className={styles.name}>

                        {name}

                    </div>


                    <div className={styles.producer}>

                        {producers ? findProducerName() : 'failed or on data'}

                    </div>

                    <button className={styles.editButton} onClick={() => setShowEditForm(!showEditForm)}>Edytuj</button>
                    <button className={styles.deteleButton} onClick={() => onDelete(_id)}>Usuń</button>

                </div>
            </div>

            {
                showEditForm && (

                    <div className={styles.editFormContainer}>


                        <div className={styles.fileInput}>

                            <div>
                                Zdjęcie kolekcji
                                <input type='file' className={styles.input} id='files' onChange={changeImageEditFormHandler} />
                            </div>

                        </div>


                        <div className={styles.changeName}>
                            Zmień nazwę
                            <input value={nameEditForm} onChange={changeNameEditFormHandler} className={styles.input} type='text' />
                        </div>


                        <div className={styles.changeProducer}>
                            Zmień producenta
                            <select className={styles.input} value={producerEditForm} onChange={changeProducerEditFormHandler}>
                                {
                                    producers.map((producer, index) => {
                                        return (
                                            <option key={index} value={producer._id}>
                                                {producer.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>


                        <button className={styles.saveButton} onClick={() => editCollectionHandler()}>Zapisz</button>

                    </div>
                )
            }

        </div>
    )
}

export default ListPart;