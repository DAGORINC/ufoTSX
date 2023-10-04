import { useState } from 'react';
import styles from './listPartWithEditForm.module.scss';
import { getShowroomUrl } from '../../../../../../../services/getShowroomUrl';

const BASE_URL = getShowroomUrl();

export default function ListPartWithEditForm(props) {

    const [showElse, setShowElse] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDescription, setShowDescription] = useState(false);

    const [nameEditForm, setNameEditForm] = useState(props.name);
    const [descriptionEditForm, setDescriptionEditForm] = useState(props.description);
    const [priceEditForm, setPriceEditForm] = useState(props.price);
    const [crossedPriceEditForm, setCrossedPriceEditForm] = useState(props.crossed);
    const [widthEditForm, setWidthEditForm] = useState(props.width);
    const [heightEditForm, setHeightEditForm] = useState(props.height);
    const [depthEditForm, setDepthEditForm] = useState(props.depth);
    const [imageEditForm, setImageEditForm] = useState('');
    const [isPriceVissibleEditForm, setIsPriceVissibleEditForm] = useState(props.isPriceVissible);

    const changeNameEditFormHandler = event => {
        const name = event.target.value;
        setNameEditForm(name);
    }

    const changeDescriptionEditFormHandler = event => {
        const description = event.target.value;
        setDescriptionEditForm(description);
    }

    const changePriceEditFormHandler = event => {
        const price = event.target.value;
        setPriceEditForm(price);
    }

    const changeCrossedPriceEditFormHandler = event => {
        const crossed = event.target.value;
        setCrossedPriceEditForm(crossed);
    }

    const changeWidthEditFormHandler = event => {
        const width = event.target.value;
        setWidthEditForm(width);
    }

    const changeHeightEditFormHandler = event => {
        const height = event.target.value;
        setHeightEditForm(height);
    }

    const changeDepthEditFormHandler = event => {
        const depth = event.target.value;
        setDepthEditForm(depth);
    }

    const changeImageEditFormHandler = event => {
        const img = event.target.files[0];
        setImageEditForm(img);
    }


    const editFurnitureHandler = async () => {

        const furniture = {
            _id: props._id,
            name: nameEditForm,
            description: descriptionEditForm,
            price: priceEditForm,
            crossed: crossedPriceEditForm,
            width: widthEditForm,
            height: heightEditForm,
            depth: depthEditForm,
            isPriceVissible: isPriceVissibleEditForm,
            image: imageEditForm
        }

        await props.onEdit(furniture);
        setShowEditForm(false);

    }


    const editButtonHandler = () => {
        setShowEditForm(!showEditForm);
        setShowElse(true);
    }


    return (
        <div className={styles.general}>

            <div className={styles.firstContainer}>

                <div className={styles.name}>

                    <b className={styles.optionName} style={{ marginRight: '15px' }}>Nazwa:</b>

                    {showEditForm ? (
                        <input type='text' value={nameEditForm} onChange={changeNameEditFormHandler} />
                    ) : (
                        <>{props.name}</>
                    )
                    }

                </div>



                <button className={styles.editButton} onClick={() => { setShowElse(!showElse) }}>{showElse ? 'Zwiń' : 'Rozwiń'}</button>
                <button className={styles.editButton} onClick={editButtonHandler}>{showEditForm ? 'Anuluj' : 'Edytuj'}</button>
                <button className={styles.deleteButton} onClick={() => props.onDelete(props._id)}>Usuń</button>

            </div>

            {
                showElse && (
                    <div>
                        <div className={styles.showElse}>


                            <div className={styles.showElseText}>


                                <div className={styles.details}>

                                    <b className={styles.optionName} style={{ marginRight: '15px' }}>Cena</b>

                                    {showEditForm ? (
                                        <input type='number' value={priceEditForm} onChange={changePriceEditFormHandler} />
                                    ) : (
                                        <>{props.price}</>
                                    )
                                    }

                                </div>


                                <div className={styles.details}>

                                    <b className={styles.optionName} style={{ marginRight: '15px' }}>Cena skreślona</b>


                                    {showEditForm ? (
                                        <input type='number' value={crossedPriceEditForm} onChange={changeCrossedPriceEditFormHandler} />
                                    ) : (
                                        <>{props.crossed}</>
                                    )
                                    }


                                </div>


                                <div className={styles.details}>

                                    <b className={styles.optionName} style={{ marginRight: '15px' }}>Szerokość</b>


                                    {showEditForm ? (
                                        <input type='number' value={widthEditForm} onChange={changeWidthEditFormHandler} />
                                    ) : (
                                        <>{props.width}</>
                                    )
                                    }


                                </div>


                                <div className={styles.details}>

                                    <b className={styles.optionName} style={{ marginRight: '15px' }}>Wysokość</b>


                                    {showEditForm ? (
                                        <input type='number' value={heightEditForm} onChange={changeHeightEditFormHandler} />
                                    ) : (
                                        <>{props.height}</>
                                    )
                                    }


                                </div>


                                <div className={styles.details}>

                                    <b className={styles.optionName} style={{ marginRight: '15px' }}>Głębokość</b>


                                    {showEditForm ? (
                                        <input type='number' value={depthEditForm} onChange={changeDepthEditFormHandler} />
                                    ) : (
                                        <>{props.depth}</>
                                    )
                                    }


                                </div>


                                <div className={styles.details}>

                                    <b className={styles.optionName} style={{ marginRight: '15px' }}>Wyświetl cenę</b>

                                    {showEditForm ? (
                                        <button onClick={() => setIsPriceVissibleEditForm(!isPriceVissibleEditForm)}>{isPriceVissibleEditForm ? 'Tak' : 'Nie'}</button>
                                    ) : (
                                        <>{props.isPriceVissible ? 'Tak' : 'Nie'}</>
                                    )
                                    }


                                </div>

                            </div>


                            <div className={styles.details}>

                                <img alt={'furniture show'} className={styles.image} src={`${BASE_URL}${props.image}`}></img>
                                {
                                    showEditForm && <input type='file'
                                        className={styles.input}
                                        id='files'
                                        onChange={changeImageEditFormHandler} />
                                }

                            </div>

                            {showEditForm && <button className={styles.saveButton} onClick={() => editFurnitureHandler()}>Zapisz</button>}

                        </div>

                        <div className={styles.categoryAndDescriptionExpanderContainer}>

                            <div className={styles.descriptionNameContainer}>Opis</div>
                            <button onClick={() => setShowDescription(!showDescription)}>{showDescription ? 'Schowaj' : 'Pokaż'}</button>

                        </div>

                        {
                            showDescription ? (
                                <div className={styles.description}>
                                    {
                                        showEditForm ? (
                                            <textarea className={styles.inputDescription} value={descriptionEditForm} onChange={changeDescriptionEditFormHandler} />
                                        ) : (
                                            <div >
                                                {props.description}
                                            </div>
                                        )
                                    }
                                </div>
                            ) : (
                                <></>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}