import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Card, Row, Col, Button } from 'react-bootstrap'

const DressCard = props => {
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
        <Card style={{ width: '10rem' }}>
            <Card.Header> {props.dress.title} </Card.Header>
            <Card.Img variant="top" src={require('../images/dresses/' + props.dress.image)} />
            <Card.Body>
                <Card.Text> {props.dress.price} </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <div class="text-right">
                    <input class="form-check-input" type="checkbox" value="" id="check" onClick={selectDress} checked={props.dress.selected} />
                    <label class="form-check-label" for="check">
                        <i> Buy </i>
                    </label>
                </div>
            </Card.Footer>
        </Card>
    )
}

const Basket = props => {

    const [selectedDresses, setSelectedDresses] = useState([]);

    async function fetchData() {
        const token = localStorage.getItem("token");
        const dresses = (await axios.get('http://localhost:3000/dresses', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })).data;
        const selectedDresses = dresses.filter(dress => dress.selected);
        setSelectedDresses(selectedDresses);
    }

    useEffect(() => {
        fetchData().catch(error => {
            alert(error);
        });
    }, []);

    return (
        <div className="container">
            <br /> <br />
            <Row xs={1} md={3} lg={6}>
                {
                    selectedDresses.map(dress => <Col key={dress._id}> <DressCard dress={dress} update={fetchData} /> </Col>)
                }
            </Row>
            <br />
            <div align="center">
                <Button variant="info">Order</Button>
            </div>
        </div>
    )
};

export default Basket;