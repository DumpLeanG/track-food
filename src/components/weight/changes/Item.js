import styles from "./Item.module.scss";
import Image from "next/image";

export default function Item( {date, weight, image} ) {
    return (
        <div className={styles.weight_changes_list_item}>
            <div className={styles.weight_changes_list_item_box}>
                <span>{date}</span>
                <div>
                    <span>{weight}</span>
                    <Image src={`/${image}.svg`}
                    alt={image} 
                    width={19} 
                    height={19} />
                </div>
            </div>
        </div>
    );
}