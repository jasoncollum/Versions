import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { register } from '../auth/userManager';

export default class Register extends Component {
    state = {
        email: '',
        username: '',
        password: ''
    }

    submit = (e) => {
        e.preventDefault()
        register(this.state)
            .then((newUser) => {
                this.props.onRegister(newUser);
                this.props.history.push('/songSetupForm');
            })
    }

    render() {
        return (
            <div className="auth--container" style={{ margin: '50px auto 0 auto', maxWidth: '400px' }}>
                <React.Fragment>
                    <h1 style={{ textAlign: 'center' }}>Register</h1>
                    <Form id="register--form" onSubmit={this.submit}
                        style={{ border: '.5px solid lightgrey', borderRadius: '5px', padding: '30px' }} >
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" id="exampleEmail" placeholder="email@website.com"
                                onChange={(e) => this.setState({ email: e.target.value })} />
                        </FormGroup>
                        <FormGroup style={{ marginBottom: '25px' }}>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" id="examplePassword" placeholder="**********"
                                onChange={(e) => this.setState({ password: e.target.value })} />
                        </FormGroup>
                        <Button className="register--btn" outline color="secondary">Register</Button>
                        <FormText className="auth--message" style={{ float: 'right', marginTop: '9px' }}>
                            Already registered? <Link to="/login">Log In</Link>
                        </FormText>
                    </Form>
                </React.Fragment>
            </div>
        )
    }
}
