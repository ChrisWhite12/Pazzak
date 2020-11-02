import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Menu extends Component{
    // constructor(props){
    //     super(props)
    // }
    render(){
        return (
            <div>
                <h1>-- Pazzak --</h1>
                <Link to="/new">
                    <button>New Game</button>
                </Link>

                <Link to="/join">
                <button>Join Game</button>
                </Link>

                <Link to="/shop">
                <button>Shop</button>
                </Link>

                <Link to="/register">
                <button>Register</button>
                </Link>
                
                <Link to="/login">
                <button>Log In</button>
                </Link>
            </div>
        )
    }
}

export default Menu