import Button from '../layout/buttons/Button';
import Input from '../layout/inputs/Input';

export default function Login(props) {
    return (
        <div className={props.className}>
            <Input type="email" onChange={(e) => props.setEmail(e.target.value)}/>
            <Input type="password" onChange={(e) => props.setPassword(e.target.value)}/>
            <Button type="login"/>
        </div>
    );
}