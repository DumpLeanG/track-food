export default function Item({className, name, amount, calories}) {
    return (
        <li className={className}>
            <span>{name}</span>
            <div>
                <span>{`x${amount}`}</span>
                <span>{calories}</span>
            </div>
        </li>
    );
}