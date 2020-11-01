import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const socket = io('http://localhost:3000')

socket.on('blah',handleInit('hello from server'))

ReactDOM.render(
    <App />,
  document.getElementById('root')
);


function handleInit(msg){
  console.log(msg)
}