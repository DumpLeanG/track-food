import Button from '../buttons/Button';
import Input from './Input';

export default function Registration({className}) {
    return (
        <div className={className}>
            <Input type="name"/>
            <Input type="email"/>
            <Input type="password"/>
            <Input type="confirmPassword"/>
            <Button type="reg"/>
        </div>
    );
}