import A from "./A";
import Head from "next/head";

interface Props{
    children: React.ReactNode
    title: string
};

const MainContainer: React.FC<Props> = ({children, title}) => {
    return (
        <>
            <Head>
                <meta></meta>
                <title>{title}</title>
            </Head>
            <div>
                <A href={'/'} text='Главная'/>
                <A href={'/users'} text='Пользователи'/>
            </div>
            <div>{children}</div>
        </>
    )
}
export default MainContainer;