import React, { Component } from 'react';
import { Button } from 'antd';

class Game extends Component{

    constructor(state){
        super(state)
        this.state = {
            card_list: ["A","2","3","4","5","6","7","8","9","10","J","Q","K"],
            users: [],
            pyramid_height: 1,
            structure: [],
            remaining_cards: 0
        }
    }
    
    componentDidMount(){
        this.setState({pyramid_height: JSON.parse(localStorage.getItem("pyramid_height"))});
        this.setState({users: JSON.parse(localStorage.getItem("users"))});
        this.setStructure(JSON.parse(localStorage.getItem("pyramid_height")));
    }

    setStructure(pyramid_height){
        const height = pyramid_height;
        const structure_array = []
        let type_card = false
        let number_of_cards = 0
        for (let index = height; index > 0; index--) {
            let row = []
            for (let index_row = index; index_row > 0; index_row--) {
                // Get Random card associated
                let randomCard = this.state.card_list[Math.floor(Math.random()*this.state.card_list.length)];
                row.push(["X", randomCard, type_card])
                number_of_cards = number_of_cards + 1
            }
            type_card = !type_card
            structure_array.push(row)
        }
        this.setState({structure: structure_array, number_of_cards: number_of_cards})
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
                        onClick={() => this.playCard(var_id,data[j][1], data[j][2])}
                        id = {var_id}
                        key = {var_id}
                        type = "danger"
                        disabled = {false}
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
    
    playCard(id, card, type_card){
        const drink_users = []
        this.state.users.forEach(user => {
            if (user.cards.includes(card)) {
                drink_users.push(user.name)
                if (type_card) {
                    const drinks_user = localStorage.getItem(user.name+"_drinks")
                    localStorage.setItem(user.name+"_drinks", parseInt(drinks_user) + 1)    
                }                
            }
        });
        if (drink_users.length > 0) {
            if (type_card) {
                alert("Beben: " + drink_users.join(", "))    
            }else{
                alert("Regalan: " + drink_users.join(", "))
            }
            
        }else{
            alert("Nadie")
        }

        // Change number of remaining cards
        this.setState({
            number_of_cards: this.state.number_of_cards - 1
        })

        // Disable card
        document.getElementById(id).disabled = true;

        // Check is game is finished
        if (this.state.number_of_cards === 1) {
            window.location.href="/#/statistics"
        }
    }

    render(){
        return(
            <center>{this.createTable()}</center>
        );
    }
}

export default Game;