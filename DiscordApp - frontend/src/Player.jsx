import React, { Component } from "react";
import styled from "styled-components";

const Root = styled.div`
flex: 3 1 0;
background: lime;`

const ButtonSection = styled.div`
display: flex;
justify-content: center;`

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTrack: null,
        }
    }

    pause = async () => {
        console.log("paused!");
        const data = {
            Token : this.props.token,
            Password : this.props.pass,
        }
        console.log(data);
        const resp = await fetch("http://localhost:4320/player/pause", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data), 
        });
        console.log(await resp.json());
    }

    render() {
        return <>
        <Root>player</Root>
        <ButtonSection>
            <button onClick={this.pause}>pause</button>
        </ButtonSection>
        </>
    }
}

export default Player