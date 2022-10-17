import React, { FormEvent, SetStateAction, useState } from 'react';
import { Api } from '../../api';
import Button from '../UI/Button/Button';
import { Input } from '../UI/Input';
import s from './SignupForm.module.scss'


const SignupForm:React.FC = () =>{

    const [email, setEmail] = useState<string>('')
    const [username, setUserName] = useState<string>('')
    const [fullname, setFullname] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const onChangeEmail = (value:string) => {
        setEmail(value)
    }

    const onChangeUsername = (value:string) => {
        setUserName(value)
    }

    const onChangeFullname = (value:string) => {
        setFullname(value)
    }

    const onChangePassword = (value:string) => {
        setPassword(value)
    }

    const onSubmit = () =>{
        const ap = Api().auth.registration({
            email,
            username,
            fullname,
            password
        })
    }
 
    return (
        <div className={s.wrapper}>
            <div className={s.title}>Зарегистрировать аккаунт</div>

            <Input onChange={onChangeEmail} placeholder="Укажите E-mail адрес"/>
            <Input onChange={onChangeUsername} placeholder="Укажите логин"/>
            <Input onChange={onChangeFullname} placeholder="Укажите ФИО"/>
            <Input onChange={onChangePassword} placeholder="Укажите пароль"/>

            <Button onClick={onSubmit}> 
                Зарегистрироваться
            </Button>

        </div>
    );
}

export default SignupForm;
