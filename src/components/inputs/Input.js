export default function Input( {type, defaultValue} ) {
    switch(type) {
        case "email":
            return (
                <input type="email" name={type} placeholder="Электронный адрес" defaultValue={defaultValue} />
            )
        case "password":
            return (
                <input type="password" name={type} placeholder="Пароль" defaultValue={defaultValue} />
            )
        case "confirmPassword":
            return (
                <input type="password" name={type} placeholder="Подтверждение пароля" defaultValue={defaultValue} />
            )
        default:
            return (
                <input type="text" name={type} placeholder="Имя" defaultValue={defaultValue} />
            )
    }
}