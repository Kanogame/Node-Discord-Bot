import { useLoaderData, NavLink, useRevalidator } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Websocket from "../utils/websockets";
import Player from "../components/player.jsx";


const ModalContent = styled.div`
    display: flex;
    width: 100%;
    height: 100%;  
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);`;

const Modal = styled.div`
    padding: 30px;
    background: white;
    border: 1px solid rgb(179, 179, 179);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;`;

const ModalHead = styled.div`
    font-size: 20px;
    text-align: center;
    font-weight: 500;`;

const ModalInput = styled.input`
    font-size: 1rem;
    font-family: inherit;
    border: none;
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2);
    background-color: white;
    line-height: 1.5;
    margin: 0;
    &:hover {
        box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.6), 0 1px 2px hsla(0, 0%, 0%, 0.2);
    }`;

const ModalButton = styled.a`
    text-decoration: none;
    color: black;
    padding: 5px;
    background: rgb(250,255,73);  
    border: 3px solid #c6cc21;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background: #bbc020;
    }`;

export async function loader({request, params}) {
    const tokenPass = params.tokenPass;
    const tokenQuery =  new URL(request.url).searchParams.get('t');
    let songs, current, timeline;
    if (tokenQuery !== null) {
        songs =  await getLinks(tokenQuery, tokenPass);
        current =  await getCurrentSong(tokenQuery, tokenPass);
        timeline = new Websocket("ws://192.168.2.149:9000", tokenQuery, tokenPass);
    }

    async function getLinks(token, tokenPass) {
        const resp = await fetch("http://localhost:13532/tracks/get?token=" + token + "&pass=" + tokenPass);
        return await resp.json();
    }
    
    async function getCurrentSong(token, tokenPass) {
        const resp = await fetch("http://localhost:13532/tracks/current/get?token=" + token + "&pass=" + tokenPass);
        return await resp.json();
    }
    
    return {tokenPass, tokenQuery, songs, current, timeline}
}

export default function PlayerSection() {
    let revalidator = useRevalidator();
    const [token, setToken] = useState("");
    const {tokenPass, tokenQuery, songs, current, timeline} = useLoaderData();
    const isModal = tokenQuery == null;

    function setTokenInp(e) {
        setToken(e.target.value);
    }

    function sendSkip() {
        timeline.sendSkip();
        revalidator.revalidate();
    }

    function sendPause() {
        timeline.sendPause();
    }
        
    return (isModal ? <ModalContent>
        <Modal>
            <ModalHead>Введите токен:</ModalHead>
            <ModalInput type="text" placeholder="20-ти значный токен" value={token} onChange={setTokenInp} />
            <ModalButton><NavLink to={`/player/${tokenPass}?t=${token}`}>Готово</NavLink></ModalButton>
        </Modal>
    </ModalContent> : <Player musiclist={songs} current={current} timeline={timeline} sendSkip={sendSkip} sendPause={sendPause}></Player>)
}