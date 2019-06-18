import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { login } from '../auth/userManager';

export default class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    submit = () => {
        login(this.state.email, this.state.password)
            .then((user) => {
                this.props.onLogin(user);
                this.props.history.push('/');
            });
    }

    render() {
        return (
            <div className="auth--container" style={{ margin: '50px auto 0 auto', maxWidth: '400px' }}>
                <React.Fragment>
                    <h1 style={{ textAlign: 'center' }}>Log In</h1>
                    <Form id="login--form" onSubmit={this.submit}
                        style={{ border: '.5px solid lightgrey', borderRadius: '5px', padding: '30px' }} >
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" id="exampleEmail" placeholder="email@website.com" />
                        </FormGroup>
                        <FormGroup style={{ marginBottom: '25px' }}>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" id="examplePassword" placeholder="**********" />
                        </FormGroup>
                        <Button className="register--btn" outline color="secondary">Login</Button>
                        <FormText className="auth--message" style={{ float: 'right', marginTop: '9px' }}>
                            Not registered yet? <Link to="/register">Sign Up</Link>
                        </FormText>
                    </Form>
                </React.Fragment>
            </div>
        )
    }
}
