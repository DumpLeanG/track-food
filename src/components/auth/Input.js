export default function Input( {type} ) {
    switch(type) {
        case "email":
            return (
                <input type="email" name={type} placeholder="Электронный адрес"/>
            )
        case "password":
            return (
                <input type="password" name={type} placeholder="Пароль"/>
            )
        case "confirmPassword":
            return (
                <input type="password" name={type} placeholder="Подтверждение пароля"/>
            )
        default:
            return (
                <input type="text" name={type} placeholder="Имя"/>
            )
    }
}