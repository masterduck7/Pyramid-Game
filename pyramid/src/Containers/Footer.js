import React, { Component } from 'react';
import { Layout } from 'antd';
import "antd/dist/antd.css";

const { Footer } = Layout;

class CustomFooter extends Component{
    render(){
        return (
            <Layout className="layout">
                <Footer style={{ textAlign: 'center', bottom: 0, position: 'absolute', width:"100%", height: 10 }}>By LPSoftware  </Footer>
            </Layout>
        )
    }
}

export default CustomFooter;