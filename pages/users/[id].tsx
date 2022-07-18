import React from "react";
import {useRouter} from 'next/router';
import MainContainer from "../../components/MailContainer";
import {NextPageContext} from "next";
import {User} from '../../interfaces'
import {wrapper} from "../../store/store";

interface UserProp {
    user: User
}

const User:React.FC<UserProp> = ({user}) => {
    const {query} = useRouter();
    return (
        <MainContainer title={"Пользователь"}>
            <h1>Пользователь {query.id}</h1>
            <div>Имя пользователя - {user.name}</div>
        </MainContainer>
    )
}

export async function getServerSideProps(context: NextPageContext) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${context.query.id}`);
    const user = await response.json();
    return {
        props: {user}, // will be passed to the page component as props
    }
}



// export const getServerSideProps = wrapper.getServerSideProps(store => async ({params}) => {
//     const {id} = params;
//
//     await store.dispatch(fetchSubject(id));
//
//     console.log('State on server', store.getState());
//
//     return {
//         props: {
//             id,
//         },
//     };
// });
export default User;