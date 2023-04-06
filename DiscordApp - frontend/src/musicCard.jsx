import React, { Component } from "react"
import styled from "styled-components";

const Root = styled.div`
flex: 5 1 0;
background: pink;`

const Card = styled.div`
border: 1px solid black;
margin: 10px`

class musicCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            tracks: this.props.tracks
        }
    }

    render() {
        const res = this.state.tracks.map(track => { return <Card>
            <div>{track.id}</div>
            <div>{track.title}</div>
            <div>{track.length}</div>
            <div>{track.url}</div>
            <div>{track.request}</div>
        </Card>});
        console.log(res);
        return <Root>{res}</Root>
    }
}

export default musicCard