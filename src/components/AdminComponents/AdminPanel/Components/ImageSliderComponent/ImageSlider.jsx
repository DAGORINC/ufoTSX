import { useState } from 'react';
import styles from './imageSlider.module.scss';
import imageSliderController from '../../../../../Api/imageSliderController';
import ListPartWithEditForm from './Components/ListPartWithEditForm/ListPartWithEditForm';

export default function ImageSlider() {


    const [showImageSliderAddForm, setShowImageSliderAddForm] = useState(false);
    const [showImageSliderData, setShowImageSLiderData] = useState(false);
    const [imageSliderData, setImageSliderData] = useState([]);

    const [imageAddForm, setImageAddForm] = useState([]);
    const [linkAddForm, setLinkAddForm] = useState('');
    const [isVissibleAddForm, setIsVissibleAddForm] = useState(true);


    const changeImageAddFormHandler = event => {
        const image = event.target.files[0];
        setImageAddForm(image);
    }


    const changeLinkAddFormHandler = event => {
        const link = event.target.value;
        setLinkAddForm(link);
    }


    const getAllImageSliderData = async () => {
        const res = await imageSliderController.getAllImages();
        const images = res.images;
        if (images) images.reverse();
        setImageSliderData(images);
    }


    const getAllImageSliderDataHandler = () => {
        if (!showImageSliderData) {
            setShowImageSLiderData(true);
            getAllImageSliderData();
        } else {
            setShowImageSLiderData(false);
        }
    }

    const addImage = async () => {

        const image = {
            image: imageAddForm,
            link: linkAddForm,
            isVissible: isVissibleAddForm
        }

        if (!imageAddForm || !linkAddForm ) return null;

        try {
            const res = await imageSliderController.addImage(image);
            if (!res.ok) return
            const imageSlider = [...imageSliderData];
            if(imageSlider) imageSlider.reverse().push(res.newImage)
            if(imageSlider) imageSlider.reverse()
            setImageSliderData(imageSlider)
        } catch (error) {
            return `cannot add image`;
        }

        setImageAddForm('');
        setLinkAddForm('');
        setIsVissibleAddForm(true);

    }

    const deleteImage = async (_id) => {
        await imageSliderController.deleteImage(_id);
        setImageSliderData(imageSliderData.filter(image => image._id !== _id))
    }


    return (
        <div className={styles.general}>


            <h1 className={styles.imageSliderContainer} onClick={getAllImageSliderDataHandler}>Galeria strona główna</h1>


            <div className={styles.buttonContainer}>

                <button className={styles.addButton} onClick={() => setShowImageSliderAddForm(!showImageSliderAddForm)}>
                    {showImageSliderAddForm ? 'Anuluj dodawanie' : 'Dodaj zdjęcie'}
                </button>

            </div>


            {
                showImageSliderAddForm && (
                    <div className={styles.formContainer}>

                        <div>
                            Link dla zdjęcia
                            <input type='text' className={styles.input} value={linkAddForm} onChange={changeLinkAddFormHandler} />
                        </div>

                        <div>
                            Zdjęcie
                            <input type='file' id='files' className={styles.input} onChange={changeImageAddFormHandler} />
                        </div>

                        {/* <div>
                            Wyświetl Zdjęcie
                            <button style={{ marginLeft: '5px' }} onClick={() => setIsVissibleAddForm(!isVissibleAddForm)}>
                                {isVissibleAddForm ? 'Tak' : 'Nie'}
                            </button>
                        </div> */}

                        <button className={styles.addButton} onClick={addImage}>Dodaj zdjęcie</button>

                    </div>
                )
            }

            {
                showImageSliderData && (
                    <div className={styles.imageSliderData}>
                        {
                            imageSliderData.length === 0 || !Array.isArray(imageSliderData) ? (
                                <div>
                                    No image slider data!
                                </div>
                            ) : (
                                <div className={styles.imagesSlider}>{
                                    imageSliderData.map((image, index) => {
                                        return (
                                            <div key={index}>

                                                <div>
                                                    <ListPartWithEditForm
                                                        key={index}
                                                        _id={image._id}
                                                        image={image.image}
                                                        link={image.link}
                                                        isVissible={image.isVissible}
                                                        onDelete={_id => deleteImage(_id)}
                                                    />
                                                </div>

                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        }
                    </div>
                )
            }


        </div>
    )
}