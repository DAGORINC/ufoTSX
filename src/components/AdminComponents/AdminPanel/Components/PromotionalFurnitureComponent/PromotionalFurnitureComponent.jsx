import { useState } from 'react';
import styles from './promotionalFurnitureComponent.module.scss';
import promotionalFurnitureController from '../../../../../Api/promotionalFurnitureController';
import ListPartWithEditForm from './Components/ListPartWithEditForm/ListPartWithEditForm';
import CsvDownloadButton from 'react-json-to-csv';


export default function PromotionalFurnitureComponent() {

    const [showAddForm, setShowAddForm] = useState(false);
    const [showFurniture, setShowFurniture] = useState(false);

    const [furnitureData, setFurnitureData] = useState([]);


    const [nameAddForm, setNameAddForm] = useState('');
    const [descriptionAddForm, setDescriptionAddForm] = useState('');
    const [priceAddForm, setPriceAddForm] = useState(0);
    const [crossedPriceAddForm, setCrossedPriceAddForm] = useState(0);
    const [widthAddForm, setWidthAddForm] = useState(0);
    const [heightAddForm, setHeightAddForm] = useState(0);
    const [depthAddForm, setDepthAddForm] = useState(0);
    const [imageAddForm, setImageAddForm] = useState('');
    const [isPriceVissibleAddForm, setIsPriceVissibleAddForm] = useState(false);



    const changeNameAddFormHandler = event => {
        const name = event.target.value;
        setNameAddForm(name);
    }

    const changeDescriptionAddFormHandler = event => {
        const description = event.target.value;
        setDescriptionAddForm(description);
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

    const showAddFormHanadler = async () => {
        if (!showAddForm) {
            setShowAddForm(true);
        } else {
            setShowAddForm(false);
        }
    }

    const getAllFurniture = async () => {

        const res = await promotionalFurnitureController.getAllFurniture();
        setFurnitureData(res.furniture);
    }


    const getAllFurnituresHander = () => {
        if (!showFurniture) {
            setShowFurniture(true);
            getAllFurniture();
        } else {
            setShowFurniture(false);
        }
    }


    const addFurniture = async () => {

        const furniture = {
            name: nameAddForm,
            description: descriptionAddForm,
            price: priceAddForm,
            crossedPrice: crossedPriceAddForm,
            isPriceVissible: isPriceVissibleAddForm,
            width: widthAddForm,
            height: heightAddForm,
            depth: depthAddForm,
            image: imageAddForm,
        }

        if (!nameAddForm || !imageAddForm) return null;

        try {
            const res = await promotionalFurnitureController.addFurniture(furniture);
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
    }


    const editFurniture = async (furniture) => {


        const res = await promotionalFurnitureController.editFurniture(furniture);

        const furnitures = [...furnitureData];
        const index = furnitures.findIndex(x => x._id = furniture._id)

        if (index >= 0) {
            furnitures[index] = res.editedFurniture;
            setFurnitureData(furnitures);
        }

        getAllFurniture();
    }


    const deleteFurniture = async (_id) => {
        await promotionalFurnitureController.deleteFurniture(_id);
        setFurnitureData(furnitureData.filter(furniture => furniture._id !== _id))
    }

    
    const furnitureDataWithoutV = furnitureData.map((item) => {
        const { __v, ...rest } = item;
        return rest;
    });


    return (
        <div className={styles.general}>


            <div className={styles.producersContainer}>

                <h1 className={styles.producers} onClick={getAllFurnituresHander}>Promocje</h1>


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


                                <div>
                                    Zdjęcie mebla
                                    <input type='file' className={styles.input} id='files' onChange={changeImageAddFormHandler} />
                                </div>


                                <button className={styles.addButton} onClick={addFurniture}>Dodaj mebel</button>

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
                        <>
                            <CsvDownloadButton data={furnitureDataWithoutV} />
                            
                            {
                                <div className={styles.furnituresDataContainer}>
                                    {
                                        furnitureData.length === 0 || !Array.isArray(furnitureData) ? (
                                            <div>
                                                No furniture data!
                                            </div>
                                        ) : (
                                            furnitureData.map((pieceOfFurniture, index) => {
                                                return (
                                                    <div key={index}>
                                                        <div>
                                                            <ListPartWithEditForm
                                                                key={pieceOfFurniture._id}
                                                                {...pieceOfFurniture}
                                                                image={pieceOfFurniture?.image}
                                                                imageToShow={pieceOfFurniture?.image}
                                                                onDelete={(_id) => { deleteFurniture(_id) }}
                                                                onEdit={(furniture) => { editFurniture(furniture) }}
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