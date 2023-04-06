import React, { Component } from "react";
import styled from "styled-components";
import Player from "./Player.jsx";

const Root = styled.div`
text-align: center;
display: flex`

const Card = styled.div`
border: 1px solid black;
margin: 10px`


class App extends Component {
    constructor(props) {
        super(props);
        const queryParams = new URLSearchParams(window.location.search)
        const token = queryParams.get("token")
        const pass = queryParams.get("location")
        this.state ={
            tracks: [],
            token: token,
            pass: pass
        }
    }

    componentDidMount = async () => {
        console.log("fetch");
        const resp = await fetch("http://localhost:13532/tracks/get?token=" + this.state.token + "&pass=" + this.state.pass);
        const links = await resp.json();
        this.setState({
            tracks: links,
        });
        console.log(links);
    }

    render() {
        const result = [];
        for (let track of this.state.musiclist) {
            const musicCard = (
                <>
                <Card>
                    <div>{track.id}</div>
                    <div>{track.title}</div>
                    <div>{track.length}</div>
                    <div>{track.url}</div>
                    <div>{track.request}</div>
                </Card>
                </>
            );
            result.push(musicCard);
        }
        return <Root>
            <Player></Player>
            <musicCard tracks={this.state.tracks}></musicCard>
            </Root>;
    }
}

export default App