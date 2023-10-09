import styles from './furniture.module.scss';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { premisesData } from '../../pages/Premises/premisesData';
import { getShowroomUrl } from '../../services/getShowroomUrl';
import Lottie from 'lottie-react'

import loadingAnimation from '../../assets/animations/Morphing.json';
import searchIcon from '../../assets/img/search.svg';

import SalesWindow from '../../components/_common/SalesWindow/SalesWindow';
import Categories from './components/Categories/Categories';
import MobileCategories from './components/MobileCategories/MobileCategories';

import furnitureController from '../../Api/furnitureController';
import producersController from '../../Api/producersController';
import collectionsController from '../../Api/collectionsController';
import { IFurniture } from '../../interfaces/IFurniture';
import { IProducer } from '../../interfaces/IProducer';
import { ICollection } from '../../interfaces/ICollection';


const BASE_URL = getShowroomUrl();

const Furniture = () => {

    const [loading, setLoading] = useState<boolean>(true);

    const [furnitureData, setFurnitureData] = useState<IFurniture[] | null>(null);
    const [allFurnituresData, setAllFurnituresData] = useState<IFurniture[]>([]);

    const [producersData, setProducersData] = useState<IProducer[] | null>(null);
    const [collectionsData, setCollectionsData] = useState<ICollection[] | null>([]);
    const [collectionsToDisplay, setCollectionsToDisplay] = useState<ICollection[] | null>(null)

    const [producerFilter, setProducerFilter] = useState<string | null>(null);
    const [collectionFilter, setCollectionFilter] = useState<string | null>(null);
    const [premiseFilter, setPremiseFilter] = useState<string | null>(null);
    const [categoryFilter, setCategoryFilter] = useState<string>('')

    const [showPerPage, setShowPerPage] = useState<number>(1);
    const [searchValue, setSearchValue] = useState<string>('');

    // const navigation = useLocation();

    const updateSearchValueHandler = (event: any) => {
        setSearchValue(event.target.value);
    }

    const getAllFurniture = async () => {
        setLoading(true);
        const res = await furnitureController.getAllFurniture();

        if (res.ok) {
            res.furniture && setAllFurnituresData(res.furniture);
        }

        setLoading(false)

    }


    const renderFurniture = () => {

        if (loading) return (
            <Lottie
                style={{
                    maxWidth: '250px',
                    maxHeight: '250px',
                }}
                animationData={loadingAnimation}
                loop={true}
            />
        )

        if (furnitureData && furnitureData.length !== 0 && Array.isArray(furnitureData)) {
            return (
                furnitureData.map((furniture, index) => {
                    return (
                        <div key={index}>
                            {showPerPage * 20 >= index - 1 && (
                                <SalesWindow
                                    key={index}
                                    furniture={furniture}
                                    image={`${BASE_URL}${furniture.image.replace('furnituresImages', 'furnituresImages/thumbnailImages')}`}
                                />
                            )
                            }
                        </div>
                    )
                })
            )
        }

        return (
            <div
                style={{
                    marginTop: '90px'
                }}
            >
                {(allFurnituresData && furnitureData?.length === 0) && 'Brak mebli o podanych parametrach'}
            </div>
        )
    }


    const search = (allFurnituresData: IFurniture[]) => {

        if (searchValue !== '') changeUrlParams('wyszukaj', searchValue);

        const newFilteredFurniturePack = [];

        for (const singleFurniture of allFurnituresData) {

            let displayFurniture = true;

            if (!singleFurniture.name.toLowerCase().includes(searchValue.toLowerCase()) && searchValue !== '') displayFurniture = false;
            if (singleFurniture.producer !== producerFilter && producerFilter !== '') displayFurniture = false;
            if (singleFurniture.partCollection !== collectionFilter && collectionFilter !== '') displayFurniture = false;

            if (premiseFilter === 'SALON' && premiseFilter !== null) { if (singleFurniture.designedForTheLivingRoom === false) displayFurniture = false; }
            if (premiseFilter === 'KUCHNIA' && premiseFilter !== null) { if (singleFurniture.designedForTheKitchen === false) displayFurniture = false; }
            if (premiseFilter === 'SYPIALNIA' && premiseFilter !== null) { if (singleFurniture.designedForTheBedroom === false) displayFurniture = false; }
            if (premiseFilter === 'BIURO' && premiseFilter !== null) { if (singleFurniture.designedForTheOffice === false) displayFurniture = false; }
            if (premiseFilter === 'POKÓJ MŁODZIEŻOWY' && premiseFilter !== null) { if (singleFurniture.designedForTheYouthRoom === false) displayFurniture = false; }
            if (premiseFilter === 'PRZEDPOKÓJ' && premiseFilter !== null) { if (singleFurniture.designedForTheHallway === false) displayFurniture = false; }
            if (premiseFilter === 'POKÓJ DZIECIĘCY' && premiseFilter !== null) { if (singleFurniture.designedForTheChildrensRoom === false) displayFurniture = false; }
            if (premiseFilter === 'ŁAZIENKA' && premiseFilter !== null) { if (singleFurniture.designedForTheBathroom === false) displayFurniture = false; }

            if (categoryFilter) {
                if (singleFurniture.categories) {
                    if (!singleFurniture.categories.includes(`%&${categoryFilter}&%`)) displayFurniture = false;
                } else {
                    displayFurniture = false;
                }
            }

            displayFurniture && newFilteredFurniturePack.push(singleFurniture);
        }

        setFurnitureData(newFilteredFurniturePack);
    }


    const showPerPageHandler = () => {
        document.documentElement.scrollHeight - window.innerHeight <= window.scrollY + 1000 && setShowPerPage(showPerPage + 1);
    }

    window.addEventListener('scroll', showPerPageHandler)


    const getAllProducers = async () => {
        const res = await producersController.getAllProducers();
        setProducersData(res.producers);
    }

    const getAllCollections = async () => {
        const res = await collectionsController.getAllCollections();
        setCollectionsData(res.collections);
    }

    const setProducerFilterHandler = (e: any) => {
        const producerId = e.target.value;
        setProducerFilter(producerId);
        changeUrlParams('producerId', producerId);
        setCollectionFilter('')
    }

    const setCollectionFilterHandler = (e: any) => {
        const collectionId = e.target.value;
        setCollectionFilter(collectionId);
        changeUrlParams('collectionId', collectionId);
    }

    const setPremiseFilterHandler = (e: any) => {
        const premiseName = e.target.value;
        setPremiseFilter(premiseName);
        changeUrlParams('premiseName', premiseName);
    }

    const setCategoryHandler = (categoryValue: string) => {
        setCategoryFilter(categoryValue);
        changeUrlParams('category', categoryValue);
    }

    const resetFilters = () => {
        setProducerFilter('');
        setCollectionFilter('');
        setPremiseFilter('');
        changeUrlParams('producerId', '');
        changeUrlParams('collectionId', '');
        changeUrlParams('premiseName', '');
    }

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();

    const checkURLSearchParams = () => {
        query.get('producerId') ? setProducerFilter(query.get('producerId')) : setProducerFilter('')
        query.get('collectionId') ? setCollectionFilter(query.get('collectionId')) : setCollectionFilter('')
        query.get('premiseName') ? setPremiseFilter(query.get('premiseName')) : setPremiseFilter('')

        const categoryParam = query.get('category')
        categoryParam ? setCategoryFilter(categoryParam) : setCategoryFilter('')

        const searchParam = query.get('wyszukaj')
        searchParam && setSearchValue(searchParam)

        const showPerPageParam = query.get('showPerPage')
        showPerPageParam ? setShowPerPage(+showPerPageParam) : setShowPerPage(1)
    }

    const changeUrlParams = (name: string, value: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set(`${name}`, value);
        window.history.pushState(null, '', url.toString());
    }

    const setCollectionsToDisplayHandler = () => {
        if (!collectionsData) return
        const collections = [...collectionsData]
        const collectionsToDisplay = collections.filter(x => x.producer === producerFilter)
        setCollectionsToDisplay (collectionsToDisplay);
    }

    useEffect(() => {
        getAllFurniture();
    }, [])

    useEffect(() => {
        checkURLSearchParams();
        getAllProducers();
        getAllCollections();
    }, [])

    useEffect(() => {
        allFurnituresData && search(allFurnituresData);
        setCollectionsToDisplayHandler()
    }, [producerFilter, collectionFilter, premiseFilter, allFurnituresData, categoryFilter])

    return (
        <div className={styles.general}>

            <div className={styles.categoriesContainer}>
                <Categories
                    categoryFilter={categoryFilter}
                    onSetCategoryHandler={(categoryValue) => setCategoryHandler(categoryValue)}
                />
            </div>

            <div>

                <div className={styles.search}>

                    <img alt='search'
                        className={styles.searchIcon}
                        src={searchIcon}
                    />

                    <input
                        className={styles.searchInput}
                        value={searchValue}
                        onChange={updateSearchValueHandler}
                        onKeyDown={e => (e.key === 'Enter' && search(allFurnituresData))}
                        type='text'
                        placeholder='Wyszukaj...'
                    />

                    <button
                        className={styles.searchButton}
                        onClick={() => search(allFurnituresData)}
                    >
                        Szukaj
                    </button>
                </div>

                <div className={styles.mobileCategoriesContainer}>
                    <MobileCategories
                        categoryFilter={categoryFilter}
                        onSetCategoryHandler={(categoryValue) => setCategoryHandler(categoryValue)}
                    />
                </div>

                <div className={styles.sortFurniture}>

                    <select
                        className={styles.select}
                        value={producerFilter || ''}
                        onChange={setProducerFilterHandler}
                    >
                        <option value=''>Dowolny producent</option>
                        {
                            !producersData
                                || producersData.length === 0
                                || !Array.isArray(producersData)
                                ?
                                (
                                    null
                                ) : (
                                    producersData.map((producer, index) => {
                                        return (
                                            <option
                                                className={styles.sortOption}
                                                key={index}
                                                value={producer._id}
                                            >
                                                {producer.name}
                                            </option>
                                        )
                                    })
                                )
                        }
                    </select>

                    <select
                        className={styles.select}
                        value={collectionFilter || ''}
                        onChange={setCollectionFilterHandler}
                        disabled={(!producerFilter || collectionsToDisplay?.length === 0) && true}
                    >
                        <option value='' >Dowolna kolekcja</option>
                        {
                            !collectionsToDisplay || collectionsToDisplay.length === 0 || !Array.isArray(collectionsToDisplay) ? (
                                null
                            ) : (
                                collectionsToDisplay.map((collection, index) => {
                                    return (
                                        <option
                                            className={styles.sortOption}
                                            key={index}
                                            value={collection._id}
                                        >
                                            {collection.name}
                                        </option>
                                    )
                                })
                            )
                        }
                    </select>

                    <select
                        className={styles.select}
                        value={premiseFilter || ''}
                        onChange={setPremiseFilterHandler}
                    >
                        <option value='' >Dowolne pomieszczenie</option>
                        {
                            !premisesData || premisesData.length === 0 || !Array.isArray(premisesData) ? (
                                null
                            ) : (
                                premisesData.map((premise, index) => {
                                    return (
                                        <option
                                            className={styles.sortOption}
                                            key={index}
                                            value={premise.name}
                                        >
                                            {premise.name}
                                        </option>
                                    )
                                })
                            )
                        }
                    </select>


                    {
                        producerFilter || collectionFilter || premiseFilter
                            ? <button className={styles.filterButton} onClick={resetFilters}>Resetuj filtry</button>
                            : ''
                    }

                </div>


                <div className={styles.furnitureContainer}>
                    {renderFurniture()}
                </div>
            </div>
        </div>
    )
}

export default Furniture;