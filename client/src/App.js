import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


//components
// import LoginControl from './components/Login';
import Menu from './components/Menu';
import GameJoin from './components/GameJoin';
import GameHost from './components/GameHost';
import Shop from './components/Shop';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

// import io from 'socket.io-client'



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/" exact component={Menu} />
            <Route path="/join" render={props => <GameJoin socket={socket} />}/>
            <Route path="/new" exact render={props => <GameHost socket={socket} />} />
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

