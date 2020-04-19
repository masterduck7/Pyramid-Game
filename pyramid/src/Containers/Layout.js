import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import logo from '../Assets/Drink.png';
import "antd/dist/antd.css";

const { Header } = Layout;

class CustomLayout extends Component{
    render(){
        return (
            <Layout className="layout">
                <Header>
                    <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
                        <Menu.Item><img alt="Movie" src={logo} height="60px" /></Menu.Item>
                        <Menu.Item key="1">Inicio</Menu.Item>
                        <Menu.Item key="2">Estadisticas</Menu.Item>
                    </Menu>
                </Header>
            </Layout>
        )
    }
}

export default CustomLayout;