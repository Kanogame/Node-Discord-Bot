import styled from "styled-components";
import React from 'react';
import {ReactComponent as Logo} from '../images/logo.svg';
import { Outlet } from "react-router-dom";

export default function Root() {
    const Root = styled.div`
    height: 100vh;`;

    const Header = styled.div`
        width: 100%;
        padding: 0 30px;
        background: rgb(250,255,73);
        background: linear-gradient(90deg, rgba(250,255,73,1) 0%, rgba(255,196,85,1) 100%);
        font-family: Raleway;
        display: flex;`;

    const HeaderContent = styled.div`
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;`;

    const Tabs = styled.div`
        align-items: center;
        display: flex;
        gap: 40px;`;

    const Tab = styled.div`
        font-size: 16px;
        font-weight: 600;`;

    const Account = styled.div`
        height: 30px;
        width: 40px;`;

    const Main = styled.div`
        height: calc(100vh - 100px);`;

    return (
        <Root>
            <Header>
                <HeaderContent>
                    <Tabs>
                        <Tab><Logo /></Tab>
                        <Tab>Главная</Tab>
                        <Tab>Мои сервера</Tab>
                        <Tab>Плеер</Tab>
                    </Tabs>
                    <Account></Account>
                </HeaderContent>
            </Header>
            <Main><Outlet /></Main>
        </Root>
    )
}