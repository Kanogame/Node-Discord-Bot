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
        const queryParams = new URLSearchParams(window.location.search)
        const token = queryParams.get("token")
        const pass = queryParams.get("location")
        this.state ={
            musiclist: [],
            listError: null,
            token: token,
            pass: pass
        }
    }

    GetLinks = async () => {
        const resp = await fetch("http://localhost:13532/links/get?token=" + this.state.token + "&pass=" + this.state.pass);
            const links = await resp.json();
            this.setState({
                musiclist: links,
            });
        console.log(links);
    }

    componentDidMount = async () => {
        console.log("fetch");
        const resp = await fetch("http://localhost:13532/links/get?token=" + this.state.token + "&pass=" + this.state.pass);
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
                <button onClick={this.handleclick()}>Add</button>
                </>
            );
            result.push(musicCard);
        }
        return <Root>
            {result}
            </Root>;
    }
}

export default App