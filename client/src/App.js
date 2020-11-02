import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


//components
// import LoginControl from './components/Login';
import Menu from './components/Menu';
import GameRoom from './components/GameRoom'
import Shop from './components/Shop';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

import io from 'socket.io-client'

const socket = io.connect('http://localhost:4000')

socket.on('unknownCode', handleUnknownCode);
socket.on('tooManyPlayers', handleTooManyPlayers);

function handleUnknownCode(){
  alert('Unknown Game Code')
}

function handleTooManyPlayers(){
  alert('This game is already in progress');
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/" exact component={Menu} />
            <Route path="/join" render={props => <GameRoom page='join' socket={socket} />}/>
            <Route path="/new" exact render={props => <GameRoom page='host' socket={socket} />} />
            <Route path="/shop" exact component={Shop} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
          </Switch>
        </Router>
        
      </header>
    </div>
  );
}
export default App;


