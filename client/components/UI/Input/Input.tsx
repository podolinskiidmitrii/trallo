import { Dispatch, SetStateAction } from 'react'
import s from './Input.module.scss'

interface Props {
    value?: string
    placeholder?: string
    onChange: (value: string) => void
}

export const Input = ({ placeholder, onChange }: Props) => {
    return (
        <>
            <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                className={s.Input}
                placeholder={placeholder} 
            />
        </>
    )
}