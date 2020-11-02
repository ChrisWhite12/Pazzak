import React, {Component} from 'react'

class RegisterForm extends Component{
    // constructor(props){
    //     super(props)
    // }
    render(){
        return (
            <div>
                <h1>Register</h1>
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

export default RegisterForm