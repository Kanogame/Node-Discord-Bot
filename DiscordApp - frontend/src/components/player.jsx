import styled from "styled-components";
import Music from "./music";
import { useEffect, useState } from "react";
import {ReactComponent as AddLogo} from '../images/plus-circle.svg';
import {ReactComponent as NextLogo} from '../images/skip-end-circle.svg';
import {ReactComponent as PlayLogo} from '../images/play-circle.svg';

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

const PlayerControls = styled.div`
    padding: 10px;
    flex: 2 1 0;
    background: linear-gradient(0deg, rgba(252,255,147,1) 0%, rgba(250,255,73,1) 25%, rgba(255,196,85,1) 100%);`;

const MusicList = styled.div`
    padding: 15px;
    flex: 5 1 0;`;

export default function Player(props) {
    const [musicProgress, setProgress] = useState(0);
    const [isPlaying, setPlaying] = useState(true);

    useEffect(() => {
        const dispose = props.timeline.pauseSubscribe((pause) => {
            setPlaying(pause);
        });
        return dispose();
    }, []);

    useEffect(() => {
        const dispose = props.timeline.timeSubscribe((progress) => {
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
    console.log(props.musiclist);

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
                {data}
            </MusicList>
        </Root>
    </>
}