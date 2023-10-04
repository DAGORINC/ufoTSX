import furnitureIcon from '../../../../assets/img/mobileMenuIcons/furnitures.svg';
import collectionsIcon from '../../../../assets/img/mobileMenuIcons/collections.svg';
import premisesIcon from '../../../../assets/img/mobileMenuIcons/premises.svg';
import producersIcon from '../../../../assets/img/mobileMenuIcons/producers.svg';
import promotionsIcon from '../../../../assets/img/mobileMenuIcons/promotions.svg';
import contactIcon from '../../../../assets/img/mobileMenuIcons/contact-mail.svg';
import { INavigationButton } from '../../../../interfaces/INavigationButton';


export const navigationButtons: INavigationButton[] = [
    {
        name: 'Meble',
        url: '/meble',
        hasArrow: true,
        mobileIcon: furnitureIcon,
    },
    {
        name: 'Kolekcje',
        url: '/kolekcje',
        hasArrow: true,
        mobileIcon: collectionsIcon,
    },
    {
        name: 'Pomieszczenia',
        url: '/pomieszczenia',
        hasArrow: true,
        mobileIcon: premisesIcon,
    },
    {
        name: 'Producenci',
        url: '/producenci',
        hasArrow: true,
        mobileIcon: producersIcon,
    },
    {
        name: 'Promocje',
        url: '/promocje',
        hasArrow: false,
        mobileIcon: promotionsIcon,
    },
    {
        name: 'Kontakt',
        url: '/kontakt',
        hasArrow: false,
        mobileIcon: contactIcon,
    },
]