import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

export function loader({params}) {
    console.log(params.tokenPass);
    const tokenPass = params.tokenPass;
    return {tokenPass}
}

export default function Player() {
    const [token, setToken] = useState("");
    const {tokenPass} = useLoaderData();

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
        border-radius: 16px;`;

    const ModalHead = styled.div`
        font-size: 20px;
        text-align: center;
        font-weight: 500;
    `;

    return <>
        <ModalContent>
            <Modal>
                <ModalHead>Введите токен:</ModalHead>
                <ModalInput></ModalInput>
            </Modal>
        </ModalContent>
    </>
}