import image1 from '../../../../assets/img/zdj1.jpg';
import image2 from '../../../../assets/img/zdj2.jpg';
import image3 from '../../../../assets/img/zdj3.jpg';
import image4 from '../../../../assets/img/zdj4.png';
import image5 from '../../../../assets/img/zdj5.jpeg';
import { ISlide } from '../../../../interfaces/ISlide';

export const sliderData: ISlide[] = [
    {
        name: 'photo1',
        image: image1,
        link: '/1',
    },
    {
        name: 'photo2',
        image: image2,
        link: '/2',
    },
    {
        name: 'photo3',
        image: image3,
        link: '/3',
    },
    {
        name: 'photo4',
        image: image4,
        link: '/4',
    },
    {
        name: 'photo5',
        image: image5,
        link: '/5',
    },
]