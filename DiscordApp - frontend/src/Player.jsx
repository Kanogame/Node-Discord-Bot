import React, { Component } from "react";
import styled from "styled-components";

const Root = styled.div`
flex: 3 1 0;
background: lime;`

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTrack: null,
        }
    }

    render() {
        return <>
        <Root>player</Root>
        </>
    }
}

export default Player