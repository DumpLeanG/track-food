import styles from "./Meal.module.scss";
import Image from "next/image";
import AddButton from "../../layout/buttons/AddButton";
import ExpandButton from "../../layout/buttons/ExpandButton";
import Product from "./Product";

export default function Meal( { picture, type, isActive} ) {
    return (
        <div className={styles.diary_meals_item} key={picture}>
            <div className={styles.diary_meals_item_head}>
                <div className={styles.diary_meals_item_head_name}>
                    <Image
                        className={styles.header_nav_logo}
                        src={`/${picture}.svg`}
                        alt={type}
                        width={20}
                        height={20}
                        priority
                    />
                    <span>{type}</span>
                </div>
                <AddButton />
            </div>
            <div className={styles.diary_meals_item_numbers}>
                <div className={styles.diary_meals_item_numbers_pfc}>
                    <span>50.92</span>
                    <span>24.05</span>
                    <span>34.08</span>
                </div>
                <div className={styles.diary_meals_item_numbers_calories}>
                    <span>562</span>
                    <ExpandButton isActive={isActive}/>
                </div>
            </div>
            <ul className={styles.diary_meals_item_products}>
                <Product />
            </ul>
        </div>
    );
}