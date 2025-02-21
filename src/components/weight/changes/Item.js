import styles from "./Item.module.scss";
import Image from "next/image";

const options = {
    month: 'long',
    day: 'numeric',
}

export default function Item( {date, weight, image} ) {
    return (
        <li className={styles.weight_changes_list_item}>
            <span>{date.toLocaleString("ru", options)}</span>
            <div>
                <span>{weight}</span>
                <Image src={`/${image}.svg`}
                alt={image} 
                width={19} 
                height={19} />
            </div>
        </li>
    );
}