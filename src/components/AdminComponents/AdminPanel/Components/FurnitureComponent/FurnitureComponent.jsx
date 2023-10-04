import { useState } from 'react';
import { categoryData } from '../../../../../pages/Furniture/components/Categories/categoryData';
import styles from './furnitureComponent.module.scss';
import furnitureController from '../../../../../Api/furnitureController';
import producersController from '../../../../../Api/producersController';
import collectionsController from '../../../../../Api/collectionsController';
import ListPartWithEditForm from './Components/ListPartWithEditForm/ListPartWithEditForm';
import CsvDownloadButton from 'react-json-to-csv';

export default function FurnitureComponent() {

    const [showAddForm, setShowAddForm] = useState(false);
    const [showFurniture, setShowFurniture] = useState(false);

    const [furnitureData, setFurnitureData] = useState([]);

    const [producersData, setProducersData] = useState('');

    const getAllProducers = async () => {
        const res = await producersController.getAllProducers();
        if (!res.ok) return null;
        if (res.producers) setProducersData(res.producers);
        if (res.producers[0]) setProducerAddForm(res.producers[0]._id);
    }

    const [collectionsData, setCollectionsData] = useState('');

    const getAllCollections = async () => {
        const res = await collectionsController.getAllCollections();
        setCollectionsData(res.collections);
    }

    const [nameAddForm, setNameAddForm] = useState('');
    const [descriptionAddForm, setDescriptionAddForm] = useState('');
    const [producerAddForm, setProducerAddForm] = useState('');
    const [collectionAddForm, setCollectionAddForm] = useState('');
    const [priceAddForm, setPriceAddForm] = useState(0);
    const [crossedPriceAddForm, setCrossedPriceAddForm] = useState(0);
    const [widthAddForm, setWidthAddForm] = useState(0);
    const [heightAddForm, setHeightAddForm] = useState(0);
    const [depthAddForm, setDepthAddForm] = useState(0);
    const [designedForTheLivingRoomAddForm, setDesignedForTheLivingRoomAddForm] = useState(false);
    const [designedForTheKitchenAddForm, setDesignedForTheKitchenAddForm] = useState(false);
    const [designedForTheBedroomAddForm, setDesignedForTheBedroomAddForm] = useState(false);
    const [designedForTheOfficeAddForm, setDesignedForTheOfficeAddForm] = useState(false);
    const [designedForTheYouthRoomAddForm, setDesignedForTheYouthRoomAddForm] = useState(false);
    const [designedForTheHallwayAddForm, setDesignedForTheHallwayAddForm] = useState(false);
    const [designedForTheChildrensRoomAddForm, setDesignedForTheChildrensRoomAddForm] = useState(false);
    const [designedForTheBathroomAddForm, setDesignedForTheBathroomAddForm] = useState(false);
    const [imageAddForm, setImageAddForm] = useState('');
    const [isPriceVissibleAddForm, setIsPriceVissibleAddForm] = useState(false);
    const [categoryAddForm, setCategoryAddForm] = useState('c ');


    const changeNameAddFormHandler = event => {
        const name = event.target.value;
        setNameAddForm(name);
    }

    const changeDescriptionAddFormHandler = event => {
        const description = event.target.value;
        setDescriptionAddForm(description);
    }


    const changeProducerAddFormHandler = event => {
        const producer = event.target.value;
        setProducerAddForm(producer);
    }


    const changeCollectionAddFormHandler = event => {
        const collection = event.target.value;
        setCollectionAddForm(collection);
    }


    const changePriceAddFormHandler = event => {
        const price = event.target.value;
        setPriceAddForm(price);
    }


    const changeCrossedPriceAddFormHandler = event => {
        const crossed = event.target.value;
        setCrossedPriceAddForm(crossed);
    }


    const changeWidthAddFormHandler = event => {
        const width = event.target.value;
        setWidthAddForm(width);
    }


    const changeHeightAddFormHandler = event => {
        const height = event.target.value;
        setHeightAddForm(height);
    }


    const changeDepthAddFormHandler = event => {
        const depth = event.target.value;
        setDepthAddForm(depth);
    }



    const changeImageAddFormHandler = event => {
        const img = event.target.files[0];
        setImageAddForm(img);
    }



    const setCategoryAddFormHandler = (checked, name) => {

        if (checked) {
            setCategoryAddForm(categoryAddForm + `%&${name}&%`);
        } else {
            setCategoryAddForm(categoryAddForm.replace(`%&${name}&%`, ''));
        }
    }


    const showAddFormHanadler = async () => {
        if (!showAddForm) {
            getAllProducers();
            getAllCollections();
            setShowAddForm(true);
        } else {
            setShowAddForm(false);
        }
    }


    const getAllFurniture = async () => {
        const res = await furnitureController.getAllFurniture();
        setFurnitureData(res.furniture);
    }


    const getAllFurnituresHandler = () => {
        if (!showFurniture) {
            setShowFurniture(true);
            getAllProducers();
            getAllCollections();
            getAllFurniture();
        } else {
            setShowFurniture(false);
        }
    }


    const addFurniture = async () => {

        const furniture = {
            name: nameAddForm,
            description: descriptionAddForm,
            producer: producerAddForm,
            collection: collectionAddForm,
            price: priceAddForm,
            crossedPrice: crossedPriceAddForm,
            isPriceVissible: isPriceVissibleAddForm,
            width: widthAddForm,
            height: heightAddForm,
            depth: depthAddForm,
            designedForTheLivingRoom: designedForTheLivingRoomAddForm,
            designedForTheKitchen: designedForTheKitchenAddForm,
            designedForTheBedroom: designedForTheBedroomAddForm,
            designedForTheOffice: designedForTheOfficeAddForm,
            designedForTheYouthRoom: designedForTheYouthRoomAddForm,
            designedForTheHallway: designedForTheHallwayAddForm,
            designedForTheChildrensRoom: designedForTheChildrensRoomAddForm,
            designedForTheBathroom: designedForTheBathroomAddForm,
            image: imageAddForm,
            categories: categoryAddForm,
        }

        if (!nameAddForm || !producerAddForm || !imageAddForm) return null;

        try {
            const res = await furnitureController.addFurniture(furniture);
            const furnitures = [...furnitureData];
            furnitures.push(res.newFurniture)

            setFurnitureData(furnitures)
        } catch (error) {
            return 'cannot add furniture';
        }

        setNameAddForm('');
        setDescriptionAddForm('');
        setPriceAddForm(0);
        setCrossedPriceAddForm(0);
        setWidthAddForm(0);
        setHeightAddForm(0);
        setDepthAddForm(0);
        setImageAddForm('');
        setDesignedForTheLivingRoomAddForm(false);
        setDesignedForTheKitchenAddForm(false);
        setDesignedForTheBedroomAddForm(false);
        setDesignedForTheOfficeAddForm(false);
        setDesignedForTheYouthRoomAddForm(false);
        setDesignedForTheHallwayAddForm(false);
        setDesignedForTheChildrensRoomAddForm(false);
        setDesignedForTheBathroomAddForm(false);
        setCategoryAddForm('');
    }


    const editFurniture = async (furniture) => {


        const res = await furnitureController.editFurniture(furniture);

        const furnitures = [...furnitureData];
        const index = furnitures.findIndex(x => x._id = furniture._id)

        if (index >= 0) {
            furnitures[index] = res.editedFurniture;
            setFurnitureData(furnitures);
        }

        getAllFurniture();
    }


    const deleteFurniture = async (_id) => {
        await furnitureController.deleteFurniture(_id);
        setFurnitureData(furnitureData.filter(furniture => furniture._id !== _id))
    }

    
    const furnitureDataWithoutV = furnitureData?.map((item) => {
        const { __v, ...rest } = item;
        return rest;
      });

    return (
        <div className={styles.general}>


            <div className={styles.producersContainer}>

                <h1 className={styles.producers} onClick={getAllFurnituresHandler}>Meble</h1>



                <div className={styles.buttonContainer}>

                    <button className={styles.addButton} onClick={showAddFormHanadler}>{showAddForm ? 'Anuluj dodawanie' : 'Dodaj mebel'}</button>

                </div>


                {
                    showAddForm && (
                        <div className={styles.formContainer}>

                            <div>

                                <div>
                                    Nazwa mebla
                                    <input type='text' className={styles.input} value={nameAddForm} onChange={changeNameAddFormHandler} />
                                </div>


                                <div>
                                    Producent

                                    <select className={styles.input} value={producerAddForm} onChange={changeProducerAddFormHandler}>

                                        {
                                            producersData.length === 0 || !Array.isArray(producersData) ? (
                                                <option>
                                                    No producers data!
                                                </option>
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
                                    Kolekcja

                                    <select className={styles.input} value={collectionAddForm} onChange={changeCollectionAddFormHandler}>

                                        <option value=''>
                                            brak
                                        </option>

                                        {
                                            collectionsData.length === 0 || !Array.isArray(collectionsData) ? (
                                                <option>No Collections Data!</option>
                                            ) : (
                                                collectionsData.map((collection, index) => {
                                                    return (
                                                        <option key={index} value={collection._id}>
                                                            {collection.name}
                                                        </option>
                                                    )
                                                })
                                            )
                                        }

                                    </select>

                                </div>


                                <div>
                                    Cena
                                    <input type='number' className={styles.input} value={priceAddForm} onChange={changePriceAddFormHandler} />
                                </div>


                                <div>
                                    Cena skreślona
                                    <input type='number' className={styles.input} value={crossedPriceAddForm} onChange={changeCrossedPriceAddFormHandler} />
                                </div>


                                <div>
                                    Wyświetl cenę
                                    <button
                                        style={{ marginLeft: '5px' }}
                                        onClick={() => setIsPriceVissibleAddForm(!isPriceVissibleAddForm)}>
                                        {isPriceVissibleAddForm ? 'Tak' : 'Nie'}
                                    </button>
                                </div>


                                <div>
                                    Szerokość
                                    <input type='number' className={styles.input} value={widthAddForm} onChange={changeWidthAddFormHandler} />
                                </div>


                                <div>
                                    Wysokość
                                    <input type='number' className={styles.input} value={heightAddForm} onChange={changeHeightAddFormHandler} />
                                </div>


                                <div>
                                    Głębokość
                                    <input type='number' className={styles.input} value={depthAddForm} onChange={changeDepthAddFormHandler} />
                                </div>

                                <div onClick={() => setDesignedForTheLivingRoomAddForm(!designedForTheLivingRoomAddForm)} className={styles.divPremisesCheckbox}>
                                    <input
                                        className={styles.premisesCheckbox}
                                        type="checkbox"
                                        checked={designedForTheLivingRoomAddForm}
                                        onClick={() => setDesignedForTheLivingRoomAddForm(!designedForTheLivingRoomAddForm)} />
                                    Salon
                                </div>

                                <div onClick={() => setDesignedForTheKitchenAddForm(!designedForTheKitchenAddForm)} className={styles.divPremisesCheckbox}>
                                    <input
                                        className={styles.premisesCheckbox}
                                        type="checkbox" checked={designedForTheKitchenAddForm}
                                        onClick={() => setDesignedForTheKitchenAddForm(!designedForTheKitchenAddForm)} />
                                    Kuchnia
                                </div>

                                <div onClick={() => setDesignedForTheBedroomAddForm(!designedForTheBedroomAddForm)} className={styles.divPremisesCheckbox}>
                                    <input
                                        className={styles.premisesCheckbox}
                                        type="checkbox" checked={designedForTheBedroomAddForm}
                                        onClick={() => setDesignedForTheBedroomAddForm(!designedForTheBedroomAddForm)} />
                                    Sypialnia
                                </div>

                                <div onClick={() => setDesignedForTheOfficeAddForm(!designedForTheOfficeAddForm)} className={styles.divPremisesCheckbox}>
                                    <input
                                        className={styles.premisesCheckbox}
                                        type="checkbox" checked={designedForTheOfficeAddForm}
                                        onClick={() => setDesignedForTheOfficeAddForm(!designedForTheOfficeAddForm)} />
                                    Biuro
                                </div>

                                <div onClick={() => setDesignedForTheYouthRoomAddForm(!designedForTheYouthRoomAddForm)} className={styles.divPremisesCheckbox}>
                                    <input
                                        className={styles.premisesCheckbox}
                                        type="checkbox" checked={designedForTheYouthRoomAddForm}
                                        onClick={() => setDesignedForTheYouthRoomAddForm(!designedForTheYouthRoomAddForm)} />
                                    Pokój młodzieżowy
                                </div>

                                <div onClick={() => setDesignedForTheHallwayAddForm(!designedForTheHallwayAddForm)} className={styles.divPremisesCheckbox}>
                                    <input
                                        className={styles.premisesCheckbox}
                                        type="checkbox" checked={designedForTheHallwayAddForm}
                                        onClick={() => setDesignedForTheHallwayAddForm(!designedForTheHallwayAddForm)} />
                                    Przedpokój
                                </div>

                                <div onClick={() => setDesignedForTheChildrensRoomAddForm(!designedForTheChildrensRoomAddForm)} className={styles.divPremisesCheckbox}>
                                    <input
                                        className={styles.premisesCheckbox}
                                        type="checkbox"
                                        checked={designedForTheChildrensRoomAddForm}
                                        onClick={() => setDesignedForTheChildrensRoomAddForm(!designedForTheChildrensRoomAddForm)} />
                                    Pokój dziecięcy
                                </div>

                                <div onClick={() => setDesignedForTheBathroomAddForm(!designedForTheBathroomAddForm)} className={styles.divPremisesCheckbox}>
                                    <input
                                        className={styles.premisesCheckbox}
                                        type="checkbox"
                                        checked={designedForTheBathroomAddForm}
                                        onClick={() => setDesignedForTheBathroomAddForm(!designedForTheBathroomAddForm)} />
                                    Łazienka
                                </div>

                                <div>
                                    Zdjęcie mebla
                                    <input type='file' className={styles.input} id='files' onChange={changeImageAddFormHandler} />
                                </div>


                                <button className={styles.addButton} onClick={addFurniture}>Dodaj mebel</button>

                            </div>


                            <div className={styles.categoryContainer}>

                                {
                                    categoryData.length === 0 || !Array.isArray(categoryData) ? (

                                        <div>
                                            No category data!
                                        </div>

                                    ) : (
                                        categoryData.map((partOfCategory, index) => {
                                            return (
                                                <div>

                                                    <div className={styles.category} key={index}>
                                                        <input
                                                            type='checkbox'
                                                            onClick={(event) => { setCategoryAddFormHandler(event.target.checked, partOfCategory.name) }}
                                                            checked={categoryAddForm.includes(`%&${partOfCategory.name}&%`) ? true : false} />
                                                        {partOfCategory.name}
                                                    </div>


                                                    {

                                                        partOfCategory.hasArrow === true && categoryAddForm.includes(partOfCategory.name) ? (
                                                            partOfCategory.opened.map((part, index) => {
                                                                return (
                                                                    <div>
                                                                        <input
                                                                            key={index}
                                                                            className={styles.smallCategory}
                                                                            checked={categoryAddForm.includes(`%&${part.name}&%`) ? true : false}
                                                                            type='checkbox' onClick={(event) => { setCategoryAddFormHandler(event.target.checked, part.name) }} />
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

                                    )
                                }
                            </div>


                            <div>
                                Opis mebla
                                <textarea name='descriptionArea' value={descriptionAddForm} className={styles.descriptionInput} onChange={changeDescriptionAddFormHandler} />
                            </div>


                        </div>
                    )
                }

                {
                    showFurniture && (
                        <div className={styles.furnituresDataContainer}>
                            {
                                furnitureData.length === 0 || !Array.isArray(furnitureData) ? (

                                    <div>
                                        No furniture data!
                                    </div>

                                ) : (
                                    <>
                                        
                                        <CsvDownloadButton data={furnitureDataWithoutV}/>
                                        {
                                            furnitureData.map((pieceOfFurniture, index) => {
                                                return (
                                                    <div key={index}>

                                                        <div>
                                                            <ListPartWithEditForm
                                                                key={pieceOfFurniture._id}
                                                                {...pieceOfFurniture}
                                                                image={pieceOfFurniture.image}
                                                                imageToShow={pieceOfFurniture.image}
                                                                producers={producersData}
                                                                collections={collectionsData}
                                                                onDelete={(_id) => { deleteFurniture(_id) }}
                                                                onEdit={(furniture) => { editFurniture(furniture) }}
                                                            />
                                                        </div>


                                                    </div>
                                                )
                                            })
                                        }
                                    </>
                                )
                            }
                        </div>

                    )
                }

            </div>





        </div>
    )
}