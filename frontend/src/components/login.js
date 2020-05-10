import React from 'react'
import axios from 'axios'

import { Image, Button } from 'react-bootstrap'
import loginImg from '../images/login.jpg'

const Login = props => {
    const getFieldsValue = () => {
        return {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }
    };

    const login = () => {
        const credentials = getFieldsValue();
        axios.post('http://localhost:3000/users/login', credentials)
            .then(function (response) {
                localStorage.setItem("token", response.data);
                props.history.push("/dresses");
                // alert("You are authenticated!");
            })
            .catch(function (error) {
                alert(error.response.data.error);
            });
    };

    return (
        <div class="container">
            <br /> <br />
            <div className="box">
                <form>
                    <div class="text-center">
                        <Image src={loginImg} alt="login" roundedCircle width={180} height={180} />
                    </div>
                    <h3> Login to your Account </h3>
                    <br />
                    <div class="form-group">
                        <label for="username"> Username or Email: </label>
                        <input type="text" class="form-control" id="username" name="username" />
                    </div>
                    <div class="form-group">
                        <label for="password"> Password: </label>
                        <input type="password" class="form-control" id="password" name="password" />
                    </div>
                    <div class="text-center">
                        <Button variant='info' onClick={login} block> Login </Button>
                    </div>
                </form>
            </div>
        </div>

        // <div class="container">
        //     <br />
        //     <br />
        //     <div className='box'>
        //         <form>
        //             <label htmlFor="username">Username/Email:</label> <br />
        //             <input class="form-control" type="text" id="username" name="username" /> <br />
        //             <label htmlFor="password">Password:</label> <br />
        //             <input class="form-control" type="password" id="password" name="password" /> <br /><br />
        //             <Button variant="info" onClick={login}> Login </Button>
        //         </form>
        //     </div>
        // </div>
    );
};

export default Login;
