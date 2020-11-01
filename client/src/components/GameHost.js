import React, {Component} from 'react'

class GameHost extends Component{
    constructor(props){
        super(props)
        this.state ={
            game_code: 'xyz123',
            play_no: 1,
            play_max: 2
        }
        console.log(props.socket)
        props.socket.emit('newGame');  
    }
    render(){
        return (
            <div>
                <h1>New Game</h1>
                <p>Game code is: {this.state.game_code}</p>
                <p>Number of players {this.state.play_no}/{this.state.play_max}</p>
            </div>
        )
    }
}

export default GameHost