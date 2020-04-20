import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import {Link} from 'react-router-dom';
import logo from '../Assets/Drink.png';
import "antd/dist/antd.css";

const { Header } = Layout;

class CustomLayout extends Component{
    render(){
        return (
            <Layout className="layout">
                <Header>
                    <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
                        <Menu.Item><Link to="/"><img alt="Movie" src={logo} height="60px" /></Link></Menu.Item>
                        <Menu.Item key="1"><Link to="/">Inicio</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/setup-game">Iniciar Juego</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/statistics">Estadisticas</Link></Menu.Item>
                    </Menu>
                </Header>
            </Layout>
        )
    }
}

export default CustomLayout;