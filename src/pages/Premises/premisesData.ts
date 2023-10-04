import image1 from '../../assets/img/premiseImage/1.jpg';
import image2 from '../../assets/img/premiseImage/2.jpg';
import image3 from '../../assets/img/premiseImage/3.jpg';
import image4 from '../../assets/img/premiseImage/4.jpg';
import image5 from '../../assets/img/premiseImage/5.jpg';
import image6 from '../../assets/img/premiseImage/6.jpg';
import image7 from '../../assets/img/premiseImage/7.jpg';
import image8 from '../../assets/img/premiseImage/8.jpg';
import { IPremise } from '../../interfaces/IPremise';

export const premisesData: IPremise[] = [
    {
        name: 'SALON',
        image: image1,
        databaseValue: 'designedForTheLivingRoom',
    },
    {
        name: 'KUCHNIA',
        image: image2,
        databaseValue: null,
    },
    {
        name: 'SYPIALNIA',
        image: image3,
    },
    {
        name: 'BIURO',
        image: image4,
    },
    {
        name: 'POKÓJ MŁODZIEŻOWY',
        image: image5,
    },
    {
        name: 'PRZEDPOKÓJ',
        image: image6,
    },
    {
        name: 'POKÓJ DZIECIĘCY',
        image: image7,
    },
    {
        name: 'ŁAZIENKA',
        image: image8,
    },
]