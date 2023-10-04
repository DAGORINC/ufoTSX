import { useState } from 'react';
import styles from './listPartWithEditForm.module.scss';
import { categoryData } from '../../../../../../../pages/Furniture/components/Categories/categoryData';
import { getShowroomUrl } from '../../../../../../../services/getShowroomUrl';

const BASE_URL = getShowroomUrl();

export default function ListPartWithEditForm(props) {

    const [showElse, setShowElse] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [showDescription, setShowDescription] = useState(false);


    const [nameEditForm, setNameEditForm] = useState(props.name);
    const [descriptionEditForm, setDescriptionEditForm] = useState(props.description);
    const [producerEditForm, setProducerEditForm] = useState(props.producer);
    const [collectionEditForm, setCollectionEditForm] = useState(props.partCollection);
    const [priceEditForm, setPriceEditForm] = useState(props.price);
    const [crossedPriceEditForm, setCrossedPriceEditForm] = useState(props.crossed);
    const [widthEditForm, setWidthEditForm] = useState(props.width);
    const [heightEditForm, setHeightEditForm] = useState(props.height);
    const [depthEditForm, setDepthEditForm] = useState(props.depth);
    const [imageEditForm, setImageEditForm] = useState('');
    const [designedForTheLivingRoomEditForm, setDesignedForTheLivingRoomEditForm] = useState(props.designedForTheLivingRoom);
    const [designedForTheKitchenEditForm, setDesignedForTheKitchenEditForm] = useState(props.designedForTheKitchen);
    const [designedForTheBedroomEditForm, setDesignedForTheBedroomEditForm] = useState(props.designedForTheBedroom);
    const [designedForTheOfficeEditForm, setDesignedForTheOfficeEditForm] = useState(props.designedForTheOffice);
    const [designedForTheYouthRoomEditForm, setDesignedForTheYouthRoomEditForm] = useState(props.designedForTheYouthRoom);
    const [designedForTheHallwayEditForm, setDesignedForTheHallwayEditForm] = useState(props.designedForTheHallway);
    const [designedForTheChildrensRoomEditForm, setDesignedForTheChildrensRoomEditForm] = useState(props.designedForTheChildrensRoom);
    const [designedForTheBathroomEditForm, setDesignedForTheBathroomEditForm] = useState(props.designedForTheBathroom);
    const [categoriesEditForm, setCategoriesEditForm] = useState(props.categories);
    const [isPriceVissibleEditForm, setIsPriceVissibleEditForm] = useState(props.isPriceVissible);

    const changeNameEditFormHandler = event => {
        const name = event.target.value;
        setNameEditForm(name);
    }

    const changeDescriptionEditFormHandler = event => {
        const description = event.target.value;
        setDescriptionEditForm(description);
    }


    const changeProducerEditFormHandler = event => {
        const producer = event.target.value;
        setProducerEditForm(producer);
    }


    const changeCollectionEditFormHandler = event => {
        const collection = event.target.value;
        setCollectionEditForm(collection);
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


    const changeCategoriesEditFormHandler = (checked, name) => {

        if (checked) {
            setCategoriesEditForm(categoriesEditForm + `%&${name}&%`);
        } else {
            setCategoriesEditForm(categoriesEditForm.replace(`%&${name}&%`, ''));
        }

    }


    const descriptionClickHandler = () => {
        setShowCategories(false);
        setShowDescription(!showDescription);
    }


    const categoriesClickHandler = () => {
        setShowDescription(false);
        setShowCategories(!showCategories);
    }


    const findProducerName = () => {
        if (!props) return null;
        const producer_id = props.producer;
        const index = props.producers.findIndex(x => x._id === producer_id)

        if (index >= 0) return props.producers[index].name.toString();
    }


    const findCollectionName = () => {
        const collection_id = props.partCollection;
        const index = props.collections.findIndex(x => x._id === collection_id)

        if (index >= 0) return props.collections[index].name.toString();
    }


    const editFurnitureHandler = async () => {

        const furniture = {
            _id: props._id,
            name: nameEditForm,
            description: descriptionEditForm,
            producer: producerEditForm,
            collection: collectionEditForm,
            price: priceEditForm,
            crossed: crossedPriceEditForm,
            width: widthEditForm,
            height: heightEditForm,
            depth: depthEditForm,
            isPriceVissible: isPriceVissibleEditForm,
            designedForTheLivingRoom: designedForTheLivingRoomEditForm,
            designedForTheKitchen: designedForTheKitchenEditForm,
            designedForTheBedroom: designedForTheBedroomEditForm,
            designedForTheOffice: designedForTheOfficeEditForm,
            designedForTheYouthRoom: designedForTheYouthRoomEditForm,
            designedForTheHallway: designedForTheHallwayEditForm,
            designedForTheChildrensRoom: designedForTheChildrensRoomEditForm,
            designedForTheBathroom: designedForTheBathroomEditForm,
            categories: categoriesEditForm,
            image: imageEditForm
        }

        props.onEdit(furniture);
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


                <div className={styles.name}>

                    <b className={styles.optionName} style={{ marginRight: '15px' }}>Producent:</b>

                    {showEditForm ? (
                        <select className={styles.input} value={producerEditForm} onChange={changeProducerEditFormHandler}>

                            {
                                props.producers.length === 0 || !Array.isArray(props.producers) ? (
                                    <option>
                                        No producers data!
                                    </option>
                                ) : (
                                    props.producers.map((producer, index) => {
                                        return (
                                            <option key={index} value={producer._id}>
                                                {producer.name}
                                            </option>
                                        )
                                    })
                                )
                            }

                        </select>
                    ) : (
                        <>{props.producers ? findProducerName() : 'failed producers data'}</>
                    )
                    }

                </div>

                <div className={styles.name}>

                    <b className={styles.optionName} style={{ marginRight: '15px' }}>Kolekcja:</b>

                    {showEditForm ? (
                        <select className={styles.input} value={collectionEditForm} onChange={changeCollectionEditFormHandler}>

                            <option value=''>
                                brak
                            </option>

                            {
                                props.collections.length === 0 || !Array.isArray(props.collections) ? (
                                    <option>No Collections Data!</option>
                                ) : (
                                    props.collections.map((collection, index) => {
                                        return (
                                            <option key={index} value={collection._id}>
                                                {collection.name}
                                            </option>
                                        )
                                    })
                                )
                            }

                        </select>
                    ) : (
                        <>{props.collections ? findCollectionName() : 'failed collections data'}</>
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


                                <div className={styles.details}><h3 className={styles.premiseTag}>Pomieszczenia:</h3></div>


                                <div className={styles.details}>

                                    {showEditForm ? (
                                        <input type='checkbox' checked={designedForTheLivingRoomEditForm} onClick={() => setDesignedForTheLivingRoomEditForm(!designedForTheLivingRoomEditForm)} />
                                    ) : (
                                        <input type='checkbox' disabled={true} readOnly={true} checked={props.designedForTheLivingRoom} />
                                    )
                                    }

                                    <b className={styles.optionName} style={{ marginRight: '15px' }}>Salon</b>

                                </div>


                                <div className={styles.details}>

                                    {showEditForm ? (
                                        <input type='checkbox' checked={designedForTheKitchenEditForm} onClick={() => setDesignedForTheKitchenEditForm(!designedForTheKitchenEditForm)} />
                                    ) : (
                                        <input type='checkbox' disabled={true} readOnly={true} checked={props.designedForTheKitchen} />
                                    )
                                    }

                                    <b className={styles.optionName} style={{ marginRight: '15px' }}>Kuchnia</b>

                                </div>


                                <div className={styles.details}>

                                    {showEditForm ? (
                                        <input type='checkbox' checked={designedForTheBedroomEditForm} onClick={() => setDesignedForTheBedroomEditForm(!designedForTheBedroomEditForm)} />
                                    ) : (
                                        <input type='checkbox' disabled={true} readOnly={true} checked={props.designedForTheBedroom} />
                                    )
                                    }

                                    <b className={styles.optionName} style={{ marginRight: '15px' }}>Sypialnia</b>

                                </div>


                                <div className={styles.details}>

                                    {showEditForm ? (
                                        <input type='checkbox' checked={designedForTheOfficeEditForm} onClick={() => setDesignedForTheOfficeEditForm(!designedForTheOfficeEditForm)} />
                                    ) : (
                                        <input type='checkbox' disabled={true} readOnly={true} checked={props.designedForTheOffice} />
                                    )
                                    }

                                    <b className={styles.optionName} style={{ marginRight: '15px' }}>Biuro</b>

                                </div>


                                <div className={styles.details}>

                                    {showEditForm ? (
                                        <input type='checkbox' checked={designedForTheYouthRoomEditForm} onClick={() => setDesignedForTheYouthRoomEditForm(!designedForTheYouthRoomEditForm)} />
                                    ) : (
                                        <input type='checkbox' disabled={true} readOnly={true} checked={props.designedForTheYouthRoom} />
                                    )
                                    }

                                    <b className={styles.optionName} style={{ marginRight: '15px' }}>Pokój młodzieżowy</b>

                                </div>


                                <div className={styles.details}>

                                    {showEditForm ? (
                                        <input type='checkbox' checked={designedForTheHallwayEditForm} onClick={() => setDesignedForTheHallwayEditForm(!designedForTheHallwayEditForm)} />
                                    ) : (
                                        <input type='checkbox' disabled={true} readOnly={true} checked={props.designedForTheHallway} />
                                    )
                                    }

                                    <b className={styles.optionName} style={{ marginRight: '15px' }}>Przedpokój</b>

                                </div>


                                <div className={styles.details}>

                                    {showEditForm ? (
                                        <input type='checkbox' checked={designedForTheChildrensRoomEditForm} onClick={() => setDesignedForTheChildrensRoomEditForm(!designedForTheChildrensRoomEditForm)} />
                                    ) : (
                                        <input type='checkbox' disabled={true} readOnly={true} checked={props.designedForTheChildrensRoom} />
                                    )
                                    }

                                    <b className={styles.optionName} style={{ marginRight: '15px' }}>Pokój dziecięcy</b>

                                </div>


                                <div className={styles.details}>

                                    {showEditForm ? (
                                        <input type='checkbox' checked={designedForTheBathroomEditForm} onClick={() => setDesignedForTheBathroomEditForm(!designedForTheBathroomEditForm)} />
                                    ) : (
                                        <input type='checkbox' disabled={true} readOnly={true} checked={props.designedForTheBathroom} />
                                    )
                                    }

                                    <b className={styles.optionName} style={{ marginRight: '15px' }}>Łazienka</b>

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

                            <div className={styles.categoryNameContainer}>Kategorie</div>
                            <button onClick={categoriesClickHandler}>{showCategories ? 'Schowaj' : 'Pokaż'}</button>

                            <div className={styles.descriptionNameContainer}>Opis</div>
                            <button onClick={descriptionClickHandler}>{showDescription ? 'Schowaj' : 'Pokaż'}</button>

                        </div>

                        {
                            showCategories ? (
                                <div>

                                    {
                                        categoryData.map((partOfCategory, index) => {
                                            return (
                                                <div>

                                                    <div className={styles.category} key={index}>
                                                        <input type='checkbox' disabled={showEditForm ? false : true} onClick={(event) => { changeCategoriesEditFormHandler(event.target.checked, partOfCategory.name) }}
                                                            checked={categoriesEditForm.includes(`%&${partOfCategory.name}&%`) ? true : false} />
                                                        {partOfCategory.name}
                                                    </div>


                                                    {

                                                        partOfCategory.hasArrow === true && categoriesEditForm.includes(partOfCategory.name) ? (
                                                            partOfCategory.opened.map((part, index) => {
                                                                return (
                                                                    <div>
                                                                        <input key={index} disabled={showEditForm ? false : true} className={styles.smallCategory} type='checkbox'
                                                                            onClick={(event) => { changeCategoriesEditFormHandler(event.target.checked, part.name) }} checked={categoriesEditForm.includes(`%&${part.name}&%`) ? true : false} />
                                                                        {part.name}
                                                                    </div>
                                                                )
                                                            })
                                                        ) : (
                                                            <></>
                                                        )

                                                    }


                                                </div>
                                            )
                                        }
                                        )
                                    }
                                </div>
                            ) : (

                                <></>
                            )

                        }


                        {
                            showDescription ? (

                                <div className={styles.description}>

                                    {

                                        showEditForm ? (

                                            <textarea className={styles.inputDescription} value={descriptionEditForm} onChange={changeDescriptionEditFormHandler}/>

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