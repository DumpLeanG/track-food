import styles from "./AddButton.module.scss";
import Image from "next/image";

export default function AddButton( {handleClick}) {

    return (
        <button className={styles.add_btn} onClick={handleClick}>
            <Image
                src="/add.svg"
                alt="add-button"
                width={19}
                height={19}
            />
        </button>
    );
}