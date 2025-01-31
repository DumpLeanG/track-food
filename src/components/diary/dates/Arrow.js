import styles from "./Arrow.module.scss";
import Image from "next/image";

export default function Arrow({ direction, handleClick }) {
    return (
        <button className={styles.diary_dates_arrow} onClick={handleClick}>
            <Image
                src={`/${direction}-arrow.svg`}
                alt="arrow"
                width={14}
                height={14}
            />
        </button>
    );
}