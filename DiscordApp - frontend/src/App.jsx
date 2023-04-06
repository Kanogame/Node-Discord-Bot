import React, { Component } from "react";
import styled from "styled-components";
import Player from "./Player.jsx";
import MusicCard from "./MusicCard";

const Root = styled.div`
text-align: center;
display: flex`



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
        return <Root>
            <Player></Player>
            <MusicCard tracks={this.state.tracks}></MusicCard>
            </Root>;
    }
}

export default App