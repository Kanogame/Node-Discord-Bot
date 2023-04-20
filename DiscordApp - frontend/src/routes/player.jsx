import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

export function loader({params}) {
    console.log(params.tokenPass);
    const tokenPass = params.tokenPass;
    return {tokenPass}
}

export default function PlayerSection() {
    const [token, setToken] = useState("");
    const {tokenPass} = useLoaderData();

    function setTokenInp(e) {
        setToken(e.target.value)
    }

    const ModalContent = styled.div`
        display: flex;
        width: 100%;
        height: 100%;  
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.5);
        display: none;`;

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
        }
    `;

    return <>
        <ModalContent>
            <Modal>
                <ModalHead>Введите токен:</ModalHead>
                <ModalInput type="text" placeholder="20-ти значный токен" value={token} onChange={setTokenInp} />
                <ModalButton href={`/player/${tokenPass}&t=${token}`}>Готово</ModalButton>
            </Modal>
        </ModalContent>
        <Player>

        </Player>
    </>
}

function Player(props) {
const Root = styled.div`
        display: flex;
        height: 100%;`;

    const PlayerControls = styled.div`
        flex: 2 1 0;
        background: linear-gradient(0deg, rgba(252,255,147,1) 0%, rgba(250,255,73,1) 25%, rgba(255,196,85,1) 100%);`;

    const MusicList = styled.div`
        flex: 5 1 0;`;

    const Music = styled.div`
        border: 1px solid black;`;

    return <>
        <Root>
            <PlayerControls>

            </PlayerControls>
            <MusicList>
                <Music></Music>
            </MusicList>
        </Root>
    </>
}