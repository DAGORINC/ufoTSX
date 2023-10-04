import { FC, useState } from 'react';
import styles from './categoryPart.module.scss';
import { ICategory } from '../../../../../../interfaces/ICategory';

interface CategoryPartProps {
    onSetCategoryHandler: (name: string) => void,
    onShow: (show: boolean) => void,
    categoryData: ICategory,
}

const CategoryPart: FC<CategoryPartProps> = ({
    onSetCategoryHandler,
    onShow,
    categoryData,
}) => {

    const [isOpen, setIsOpen] = useState(false);

    const onClickEvent = (value: string) => {
        onSetCategoryHandler(value);
        onShow(false);
    }

    return (
        <li className={styles.categoryPart}>

            <div className={styles.topListGeneral}>
                <div className={styles.topListContainer}>
                    <div
                        className={styles.categoryName}
                        onClick={() => onClickEvent(categoryData.name)}
                    >
                        {categoryData.name}
                    </div>
                    {
                        categoryData.hasArrow && (
                            <div
                                onClick={() => setIsOpen(!isOpen)}
                                className={isOpen ? styles.arrowUp : styles.arrowDown}
                            >

                                <svg
                                    onClick={() => setIsOpen(!isOpen)}
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

                        )
                    }

                </div>
            </div>

            <div className={styles.bottomList}>
                {
                    categoryData.opened && (
                        <ul className={styles.bottomList}>
                            {categoryData.opened.map((part, index) => {
                                return (
                                    <li
                                        onClick={() => onClickEvent(part.name)}
                                        className={`${styles.listPart} 
                                        ${isOpen
                                                ? styles.listPartOpen
                                                : styles.listPartClosed}`
                                        }
                                        key={index}
                                    >
                                        {part.name}
                                    </li>
                                )
                            })}
                        </ul>
                    )
                }
            </div>

        </li>
    )
}

export default CategoryPart;