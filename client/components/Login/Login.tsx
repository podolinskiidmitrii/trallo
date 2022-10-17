import React, { useState } from 'react';
import { Api } from '../../api';
import Button from '../UI/Button/Button';
import { Input } from '../UI/Input';
import s from './Login.module.scss'

const Login:React.FC = () =>{
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const onChangeUsername = (value:string) => {
        setUsername(value)
    }

    const onChangePassword = (value:string) => {
        setPassword(value)
    }

    const onSubmit = async () =>{
        const ap = await Api().auth.login({
            username,
            password
        })

        console.log(ap)
    }
 
    return (
        <div className={s.wrapper}>
            <div className={s.title}>Войти аккаунт</div>
            <Input onChange={onChangeUsername} placeholder="Укажите логин"/>
            <Input onChange={onChangePassword} placeholder="Укажите пароль"/>

            <Button onClick={onSubmit}> 
                Войти
            </Button>

        </div>
    );
}

export default Login;
