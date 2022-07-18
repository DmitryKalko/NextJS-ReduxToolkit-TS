import type { GetStaticProps, NextPage, NextPageContext } from "next";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Link from "next/link";
import { useState, useEffect } from "react";
import MainContainer from "../components/MailContainer";
import { User } from "../interfaces";
import { getAllUsers } from "../store/usersSlice";
import { wrapper } from "../store/store";

interface UsersPageProps {
  users: User[];
}

const Users: React.FC = () => {
  const users = useAppSelector((state) => state.users);
  return (
    <MainContainer title={"Пользователи"}>
      <h1>Список пользователей</h1>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>
              <a>{user.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </MainContainer>
  );
};

export default Users;

// загрузка данных через Redux
export const getStaticProps: GetStaticProps = wrapper.getStaticProps((store) => async () => {
  console.log("dispatch at the component");
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const { data } = await response.json();
  console.log(data);
  store.dispatch(getAllUsers(data));
});

// загрузка данных напрямую из компонента без Redux
// export async function getStaticProps(context: NextPageContext) {
//     const response = await fetch('https://jsonplaceholder.typicode.com/users');
//     const users = await response.json();
//     return {
//         props: {users}, // will be passed to the page component as props
//     }
// }
