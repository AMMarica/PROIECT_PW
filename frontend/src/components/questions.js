import React, { useEffect, useState } from "react";
import axios from 'axios'

import { Button, ListGroup, Row } from 'react-bootstrap'

const AnswordQuestion = props => {
    const markQuestion = () => {
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:3000/questions/updateImportance/${props.data._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            props.update();
        }).catch(error => {
            alert(error.response.data.error);
        });
    }

    return (
        <ListGroup.Item variant="light">
            <p><b> {props.data.question} </b></p>
            <p> {props.data.response} </p>
            <div class="text-center">
                <input class="form-check-input" type="checkbox" value="" id="check" onClick={markQuestion} checked={props.data.important} />
                <label class="form-check-label" for="check">
                    <i> Mark as important </i>
                </label>
            </div>
        </ListGroup.Item>
    )
};

const UnanswordQuestion = props => {
    const sendResponse = () => {
        const response = {
            response: document.getElementById(props.data._id).value
        }
        const token = localStorage.getItem("token");
        axios.put(`http://localhost:3000/questions/response/${props.data._id}`, response, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            props.update();
        }).catch(error => {
            alert(error.response.data.error);
        });
    }

    return (
        <ListGroup.Item style={{ width: '50rem' }}>
            <p><b> {props.data.question} </b></p>
            <textarea class="form-control" type="text" id={props.data._id} name={props.data._id} rows="3" placeholder="Response..."></textarea>
            <br />
            <div class="text-center">
                <Button variant="outline-dark" onClick={sendResponse}> Send response </Button>
            </div>
        </ListGroup.Item>
    )
};

const Questions = props => {

    const [questions, setQuestions] = useState([]);

    async function fetchData() {
        const token = localStorage.getItem("token");
        const questions = await axios.get('http://localhost:3000/questions', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setQuestions(questions.data);
    }

    useEffect(() => {
        fetchData().catch(error => {
            alert(error.response.data.error);
        });
    }, []);

    const getAnswordQuestions = () => {
        return questions.filter(q => 'response' in q)
    }

    const getUnanswordQuestions = () => {
        return questions.filter(q => !('response' in q))
    }

    return (
        <div className='container'>
            <br />
            <div align="center">
                <ListGroup variant="flush">
                    {
                        getUnanswordQuestions().map(question =>
                            <div>
                                <UnanswordQuestion data={question} update={fetchData} /> <br />
                            </div>
                        )
                    }
                </ListGroup>
            </div>
            <br /> <br />
            <h3> <i> Question history: </i> </h3>
            <br />
            <ListGroup variant="flush">
                <Row xs={1} md={2} lg={2}>
                    {
                        getAnswordQuestions().map(question =>
                            <div>
                                <AnswordQuestion data={question} update={fetchData} /> <br />
                            </div>
                        )
                    }
                </Row>
            </ListGroup>
        </div>
    )

};

export default Questions;