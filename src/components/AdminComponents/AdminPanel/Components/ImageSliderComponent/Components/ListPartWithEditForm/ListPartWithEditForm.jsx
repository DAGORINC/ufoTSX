import styles from './listPartWithEditForm.module.scss';
import { getShowroomUrl } from "../../../../../../../services/getShowroomUrl";
const BASE_URL = getShowroomUrl();

export default function ListPart(props) {

    return (
        <div className={styles.general}>


            <div className={styles.imageContainer}>

                <img src={`${BASE_URL}${props.image}`} className={styles.image} alt={'slider part'} />

            </div>

            <div className={styles.linkContainer}>

                {props.link}


                <button className={styles.deleteButton} onClick={() => props.onDelete(props._id)}>Usuń</button>



            </div>

        </div>
    )

}