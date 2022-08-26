import Head from "next/head"
import Navbar from "../Navbar/Navbar";
import s from './Layout.module.scss'

interface Props{
    children:React.ReactNode
}

const Layout = ({children}:Props) => {
    return (
        <>
            <Head>
                <title>Trallo - Manage your projects</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar/>

            <main className={s.main}>
                {children}
            </main>
        </>
    )
}

export default Layout;