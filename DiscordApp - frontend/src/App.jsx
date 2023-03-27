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
        this.componentDidMount();
    }

    GetLinks = async () => {
        const resp = await fetch("http://localhost:13532/links/get?token=ttLfqWYYeI4ZyyW&pass=FCtEvw2qWefVOAKkaEaL");
            const links = await resp.json();
            this.setState({
                musiclist: links,
            });
        console.log(links);
    }

    componentDidMount = async () => {
        console.log("fetch");
        const resp = await fetch("http://localhost:13532/links/get?token=iQzmfCWC4GxMGXR&pass=eYTTiLmkoo5leUmLDNIf");
        const links = await resp.json();
        this.setState({
            musiclist: links,
        });
        console.log(links);
    }

    async handleclick() {
        const resp = await fetch("http://localhost:13532/links/get", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: "POST testing",
        });
        let text = await resp.json();
        alert(text);
    }

    render() {
        const result = [];
        /*for (let music of this.state.musiclist) {
            const musicCard = (
                <>
                <Card>
                    <div>{music.id}</div>
                    <div>{music.title}</div>
                    <div>{music.author}</div>
                    <div>{music.url}</div>
                </Card>
                <button onClick={this.handleclick()}>Add</button>
                </>
            );
            result.push(musicCard);
        }*/
        return <Root>
            {this.musiclist}
            </Root>;
    }
}

export default App