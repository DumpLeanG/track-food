import Button from '../buttons/Button';
import Input from './Input';

export default function Login({className}) {
    return (
        <div className={className}>
            <Input type="email"/>
            <Input type="password"/>
            <Button type="login"/>
        </div>
    );
}