import React, {Component} from 'react'

class GameJoin extends Component{
    constructor(props){
        super(props)
        this.state = {
            code: ''
        }
    }

    handleJoin(){
        const code = document.getElementById("join_text").value;
        this.setState({code: code})
        this.props.socket.emit('joinGame', code);
        // init();
    }
    

    render(){
        const {code} = this.state
        return (
            <div>
                <h1>Join Game</h1>
                <input id="join_text" type="text"></input>
                <button onClick={() => this.handleJoin()}>Join</button>
                <p>{code}</p>
            </div>
        )
    }
}

export default GameJoin