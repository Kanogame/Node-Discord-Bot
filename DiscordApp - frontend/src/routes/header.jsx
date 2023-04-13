import styled from "styled-components";

export default function Header() {
    const Root = styled.div`
    height: 100vh;`;

    const Header = styled.div`
        width: 100%;
        background: rgb(250,255,73);
        background: linear-gradient(90deg, rgba(250,255,73,1) 0%, rgba(255,196,85,1) 100%);
        display: flex;`;

    const HeaderContent = styled.div`
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;`;

    const Tabs = styled.div`
        display: flex;
        gap: 50px;`;

    const Tab = styled.div`
        font-size: 20px;`;

    const Account = styled.div`
        height: 30px;
        width: 40px;`;

    return (
        <Root>
            <Header>
                <HeaderContent>
                    <Tabs>
                        <Tab>Главная</Tab>
                        <Tab>Мои сервера</Tab>
                        <Tab>Плеер</Tab>
                    </Tabs>
                    <Account></Account>
                </HeaderContent>
            </Header>
        </Root>
    )
}