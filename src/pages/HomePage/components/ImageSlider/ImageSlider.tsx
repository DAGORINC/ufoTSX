import { useEffect, useState } from 'react';
import styles from './imageSlider.module.scss';
import arrowLeft from '../../../../assets/img/arrowleft.svg';
import arrowRight from '../../../../assets/img/arrowright.svg';
import imageSliderController from '../../../../Api/imageSliderController';
import { getShowroomUrl } from '../../../../services/getShowroomUrl';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../../assets/animations/Morphing.json';
import { ISlide } from '../../../../interfaces/ISlide';
import { Link } from 'react-router-dom';

const BASE_URL = getShowroomUrl();

export default function ImageSlider() {

    const [images, setImages] = useState<ISlide[] | null>(null);
    const [currentSlide, setCurrent] = useState<number>(0);
    const [length, setImagesLength] = useState<number>(0);
    const [sliderCount, setSliderCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const slideFreezeTime = 8;


    const getAllImages = async () => {

        setLoading(true)
        const res = await imageSliderController.getAllImages();
        setLoading(false)

        if (!res.images) return;

        const images = res.images.reverse();
        setImages(images);
        setImagesLength(images.length)
    }


    const nextSlide = () => {
        setCurrent(currentSlide => (currentSlide === length - 1 ? 0 : currentSlide + 1))
        setSliderCount(0);
    }

    const prevSlide = () => {
        setCurrent(currentSlide => (currentSlide === 0 ? length - 1 : currentSlide - 1))
        setSliderCount(0);
    }


    useEffect(() => {

        const interval = setInterval(() => {
            sliderCount > slideFreezeTime - 1 
            ? nextSlide() 
            : setSliderCount(sliderCount => sliderCount + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [images, length, sliderCount]);

    useEffect(() => {
        getAllImages();
    }, []);

    return (
        <div>
            {
                loading ? (
                    <div className={styles.loadingContainer}>
                        <Lottie
                            style={{
                                maxWidth: '250px',
                                maxHeight: '250px',
                            }}
                            animationData={loadingAnimation}
                            loop={true}
                        />
                    </div>
                ) : (
                    !images || images.length === 0 || !Array.isArray(images) ? (
                        <div>

                        </div>
                    ) : (

                        <div className={styles.general}>

                            <img
                                src={arrowLeft}
                                className={styles.leftArrow}
                                onClick={prevSlide}
                                alt='left arrow'
                            />
                            <img
                                src={arrowRight}
                                className={styles.rightArrow}
                                onClick={nextSlide}
                                alt='right arrow'
                            />

                            <div className={styles.images}>

                                {images.map((slide, index) => {
                                    return (
                                        <div
                                            className={index === currentSlide
                                                ? styles.slideActive
                                                : styles.slide} key={index}
                                        >
                                            {index === currentSlide
                                                && (
                                                    <Link
                                                        to={slide.link}
                                                    >
                                                        <img
                                                            className={styles.image}
                                                            src={`${BASE_URL}${slide.image}`}
                                                            alt={slide.name}
                                                        />
                                                    </Link>
                                                )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                )
            }
        </div>
    )
}