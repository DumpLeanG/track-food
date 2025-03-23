import styles from "./ExpandButton.module.scss";
import Image from "next/image";

export default function ExpandButton( {isActive, handleClick} ) {

    return (
        isActive ? (
            <button className={`${styles.expand_btn} ${styles.activated_btn}`} onClick={handleClick}>
                <Image
                    src="/expand.svg"
                    alt="expand-button"
                    width={16}
                    height={16}
                />
            </button>
        ) : (
            <button className={styles.expand_btn} onClick={handleClick}>
                <Image
                    src="/expand.svg"
                    alt="expand-button"
                    width={16}
                    height={16}
                />
            </button>
        )
    );
}