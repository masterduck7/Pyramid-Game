import React, { Component } from 'react';

class Game extends Component{

    constructor(state){
        super(state)
        this.state = {
            card_list: ["A","2","3","4","5","6","7","8","9","10","J","Q","K"],
            users: [],
            pyramid_height: 1,
            structure: []
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
        for (let index = height; index > 0; index--) {
            let row = []
            for (let index_row = index; index_row > 0; index_row--) {
                // Get Random card associated
                let randomCard = this.state.card_list[Math.floor(Math.random()*this.state.card_list.length)];
                row.push(["X", randomCard, type_card])
            }
            type_card = !type_card
            console.log(row)
            structure_array.push(row)
        }
        this.setState({structure: structure_array})
    }
    
    createTable(){
        let table = []
        let structure = this.state.structure;
        for (let i = 0; i < structure.length; i++) {
            let children = []
            let data = structure[i]
            for (let j = 0; j < data.length; j++) {
                children.push(<button onClick={() => this.playCard(data[j][1], data[j][2])}>{data[j][0]}</button>)
          }
          table.push(<p>{children}</p>)
        }
        return table
    }
    
    playCard(card, type_card){
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
    }

    render(){
        return(
            <center>{this.createTable()}</center>
        );
    }
}

export default Game;