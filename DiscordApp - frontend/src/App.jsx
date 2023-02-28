import React, { Component } from "react"
import styled from "styled-components";

const Root = styled.div`
text-align: center;`

const Card = styled.div`
border: 1px solid black;
margin: 10px`

class App extends Component {
    constructor(props) {
        super(props);
        this.state ={
            musiclist: [],
            listError: null,
        }
    }

    async componentDidMount() {
        try {
            const resp = await fetch("http://localhost:13532/links/get");
            const links = await resp.json();
            this.setState({
                musiclist: links,
            });
        console.log(links);
        } catch (er) {
           this.setState({
            listError: er, 
           });
        }
    }

    render() {
        const result = [];
        for (let music of this.state.musiclist) {
            const musicCard = (
                <Card>
                    <div>{music.id}</div>
                    <div>{music.title}</div>
                    <div>{music.author}</div>
                    <div>{music.url}</div>
                </Card>
            );
            result.push(musicCard);
        }
        return <Root>
            {result}
            </Root>;
    }
}

export default App