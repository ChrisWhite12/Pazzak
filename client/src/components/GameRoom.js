import React, {useEffect, useState} from 'react'
import Deck from '../models/deckmodel'

const GameRoom = ({page,socket}) => {

    const initGameState = {
        player: 0,
        game_code: '',
        play_no: 1,
        play_max: 2,
        deck: {},
        main_hand: [],
        side_hand: []
    }

    const [gameState, setGameState] = useState(initGameState)
    const [pageState, setPageState] = useState(page)
    const [renderOut, setRenderOut] = useState()

    useEffect(() => {
        console.log(page)
        socket.on('start', handleStart)

        if(pageState === 'join'){
            setRenderOut(
                <div>
                    <h1>Join Game</h1>
                    <input id="join_text" type="text"></input>
                    <button onClick={handleJoin}>Join</button>
                    {gameState.game_code}
                </div>
            )
        }
        else if(pageState === 'host'){
            console.log(gameState)
            if(gameState.game_code == '')
            {
                socket.emit('newGame'); 
                socket.on('gameCode', handleGameCode)
            }
            setRenderOut(
                <div>
                    <h1>New Game</h1>
                    <p>Game code is: {gameState.game_code}</p>
                    <p>Number of players {gameState.play_no}/{gameState.play_max}</p>
                </div>
            )
        }
        else if(pageState === 'start'){
            setRenderOut(
                <div id="board_grid">
                    <div id="p2_main">

                    </div>
                    <div id="p1_main">

                    </div>
                </div>
            )
        }
    },[gameState])

    const handleStart = (room) => {
        console.log('in handleStart')
        setGameState({
            ...gameState,
            deck: new Deck()
        })
        setPageState('start')
        console.log(gameState)

        // setGameState({
        //     ...gameState,
        //     main_hand: [gameState.deck.drawcard(),gameState.deck.drawcard()]
        // })

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

    const handleJoin = () => {
        
        const code = document.getElementById("join_text").value;

        // this.setState({code: code})
        socket.emit('joinGame', code);        
    }

    const handleGameCode = (gameCode) => {
        console.log('handleGameCode', gameCode)
        setGameState({...gameState, game_code: gameCode})
    }

    return (
        <div>
            <h1>GameRoom</h1>
            {renderOut}
        </div>
    )
}

export default GameRoom
