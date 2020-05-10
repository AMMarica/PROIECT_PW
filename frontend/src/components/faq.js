import React, { useState, useEffect } from 'react';
import axios from 'axios'

import { Accordion, Card, Button, Image } from 'react-bootstrap'

import question from '../images/question.png'

const QuestionCard = (props) => {

    return (
        <Card border="info" style={{ width: '50rem' }}>
            <Card.Header>
                <Image src={question} roundedCircle width={25} height={25} />
                <Accordion.Toggle as={Button} variant="default" eventKey={props.question._id}>
                    {props.question.question}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={props.question._id}>
                <Card.Body> {props.question.response} </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

const FAQ = props => {

    const [faq, setFAQ] = useState([]);

    async function fetchData() {
        const token = localStorage.getItem("token");
        const questions = (await axios.get('http://localhost:3000/questions', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })).data;
        const faq = questions.filter(question => question.important);
        setFAQ(faq);
    }

    useEffect(() => {
        fetchData().catch(error => {
            alert(error);
        });
    }, []);

    return (
        <div className="container">
            <br /> <br />
            <div align="center">
                <Accordion>
                    {
                        faq.map(question => <QuestionCard question={question} />)
                    }
                </Accordion>
            </div>
        </div>
    )
};

export default FAQ;