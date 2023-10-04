import { FC, useState } from 'react';
import styles from './categoryPart.module.scss';
import { ICategory } from '../../../../../../interfaces/ICategory';

interface CategoryPartProps {
    category: ICategory,
    categoryFilter: string,
    onSetCategoryHandler: (name: string) => void,
}

const CategoryPart: FC<CategoryPartProps> = ({
    categoryFilter,
    category,
    onSetCategoryHandler,
}) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <li className={styles.categoryPart}>

            <div className={styles.topListGeneral}>
                <div className={styles.topListContainer}>
                    <div
                        className={`${styles.categoryName} 
                        ${categoryFilter === category.name ? styles.selectedCategory : ''}`}
                        onClick={() => onSetCategoryHandler(category.name)}
                    >
                        {category.name}
                    </div>
                    {
                        category.hasArrow && (
                            <div
                                onClick={() => setIsOpen(!isOpen)}
                                className={isOpen ? styles.arrowUp : styles.arrowDown}
                            >
                                <svg
                                    onClick={() => setIsOpen(!isOpen)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
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

                        )
                    }

                </div>
            </div>

            <div className={styles.bottomList}>
                {
                    category.opened ? (
                        <ul
                            className={`${styles.bottomList}`}
                        >
                            {category.opened.map((part, index) => {
                                return (
                                    <li
                                        onClick={() => onSetCategoryHandler(part.name)}
                                        className={`${styles.listPart}
                                        ${isOpen ? styles.listPartOpen : styles.listPartClosed}
                                        ${categoryFilter === part.name ? styles.selectedCategory : ''}
                                        `}
                                        key={index}
                                    >
                                        {part.name}
                                    </li>
                                )
                            })}
                        </ul>
                    ) : (
                        null
                    )
                }
            </div>

        </li>
    )
}

export default CategoryPart;