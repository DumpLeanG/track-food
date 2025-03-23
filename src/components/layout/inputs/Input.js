export default function Input( {type, defaultValue, onChange} ) {
    switch(type) {
        case "email":
            return (
                <input type="email" name={type} placeholder="Электронный адрес" defaultValue={defaultValue} onChange={onChange} required/>
            )
        case "password":
            return (
                <input type="password" name={type} placeholder="Пароль" defaultValue={defaultValue} onChange={onChange} required/>
            )
        case "confirmPassword":
            return (
                <input type="password" name={type} placeholder="Подтверждение пароля" defaultValue={defaultValue} onChange={onChange} required/>
            )
        default:
            return (
                <input type="text" name={type} placeholder="Имя" defaultValue={defaultValue} onChange={onChange} required/>
            )
    }
}