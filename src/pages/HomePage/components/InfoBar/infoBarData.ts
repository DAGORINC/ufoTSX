import image1 from '../../../../assets/img/infobarIcons/truck.svg';
import image2 from '../../../../assets/img/infobarIcons/installment.svg';
import image5 from '../../../../assets/img/infobarIcons/coins.svg';
import { IInfobar } from '../../../../interfaces/IInfobar';

const date = new Date();


export const infoBarData: IInfobar[] = [
    {
        name: 'photo1',
        image: image1,
        text: 'MOŻLIWOŚĆ DOSTAWY',
    },
    {
        name: 'photo2',
        image: image2,
        text: 'GWARANCJA STAŁEJ RATY',
    },
    {
        name: 'photo3',
        text2: date.getFullYear() - 1992,
        text: 'LAT DOŚWIADCZENIA',
    },
    {
        name: 'photo5',
        image: image5,
        text: 'NAJLEPSZE CENY',
    },
    {
        name: 'photo4',
        text2: localStorage.getItem('selectedShowroom') === 'minsk' ? '10.000m²' : '4.000m²',
        text: 'POWIERZCHNI',
    },
]