import styled from "styled-components";

export default function Music(props) {
    const MusicEl = styled.div`
        padding: 10px;
        color: black;
        border: 1px solid lightgray;
        margin-bottom: 15px;
    `;

    const MusicHead = styled.div`
        display: flex;
        justify-content: space-between;`;

    const MusicTitle = styled.div`
        font-size: 20px;`;

    const MusicTime = styled.div`
        font-size: 14px;`;

    const MusicType = styled.div`
        font-size: 14px;`;    

    const MusicUrl = styled.div`
        font-size: 14px;
        display: inline-block;
        margin-left: 10px;
        color: lightgray;`;  

    return <MusicEl>
        <MusicHead>
            <MusicTitle>{props.title}</MusicTitle>
            <MusicTime>{props.length}</MusicTime>
        </MusicHead>
        <MusicHead>
            <MusicType>Youtube<MusicUrl>{props.url}</MusicUrl></MusicType>
            <MusicUrl>{"reqested by:" + props.request}</MusicUrl>
        </MusicHead>
    </MusicEl>
}