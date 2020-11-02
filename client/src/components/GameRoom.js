import React, {Component} from 'react'

class GameRoom extends Component{
    constructor(props){
        super(props)
        this.state = {
            page: props.page,
            game_code: 'xyz123',
            play_no: 1,
            play_max: 2
        }
        if(this.state.page == 'host'){
            props.socket.emit('newGame'); 
            props.socket.on('gameCode', this.handleGameCode.bind(this))
        }

        console.log(this.state.page)
    }

    handleStart(room){
        console.log('start')
        console.log(room)
        this.setState({
            page: 'start'
        })
    }

    handleJoin(){
        
        const code = document.getElementById("join_text").value;

        console.log('handle join')

        this.setState({code: code})
        this.props.socket.emit('joinGame', code);
        this.props.socket.on('start', this.handleStart.bind(this))
        
    }

    handleGameCode(gameCode) {
        console.log('handleGameCode')
        this.setState({game_code: gameCode})
    }


    render(){
        const {page, code} = this.state
        let render_out
        if(page === 'join'){
            render_out = (
                <div>
                    <h1>Join Game</h1>
                    <input id="join_text" type="text"></input>
                    <button onClick={() => this.handleJoin()}>Join</button>
                    {code}
                </div>
            )
        }
        else if(page === 'host'){
            render_out = (
                <div>
                    <h1>New Game</h1>
                    <p>Game code is: {this.state.game_code}</p>
                    <p>Number of players {this.state.play_no}/{this.state.play_max}</p>
                </div>
            )
        }
        else{
            render_out = (<h1>Game Room</h1>)
        }

        return (
            <div>
                {render_out}
            </div>
        )
    }
}

export default GameRoom