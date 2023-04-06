import React, { Component } from "react";
import styled from "styled-components";

const Root = styled.div`
flex: 3 1 0;
background: lime;`

const buttonSection = styled.div`
display: flex;
justify-content: center;`

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTrack: null,
        }
    }

    pause = () => {
        console.log("paused!");
    }

    render() {
        return <>
        <Root>player</Root>
        <buttonSection>
            <button onClick={this.pause}>pause</button>
        </buttonSection>
        </>
    }
}

export default Player