import { useState } from 'react';
import styles from './listPart.module.scss';
import { getShowroomUrl } from '../../../../../../../services/getShowroomUrl';
const BASE_URL = getShowroomUrl();

export default function ListPart(props) {

    const [showEditForm, setShowEditForm] = useState(false);
    const [nameEditForm, setNameEditForm] = useState(props.name);
    const [linkEditForm, setLinkEditForm] = useState(props.link);
    const [imageEditForm, setImageEditForm] = useState('');


    const changeNameEditFormHandler = event => {
        const value = event.target.value;
        setNameEditForm(value);
    }

    const changeLinkEditFormHandler = event => {
        const value = event.target.value;
        setLinkEditForm(value);
    }

    const changeImageEditFormHandler = event => {
        const value = event.target.files[0];
        setImageEditForm(value);
    }

    const editProducerHandler = async () => {

        const producer = {
            _id: props._id,
            name: nameEditForm,
            logo: imageEditForm,
            link: linkEditForm
        }
        
        props.onEdit(producer);
    }

    return (
        <div className={styles.general}>

            <div className={styles.listContainer}>

                <div className={styles.container}>

                    <div className={styles.imageContainer}>

                        {props.image ? (<img alt={props.name} className={styles.image} src={`${BASE_URL}${props.image}`} />) : (<></>)}

                    </div>


                    <div className={styles.name}>

                        {props.name}

                    </div>


                    <div className={styles.link}>

                        {props.link}

                    </div>

                    <button className={styles.editButton} onClick={() => setShowEditForm(!showEditForm)}>Edytuj</button>
                    <button className={styles.deteleButton} onClick={() => props.onDelete(props._id)}>Usuń</button>

                </div>
            </div>

            {
                showEditForm && (

                    <div className={styles.editFormContainer}>


                        <div className={styles.fileInput}>

                        <div>
                                Zdjęcie producenta
                                <input type='file' className={styles.input} id='files' onChange={changeImageEditFormHandler} />
                            </div>

                        </div>


                        <div className={styles.changeName}> Zmień nazwę<input value={nameEditForm} onChange={changeNameEditFormHandler} className={styles.input} type='text'></input> </div>
                        <div className={styles.changeLink}> Zmień link<input value={linkEditForm} onChange={changeLinkEditFormHandler} className={styles.input} type='text'></input> </div>
                        <button className={styles.saveButton} onClick={() => editProducerHandler()}>Zapisz</button>

                    </div>
                )
            }

        </div>
    )
}