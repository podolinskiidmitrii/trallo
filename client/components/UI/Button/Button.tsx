import React from "react";
import s from './Button.module.scss'

interface Props{
    children:React.ReactNode
    onClick:()=>void
}

const Button = (props:Props) => {

    const {children, onClick} = props

    return (
        <button className={s.button} onClick={onClick}>
            {children}
        </button>
    )

}

export default Button;