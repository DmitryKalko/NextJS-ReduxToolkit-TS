import type {GetStaticProps, NextPage, NextPageContext} from 'next'
import {useAppDispatch, useAppSelector} from '../store/hooks';
import Link from 'next/link';
import {useState, useEffect} from "react";
import MainContainer from '../components/MailContainer';
import { User } from '../interfaces';
import {getAllUsers, users} from '../store/usersSlice';
import {wrapper} from "../store/store";


interface UsersPageProps {
    data: User[]
}

const Users = () => {
    const {data} = useAppSelector(users);
    console.log(data);
    return (
        <MainContainer title={'Пользователи'}>
            <h1>
                Список пользователей
            </h1>
            <ul>
                {data.map(user =>
                    <li key={user.id}>
                        <Link href={`/users/${user.id}`}>
                            <a>{user.name}</a>
                        </Link>
                    </li>
                )}
            </ul>
        </MainContainer>
    )
}

export default Users;


// загрузка данных через Redux
export const getStaticProps:  GetStaticProps = wrapper.getStaticProps( // дает NextJS доступ к стору
    (store) => async (context) => {
        console.log('dispatch at the component')
        store.dispatch(getAllUsers());

    console.log('State on server', store.getState());

    return {
        props: {},
    };
});

// загрузка данных напрямую из компонента без Redux
// export async function getStaticProps(context: NextPageContext) {
//     const response = await fetch('https://jsonplaceholder.typicode.com/users');
//     const users = await response.json();
//     return {
//         props: {users}, // will be passed to the page component as props
//     }
// }
