import React, { useState, useEffect } from 'react';
import axios from 'axios'

import { Image, Card, Button, Row, Col } from 'react-bootstrap'
import dress3 from '../images/delete.png'

const DressCard = props => {
    const deleteDress = () => {
        const token = localStorage.getItem("token");
        axios.delete(`http://localhost:3000/dresses/${props.dress._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            props.update();
        }).catch(error => {
            alert(error.response.data.error);
        });
    }

    const selectDress = () => {
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:3000/dresses/updateSelected/${props.dress._id}`, {
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
        <Card style={{ width: '18rem' }}>
            <Card.Header> {props.dress.title} </Card.Header>
            <Card.Img variant="top" src={require('../images/dresses/' + props.dress.image)} />
            <Card.Body>
                <Card.Text> {props.dress.description} </Card.Text>
                <Card.Text> {props.dress.price} </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <div class="text-right">
                    <input class="form-check-input" type="checkbox" value="" id="check" onClick={selectDress} checked={props.dress.selected} />
                    <label class="form-check-label" for="check">
                        <i> Buy </i>
                    </label>
                </div>
                <div class="text-right">
                    <Button variant="light" onClick={deleteDress}>
                        <Image src={dress3} width={20} height={20}/>
                    </Button>
                </div>
            </Card.Footer>
        </Card>
    )
}

const Dresses = props => {

    const [dresses, setDresses] = useState([]);

    async function fetchData() {
        const token = localStorage.getItem("token");
        const dresses = await axios.get('http://localhost:3000/dresses', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setDresses(dresses.data);
    }

    useEffect(() => {
        fetchData().catch(error => {
            alert(error.response.data.error);
        });
    }, []);

    return (
        <div className="container">
            <br /> <br />
            <Row xs={1} md={2} lg={3}>
                {
                    dresses.map(dress => <Col key={dress._id}> <DressCard dress={dress} update={fetchData} /> </Col>)
                }
            </Row>
        </div>
    )
};

export default Dresses;