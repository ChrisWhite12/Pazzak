import React, {Component} from 'react'

class LoginForm extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <h1>Log In</h1>
                <div>
                    <label>Username</label>
                    <input type="text"></input>
                </div>

                <div>
                    <label>Password</label>
                    <input type="password"></input>
                </div>
                    
                <div>
                    <input type="submit"></input>
                </div>
            </div>
        )
    }
}

export default LoginForm