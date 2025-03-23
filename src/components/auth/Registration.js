"use client";

import Button from '../layout/buttons/Button';
import Input from '../layout/inputs/Input';

export default function Registration(props) {

    return (
        <div className={props.className}>
            <Input type="name" onChange={(e) => props.setName(e.target.value)}/>
            <Input type="email" onChange={(e) => props.setEmail(e.target.value)}/>
            <Input type="password" onChange={(e) => props.setPassword(e.target.value)}/>
            <Input type="confirmPassword" onChange={(e) => props.setConfirmPassword(e.target.value)}/>
            <Button type="register"/>
        </div>
    );
}