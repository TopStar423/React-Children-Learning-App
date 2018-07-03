import React, { Component, Fragment } from 'react';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import { Row, Input, Card, Modal, Button } from 'react-materialize';
import './Login.css';
import {Redirect} from 'react-router-dom'
// import axios from 'axios'
// import proxy from 'http-proxy-middleware'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // login: 'false',
            user: {
                username: '',
                email: '',
                password: '',
                child: ''
            }
        };
    }

    handleUser = event => {
        this.setState({
            user: {
                username: event.target.value,
                email: this.state.user.email,
                password: this.state.user.password,
                child: this.state.user.child
            }
        })
    }

    handleEmail = event => {
        this.setState({
            user: {
                username: this.state.user.username,
                email: event.target.value,
                password: this.state.user.password,
                child: this.state.user.child
            }
        })
    }

    handlePword = event => {
        this.setState({
            user: {
                username: this.state.user.username,
                email: this.state.user.email,
                password: event.target.value,
                child: this.state.user.child
            }
        })
    }

    handleChild = event => {
        this.setState({
            user: {
                username: this.state.user.username,
                email: this.state.user.email,
                password: this.state.user.password,
                child: event.target.value
            }
        })
    }

    handleSignUp = event => {
        event.preventDefault()
        // console.log(this.state)

        sessionStorage.setItem('username', this.state.user.username)
        API.postUsers(this.state.user)
            .then(console.log(this.state.user))
        // return <Link to='/home' />
    }

    handleLogin = event => {
        event.preventDefault()

        // console.log(this.state.user.username)
        // API.authenticate(this.state.user.username)  
        API.findUser(this.state.user.username)
            .then(console.log(this.state.user.username))

        // return <Link to='/home' />
    }

    render() {
        return (
            <Fragment>
                <Modal id='loginBack' trigger={<Button id='loginModal'>LOGIN</Button>}>
                    <Card id='loginForm'>
                        <Row>
                            <Input type='text' name='username' value={this.state.user.username} onChange={this.handleUser} s={12} label="Username" />
                            <Input type="password" name='password' value={this.state.user.password} onChange={this.handlePword} s={12} label="Password" />
                        </Row>
                        <Link to='/home'><Button onClick={this.handleLogin}>Login</Button></Link>
                    </Card>
                </Modal>
                <Modal id='signupBack' trigger={<Button id='signupModal'>NEW USER</Button>}>
                    <Card id='signupForm'>
                        <Row>
                            <Input type='email' name='email' value={this.state.user.email} onChange={this.handleEmail} s={12} label="Email" />
                            <Input type='text' name='username' value={this.state.user.username} onChange={this.handleUser} s={12} label='Username' />
                            <Input type="password" name='password' value={this.state.user.password} onChange={this.handlePword} s={12} label="Password" />
                            <Input type="text" name='child' value={this.state.user.child} onChange={this.handleChild} type="text" s={12} label="Child's Name" />
                        </Row>
                        <Link to='/home'><Button className='btn waves-effect waves-light btn-flat modal-action modal-close' onClick={this.handleSignUp}>Sign Up</Button></Link>
                    </Card>
                </Modal>
            </Fragment>
        )
    }
}

export default Login;

