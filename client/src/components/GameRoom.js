import React, {Component} from 'react'
import Deck from '../models/deckmodel'

class GameRoom extends Component{
    constructor(props){
        super(props)
        this.state = {
            player: 0,
            page: props.page,
            game_code: 'xyz123',
            play_no: 1,
            play_max: 2,
            deck: {}
        }
        if(this.state.page == 'host'){
            props.socket.emit('newGame'); 
            props.socket.on('gameCode', this.handleGameCode.bind(this))
        }
        props.socket.on('start', this.handleStart.bind(this))
        console.log(this.state.page)
    }

    handleStart(room){
        this.setState({
            page: 'start',
            deck: new Deck()
        })
        console.log(this.state.deck.deck)
        console.log(this.state.deck.drawcard())
        console.log(this.state.deck.drawcard())

        //display side card select screen

        //when card chosen -> main loop

        //emit getCard 2 times for each player (returns card from server and saves in this.state.main ??)
    
        //select random player

        //set event listener for card click, if player turn emit playCard (changes state on server)

        //set event listener for deal click, emit getCard 

        //set event listener for stay click, emit stay

        //if stay wait for allStay

        //check scores
    }

    handleJoin(){
        
        const code = document.getElementById("join_text").value;

        this.setState({code: code})
        this.props.socket.emit('joinGame', code);        
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
            render_out = (
                <div id="board_grid">
                    <div id="p2_main">

                    </div>
                    <div id="p1_main">

                    </div>
                </div>
            )
        }

        return (
            <div>
                {render_out}
            </div>
        )
    }
}

export default GameRoom