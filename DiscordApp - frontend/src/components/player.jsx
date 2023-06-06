import styled from "styled-components";
import Music from "./music";
import { useEffect, useState } from "react";
import {ReactComponent as AddLogo} from '../images/plus-circle.svg';
import {ReactComponent as NextLogo} from '../images/skip-end-circle.svg';
import {ReactComponent as PlayLogo} from '../images/play-circle.svg';
import {ReactComponent as PauseLogo} from '../images/pause-circle.svg';

const Root = styled.div`
    display: flex;
    height: 100%;`;

const ProcentageContainer = styled.div`
    margin: 15px 0;
    background: black;
    height: 5px;
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
    background: #faff5f;`;

const MusicList = styled.div`
    padding: 15px;
    flex: 5 1 0;
    overflow-y:scroll;`;

const Thumbnail = styled.img`
    width: 100%;
`;

const Title = styled.div`
    text-align: center;
    font-weight: 600;
`;

const Open = styled.a`
    color: black;
    text-decoration: none;
    font-size: 15px;
`;

const DescContainer = styled(ControlsContainer)`
    justify-content: space-between;
`

export default function Player(props) {
    const [musicProgress, setProgress] = useState(0);
    const [isPlaying, setPlaying] = useState(false);

    useEffect(() => {
        const dispose = props.timeline.pauseSubscribe((pause) => {
            setPlaying(pause);
        });
        return dispose();
    }, []);

    useEffect(() => {
        const dispose = props.timeline.timeSubscribe((progress) => {
            setProgress(progress);
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
                <div>
                    <Thumbnail src={props.current.thumbnail}/>
                    <Title>{props.current.title}</Title>
                    <DescContainer>
                        <Open>{props.current.duration}</Open>
                        <Open>{props.current.author}</Open>
                        <Open href={props.current.url}>Open</Open>
                    </DescContainer>
                </div>
                <ProcentageContainer>
                    {isPlaying}
                    <ProcentageBar style={{width: `${musicProgress}%`}}/>
                </ProcentageContainer>
                <ControlsContainer>
                    <Add> <AddLogo /></Add>
                    <Pause onClick={props.sendPause}>{isPlaying ? <PlayLogo /> : <PauseLogo />}</Pause>
                    <Next onClick={props.sendSkip}><NextLogo /></Next>
                </ControlsContainer>
            </PlayerControls>
            <MusicList>
                {data}
            </MusicList>
        </Root>
    </>
}