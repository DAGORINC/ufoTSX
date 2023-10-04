import Collections from '../pages/Collections/Collections';
import Contact from '../pages/Contact/Contact';
import Furniture from '../pages/Furniture/Furniture';
import HomePage from '../pages/HomePage/HomePage';
import Premises from '../pages/Premises/Premises';
import Producers from '../pages/Producers/Producers';
import Promotions from '../pages/Promotions/Promotions';
import AdminPanel from '../components/AdminComponents/AdminPanel/AdminPanel';
import PieceOfFurniture from '../pages/PieceOfFurniture/PieceOfFurniture';
import SelectShowroomPage from '../pages/SelectShowroomPage/SelectShowroomPage';
import SignIn from '../pages/SignIn/SignIn';
import Clarnet from '../components/AdminComponents/Clarnet/Clarnet';

const routes = [
    {
        name: 'Meble',
        url: '/meble',
        component: Furniture,
        hasStandardLayout: true,
    },
    {
        name: 'Kolekcje',
        url: '/kolekcje',
        component: Collections,
        hasStandardLayout: true,
    },
    // {
    //     name: 'Kolekcje',
    //     url: '/collections/:id',
    //     component: SingleElement,
    //     hasStandardLayout: true,
    // },
    {
        name: 'Producenci',
        url: '/producenci',
        component: Producers,
        hasStandardLayout: true,
    },
    {
        name: 'Pomieszczenia',
        url: '/pomieszczenia',
        component: Premises,
        hasStandardLayout: true,
    },
    {
        name: 'Promocje',
        url: '/promocje',
        component: Promotions,
        hasStandardLayout: true,
    },
    {
        name: 'Kontakt',
        url: '/kontakt',
        component: Contact,
        hasStandardLayout: true,
    },
    {
        name: 'UFO Meble',
        url: '/',
        component: HomePage,
        hasStandardLayout: true,
    },
    {
        name: 'Admin Panel',
        url: '/adminPanel',
        component: AdminPanel,
        hasStandardLayout: true,
    },
    {
        name: 'UFO Meble',
        url: '/mebel',
        component: PieceOfFurniture,
        hasStandardLayout: true,
    },
    {
        name: 'UFO Meble',
        url: '/wybierz-salon',
        component: SelectShowroomPage,
        hasStandardLayout: false,
    },
    {
        name: 'Logowanie',
        url: '/signin',
        component: SignIn,
        hasStandardLayout: false,
    },
    {
        name: 'Clarnet',
        url: '/clarnet',
        component: Clarnet,
        hasStandardLayout: false,
    },
]

export default routes;