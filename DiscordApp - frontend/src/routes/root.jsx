import styled from "styled-components";
import React from 'react';
import {ReactComponent as Logo} from '../images/logo.svg';
import { Outlet } from "react-router-dom";

const RootDiv = styled.div`
height: 100vh;`;

const Header = styled.div`
    width: 100%;
    padding: 0 30px;
    background: rgb(250,255,73);
    background: linear-gradient(90deg, rgba(250,255,73,1) 0%, rgba(255,196,85,1) 100%);
    font-family: Raleway;
    display: flex;
    border-bottom: 1px solid lightgray;`;

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

export default function Root() {
    function startWS() {
        const webSocket = new WebSocket("ws://192.168.2.149:9000");

        webSocket.onopen = () => {
            const data = { type: "init", payload: {token: "wasd", password: "qert"}};
            webSocket.send(JSON.stringify(data));
            console.log('подключился');
        };
    }

    return (
        <RootDiv>
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
            <Main>
                <button onClick={startWS}/>
                <Outlet />
            </Main>
        </RootDiv>
    )
}