import { FC, useState } from 'react';
import { categoryData } from '../Categories/categoryData';
import styles from './mobileCategories.module.scss';
import CategoryPart from './components/CategoryPart/CategoryPart';

interface MobileCategoriesProps {
    onSetCategoryHandler: (name: string) => void,
    categoryFilter: string,
}

const MobileCategories: FC<MobileCategoriesProps> = ({
    onSetCategoryHandler,
    categoryFilter,
}) => {

    const [showMobileCategories, setShowMobileCategories] = useState<boolean>(false);

    const setShowMobileCategoriesHandler = (value: boolean) => {
        setShowMobileCategories(value);
    }

    const onClickClearButtonHandler = () => {
        onSetCategoryHandler('');
        setShowMobileCategories(false);
    }

    return (
        <div className={styles.general}>

            <div className={styles.nameContainer}>

                <div
                    className={styles.categories}
                    onClick={() => setShowMobileCategories(!showMobileCategories)}
                >
                    Kategorie
                    <div
                        className={showMobileCategories ? styles.arrowUpDiv : styles.arrowDownDiv}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="currentColor"
                            className="bi bi-chevron-down"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                            />
                        </svg>
                    </div>
                </div>

                {categoryFilter ?
                    (
                        <h3
                            className={styles.clearButton}
                            onClick={() => onClickClearButtonHandler()}
                        >
                            Wyczyść kategorie
                        </h3>
                    )
                    :
                    <></>
                }

                {categoryFilter ?
                    (
                        <>
                            <div
                                className={styles.categoryName}
                            >
                                Wybrana kategoria:

                            </div>
                            <p
                                className={styles.categoryName}
                            >
                                {categoryFilter}
                            </p>
                        </>
                    )
                    :
                    <></>
                }
            </div>

            <div className={`${styles.container} ${showMobileCategories ? styles.containerOpened : styles.containerClosed}`}>

                <ul className={styles.categoriesUl}>
                    {
                        categoryData.length === 0
                            || !Array.isArray(categoryData) ? (
                            <div>
                                category data error
                            </div>
                        ) : (
                            categoryData.map((data, index) => {
                                return (
                                    <CategoryPart
                                        categoryData={data}
                                        key={index}
                                        onSetCategoryHandler={onSetCategoryHandler}
                                        onShow={(value) => setShowMobileCategoriesHandler(value)}
                                    />
                                )
                            })
                        )
                    }
                </ul>
            </div>

        </div>
    )
}

export default MobileCategories;