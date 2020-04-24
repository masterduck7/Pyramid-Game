import React, { Component } from 'react';
import { Layout, Menu, Card, Button, List, Col, Row } from 'antd';
import {Link} from 'react-router-dom';
import logo from '../Assets/Drink.png';

const { Header } = Layout;

class Game extends Component{

    constructor(state){
        super(state)
        this.state = {
            card_options: ["A","2","3","4","5","6","7","8","9","10","J","Q","K"],
            card_list: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J","Q", "K",
            "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q","K",
            "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K",
            "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
            users: [],
            pyramid_height: 1,
            structure: [],
            remaining_cards: 0,
            disabledButtons: [],
            playedButtons: []
        }
    }
    
    componentDidMount(){
        this.setState({pyramid_height: JSON.parse(localStorage.getItem("pyramid_height"))});
        this.setState({users: JSON.parse(localStorage.getItem("users"))});
        const card_user_assigned = this.getUserCards(JSON.parse(localStorage.getItem("users")))
        this.setStructure(JSON.parse(localStorage.getItem("pyramid_height")), JSON.parse(localStorage.getItem("hard")), card_user_assigned);
        this.state.disabledButtons.push(`${0}.${0}`)
    }

    getUserCards(users){
        let card_user = []
        users.forEach(user => {
            for (let index = 0; index < user.cards.length; index++) {
                card_user.push(user.cards[index])
            }
        });
        return card_user
    }

    setStructure(pyramid_height, hard, user_cards){
        const structure_array = [];
        if (hard) {
            const height = pyramid_height;
            let type_card = false;
            let number_of_cards = 0;
            let card_list = user_cards;
            for (let index = height; index > 0; index--) {
                let row = []
                for (let index_row = index; index_row > 0; index_row--) {
                    // Get Random card associated
                    let randomCard = card_list[Math.floor(Math.random()*card_list.length)];
                    row.push(["X", randomCard, type_card])
                    number_of_cards = number_of_cards + 1
                }
                type_card = !type_card
                structure_array.push(row)
            }
            this.setState({structure: structure_array, number_of_cards: number_of_cards})
        }else{
            const height = pyramid_height;
            let type_card = false;
            let number_of_cards = 0;
            let card_list = this.state.card_list;
            for (let index = height; index > 0; index--) {
                let row = []
                for (let index_row = index; index_row > 0; index_row--) {
                    // Get Random card associated
                    let randomCard = card_list[Math.floor(Math.random()*card_list.length)];
                    row.push(["X", randomCard, type_card])
                    number_of_cards = number_of_cards + 1
                    // Remove cards from list
                    const new_card_list = card_list;
                    for (let index = 0; index < new_card_list.length; index++) {
                        if ( randomCard === new_card_list[index] ) {
                            delete new_card_list[index]
                            break
                        }
                    }
                    // Remove undefined items
                    const new_card_list_clean = []
                    for (let index = 0; index < new_card_list.length; index++) {
                        if ( new_card_list[index] !== undefined ) {
                            new_card_list_clean.push(new_card_list[index])
                        }
                    }
                    card_list = new_card_list_clean
                }
                type_card = !type_card
                structure_array.push(row)
            }
            this.setState({
                card_list: card_list
            })
            this.setState({structure: structure_array, number_of_cards: number_of_cards})
        }
        let card_list = []
        for (let i = 0; i < structure_array.length; i += 1) {
        for (let j = 0; j < structure_array[i].length; j += 1) {
            if (i === 0 && j === 0) {
                continue
            }else{
                card_list.push(`${i}.${j}`)
            }
        }
        }
        this.setState({
            disabledButtons: card_list
        })
    }
    
    createTable(){
        let table = []
        let structure = this.state.structure;
        for (let i = 0; i < structure.length; i++) {
            let children = []
            let data = structure[i]
            for (let j = 0; j < data.length; j++) {
                const var_id = `${i}.${j}`
                children.push(
                    <Button 
                        onClick={() => this.playCard(i,var_id,data[j][1], data[j][2])}
                        id = {var_id}
                        key = {var_id}
                        type = "danger"
                        disabled = {this.isDisabled(var_id)}
                        ref = {(id) => id}
                    >
                        {data[j][0]}
                    </Button>
                )
            }
            table.push(<p key={i}>{children}</p>)
        }
        return table
    }
    
    playCard(nDrinks, id, card, type_card){
        const drink_users = []
        this.state.users.forEach(user => {
            if (user.cards.includes(card)) {
                drink_users.push(user.name)
                if (type_card) {
                    const drinks_user = localStorage.getItem(user.name+"_drinks")
                    localStorage.setItem(user.name+"_drinks", parseInt(drinks_user) + (nDrinks + 1))    
                }                
            }
        });
        if (drink_users.length > 0) {
            if (type_card) {
                alert("Beben "+ (nDrinks + 1) + " tragos: " + drink_users.join(", "))    
            }else{
                alert("Regalan "+ (nDrinks + 1) + " tragos: " + drink_users.join(", "))
            }
            
        }else{
            alert("Nadie")
        }

        // Change number of remaining cards
        this.setState({
            number_of_cards: this.state.number_of_cards - 1
        })

        // Disable card
        const playedCard = this.state.playedButtons.push(id)
        const removeCard = this.state.disabledButtons.shift()
        this.setState({
            playCard: playedCard,
            removeCard: removeCard
        })

        // Check is game is finished
        if (this.state.number_of_cards === 1) {
            window.location.href="/#/statistics"
        }
    }

    isDisabled(id){
        if (this.state.playedButtons.includes(id) ) {
          return true
        }
        else{
          if (this.state.disabledButtons.includes(id)) {
            return true
          }else{
            return false
          }
        }
      }

    render(){
        return(
            <div>
            <Layout className="layout">
                <Header>
                    <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
                        <Menu.Item><img alt="Movie" src={logo} height="60px" /></Menu.Item>
                        <Menu.Item key="1"><Link to="/statistics">Terminar Juego</Link></Menu.Item>
                    </Menu>
                </Header>
            </Layout>
            <Row style={{paddingLeft : 20}}>
                <Col xs={2} sm={4} md={6} lg={8} xl={8}>
                <br />
                <Card style={{ backgroundColor:"#001529", color:"#8C8C8C", top:-10, height:60, width: 300, textAlign :"center", fontWeight: "bold" }}>Jugadores</Card>
                <List
                        itemLayout="horizontal"
                        dataSource={this.state.users}
                        style={{ width: 300 }}
                        renderItem={item => (
                            <Card size="small" bodyStyle={{ backgroundColor:"#FF4D4F", height: 40}}><strong>{item.name}:  </strong>  {item.cards[0]} , {item.cards[1]}</Card>
                        )}
                />
                
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={8}>
                    <br />
                    <center>{this.createTable()}</center>
                </Col>
            </Row>
            </div>
        );
    }
}

export default Game;