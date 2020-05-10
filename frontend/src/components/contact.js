import React from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';

const Contact = props => {

    const getFieldsValue = () => {
        return {
            email: document.getElementById("email").value,
            question: document.getElementById("question").value
        }
    };

    const sendQuestion = () => {
        const data = getFieldsValue();
        const token = localStorage.getItem("token");
        axios.post('http://localhost:3000/questions', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(function (response) {

        }).catch(function (error) {
            alert(error.response.data.error);
        });
    };

    return (
        <div class="container">
            <br /> <br />
            <div className="box">
                <form>
                    <h3> How can we help?</h3>
                    <br />
                    <div class="form-group">
                        <label for="name"> Name: </label>
                        <input type="text" class="form-control" id="name" placeholder="Perfect Customer" />
                    </div>
                    <div class="form-group">
                        <label for="email"> Email address: </label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="example@gmail.com" />
                        <small id="emailHelp" class="form-text text-muted"> You will receive a response on this email address. </small>
                    </div>
                    <div class="form-group">
                        <label for="question"> Message: </label>
                        <textarea class="form-control" type="text" id="question" name="question" rows="4" placeholder="Tell us something..."></textarea>
                    </div>
                    <div class="text-center">
                        <Button variant='info' onClick={sendQuestion} block> Send </Button>
                    </div>
                </form>
            </div>
        </div>
    )

};

export default Contact;