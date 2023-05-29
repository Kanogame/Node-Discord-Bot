import { useLoaderData, NavLink, useRevalidator } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Websocket from "../utils/websockets";
import Music from "../components/music";
import {ReactComponent as AddLogo} from '../images/plus-circle.svg';
import {ReactComponent as NextLogo} from '../images/skip-end-circle.svg';
import {ReactComponent as PlayLogo} from '../images/play-circle.svg';

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

const PlayerControls = styled.div`
    padding: 10px;
    flex: 2 1 0;
    background: linear-gradient(0deg, rgba(252,255,147,1) 0%, rgba(250,255,73,1) 25%, rgba(255,196,85,1) 100%);`;

const MusicList = styled.div`
    padding: 15px;
    flex: 5 1 0;`;

const Root = styled.div`
    display: flex;
    height: 100%;`;

const ProcentageContainer = styled.div`
    background: black;
    height: 25px;
`

const ProcentageBar = styled.div`
    height: 100%;
    background: Red;
`
const ControlsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Add = styled.button`
display:flex;
background: none;
border: none;`;
const Next = Add;
const Pause = Add;

export async function loader({request, params}) {
    const tokenPass = params.tokenPass;
    const tokenQuery =  new URL(request.url).searchParams.get('t');
    let songs, current, timeline;
    if (tokenQuery !== null) {
        songs =  await getLinks(tokenQuery, tokenPass);
        current =  await getCurrentSong(tokenQuery, tokenPass);
        timeline = new Websocket("ws://192.168.2.149:9000", tokenQuery, tokenPass);
    }
    
    return {tokenPass, tokenQuery, songs, current, timeline}

    async function getLinks(token, tokenPass) {
        const resp = await fetch("http://localhost:13532/tracks/get?token=" + token + "&pass=" + tokenPass);
        return await resp.json();
    }
 
    async function getCurrentSong(token, tokenPass) {
        const resp = await fetch("http://localhost:13532/tracks/current/get?token=" + token + "&pass=" + tokenPass);
        return await resp.json();
    }
}

export default function PlayerSection() {
    let revalidator = useRevalidator();
    const [token, setToken] = useState("");
    const {tokenPass, tokenQuery, songs, timeline} = useLoaderData();
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
    </ModalContent> : <Player musiclist={songs} sendSkip={sendSkip} sendPause={sendPause}></Player>)
}

function Player(props) {
    const [musicProgress, setProgress] = useState(0);
    const {timeline} = useLoaderData();
    const [isPlaying, setPlaying] = useState(true);

    useEffect(() => {
        const dispose = timeline.pauseSubscribe((pause) => {
            setPlaying(pause);
        });
        return dispose();
    }, []);

    useEffect(() => {
        const dispose = timeline.timeSubscribe((progress) => {
            setProgress(progress)
            console.log(progress)
        });
        return dispose();
    }, []);

    const data = props.musiclist.map(track => <Music
        key={track.id}
        id={track.id}
        title={track.title}
        length={track.length}
        url={track.url}
        request={track.request}
        />);

    return <>
        <Root>
            <PlayerControls>
                <ProcentageContainer>
                    {isPlaying}
                    <ProcentageBar style={{width: `${musicProgress}%`}}/>
                </ProcentageContainer>
                <ControlsContainer>
                    <Add> <AddLogo /></Add>
                    <Pause onClick={props.sendPause}> <PlayLogo /></Pause>
                    <Next onClick={props.sendSkip}><NextLogo /></Next>
                </ControlsContainer>
            </PlayerControls>
            <MusicList>
                {props.musiclist}
            </MusicList>
        </Root>
    </>
}