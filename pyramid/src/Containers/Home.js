import React, { Component } from 'react';
import { Row, Col, Card, Timeline } from 'antd';
import Example from '../Assets/Example.png';

class Home extends Component {
    render(){
        return(
            <Row>
            <Col xl={12} xs={20}>
                <center><img alt="Example" src={Example} width="200px"></img></center>
            </Col>
            <Col xl={12} xs={20}>
                <br />
                <h2>Pasos</h2>
                <Timeline>
                    <Timeline.Item>Ingrese nombre de jugadores</Timeline.Item>
                    <Timeline.Item>Ingrese altura de pirámide</Timeline.Item>
                    <Timeline.Item>Empiece a jugar y beber</Timeline.Item>
                </Timeline>
                < br />
                <h2>Reglas</h2>
                <Card bordered={false}>
                    <p>Se asignan 2 cartas al azar por jugador</p>
                    <p>Depende de la altura de la pirámide cuan dificil es</p>
                </Card>
                
            </Col>
            </Row>
        );
    }
}

export default Home;