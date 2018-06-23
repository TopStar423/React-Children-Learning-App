import React, { Component, Fragment } from 'react';
import './Login.css';
import ReactDOM from 'react-dom';


class Login extends Component {
    state = {
        login: 'false'
    };

    // login functions go here
    render() {
        return (
            <Fragment>
                <div className='container'>
                    <h1>Login Page</h1>
                    <div className='row'>
                        <div className='col s3'>
                            <img id='monkey' src='./images/monkey.png' alt="lemur" width="250" height="350" />
                        </div>

                        <div className='col s6'>
                            <div id='loginBox' className="card blue darken-4">
                                <div className="card-content white-text">
                                    <span class="card-title">Existing Members Login Here</span>
                                    <form action="" name='loginForm'>
                                        <input placeholder='Username' id='userInput' type="text" name='username' />
                                        <input placeholder='Password' id='userInput' type="text" name='username' />
                                        <button id='submitBtn'>Let's Go!</button>
                                        <br></br>
                                        <span>Not a Member Yet? Please click here.</span>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className='col s3'>

                        </div>


                    </div>
                    <div>I am the Login page</div>
                    <div className='card tree'>
                        <form action="/user" name='loginForm'>
                            <label htmlFor="username">Username</label>
                            <input id='userInput' type="text" name='username' />
                            <label htmlFor="email">Email</label>
                            <input id='userInput' type="text" name='username' />
                            <label htmlFor="username">Password</label>
                            <input id='userInput' type="text" name='username' />
                            <button id='submitBtn'>Let's Go!</button>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default Login;