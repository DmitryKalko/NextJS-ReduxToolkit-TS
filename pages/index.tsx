import type {NextPage} from 'next'
import Head from 'next/head';
import A from "../components/A";
import MainContainer from "../components/MailContainer";
//import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
    return (
        <MainContainer title={'Добро пожалоть!'}>
            <h1>
                Главная страница
            </h1>
        </MainContainer>
    )
}

export default Home
