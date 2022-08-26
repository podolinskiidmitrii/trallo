import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import s from '../styles/Home.module.scss'

import Router from 'next/router'

const Home: NextPage = () => {
  return (
    
      <Layout>
        <div className={s.container}>
          <div className={s.title}>It’s more than work. It’s a way of working together.</div>
          <div className={s.description}>Start with a Trallo board, lists, and cards. Customize and expand with more features as your teamwork grows. Manage projects, organize tasks, and build team spirit—all in one place.</div>
          
          <div className={s.control}>
            <button className={`${s.btn} ${s.standart}`} onClick={()=>Router.push('signup')}>Регистрация</button>
            <button className={`${s.btn} ${s.standart}`} onClick={()=>Router.push('signin')}>Вход</button>

          </div>
          <img className={s.banner} src='/template/images/23472banner6.png'/>
        </div>
      </Layout>
  )
}

export default Home
