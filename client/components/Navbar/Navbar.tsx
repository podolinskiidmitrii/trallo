import Link from 'next/link'
import s from './Navbar.module.scss'


const Navbar:React.FC = () => {
    return (
        <>
            <div className={s.container}>

                <div className={s.menu}>
                    <Link href="/">
                        <a>Главная</a>
                    </Link>
                </div>

                <div className={s.menu}>
                    <Link href="/login">
                        <a>Логин</a>
                    </Link>

                    <Link href="/signup">
                        <a>Регистрация</a>
                    </Link>
                </div>
                
            </div>
        </>
    )
}

export default Navbar;