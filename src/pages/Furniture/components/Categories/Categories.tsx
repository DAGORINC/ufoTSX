import { FC } from 'react';
import styles from './categories.module.scss';
import { categoryData } from './categoryData';
import CategoryPart from './components/CategoryPart/CategoryPart';

interface CategoriesProps {
    onSetCategoryHandler: (name: string) => void,
    categoryFilter: string,
}

const Categories: FC<CategoriesProps> = ({
    onSetCategoryHandler,
    categoryFilter,
}) => {

    return (
        <div className={styles.general}>


            <div className={styles.nameContainer}>

                <h2 className={styles.categories}>Kategorie</h2>

                <h3
                    className={`${categoryFilter ? styles.clearButton : styles.hiddenClearButton}`}
                    onClick={() => onSetCategoryHandler('')}
                >
                    Wyczyść kategorie
                </h3>

            </div>

            <ul className={styles.categoriesUl}>

                {
                    categoryData.length === 0 || !Array.isArray(categoryData) ? (
                        <div>
                            category data error
                        </div>
                    ) : (
                        categoryData.map((data, index) => {
                            return (
                                <CategoryPart
                                    categoryFilter={categoryFilter}
                                    category={data}
                                    key={index}
                                    onSetCategoryHandler={onSetCategoryHandler}
                                />
                            )
                        })
                    )
                }

            </ul>


        </div>
    )
}

export default Categories;