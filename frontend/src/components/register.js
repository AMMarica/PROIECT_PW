import React, { useState } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button'

const Register = props => {

    const getFieldsValue = () => {
        return {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            name: document.getElementById("name").value,
            email: document.getElementById("email").value
        }
    };

    const register = () => {
        const credentials = getFieldsValue();
        axios.post('http://localhost:3000/users/register', credentials)
            .then(response => {
                alert(response.data);
                props.history.push("/login");
            });
    };

    return (
        <div class="container">
            <br />
            <br />
            <div className='box'>
                <form>
                    <h3> Set up your account </h3>
                    <br />
                    <div class="form-group">
                        <label for="username"> Username: </label>
                        <input type="text" class="form-control" id="username" name="username" />
                    </div>
                    <div class="form-group">
                        <label for="password"> Password: </label>
                        <input type="password" class="form-control" id="password" name="password" />
                        <small id="passhelp" class="form-text text-muted"> For a good protection, we suggest your password to caontain lowercase letters, uppercase letters, numbers, and symbols. </small>
                    </div>
                    <div class="form-group">
                        <label for="name"> Name: </label>
                        <input type="text" class="form-control" id="name" name="name" />
                    </div>
                    <div class="form-group">
                        <label for="email"> Email address: </label>
                        <input type="text" class="form-control" id="email" name="email" />
                    </div>
                    <div class="text-center">
                        <Button variant='info' onClick={register} block> Register </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
