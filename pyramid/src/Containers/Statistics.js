import React, { Component } from 'react';
import { List, Card } from 'antd';
import CustomLayout from '../Containers/Layout';

class Statistics extends Component{

    constructor(state){
        super(state)
        this.state = {
            user_drinks: []
        }
    }

    componentDidMount(){
        const users_data = JSON.parse(localStorage.getItem("users"))
        const user_drinks = []
        if (users_data){
            users_data.forEach(user => {
                const name = user["name"]
                const drinks = localStorage.getItem(user["name"]+"_drinks")
                user_drinks.push({"name": name, "drinks": drinks })
            });
            this.setState({
                user_drinks: user_drinks
            })
        }
    }

    componentWillUnmount(){
        // Clean localstorage
        const users_data = JSON.parse(localStorage.getItem("users"))
        if (users_data){
            users_data.forEach(user => {
                localStorage.removeItem(user.name+"_drinks")
            })
            localStorage.removeItem("pyramid_height")
            localStorage.removeItem("users")
        }
    }

    render(){
        return(
            <div>
            <CustomLayout />
            <br />
            <center><h1>Estadísticas</h1></center>
            <List
                style={{ marginLeft:"5%", marginRight:"5%" }}
                grid={{ gutter: 16, column: 4 }}
                dataSource={this.state.user_drinks}
                renderItem={item => (
                    <List.Item>
                        <Card title={item.name}>{item.drinks} Drinks </Card>
                    </List.Item>
                )}
            />
            </div>
        );
    }
}

export default Statistics;