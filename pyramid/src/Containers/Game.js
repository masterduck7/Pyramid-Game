import React, { Component } from 'react';

class Game extends Component{

    constructor(state){
        super(state)
        this.state = {
            card_list: ["A","2","3","4","5","6","7","8","9","10","J","Q","K"],
            users: [],
            pyramid_height: 1,
            number_users: 1,
            structure: []
        }
    }
    
    componentDidMount(){
        this.setState({users: JSON.parse(localStorage.getItem("users"))});
        this.setState({pyramid_height: JSON.parse(localStorage.getItem("pyramid_height"))});
        this.setState({number_users : JSON.parse(localStorage.getItem("number_users"))});
        this.setStructure(JSON.parse(localStorage.getItem("pyramid_height")));
    }

    setStructure(pyramid_height){
        const height = pyramid_height;
        const structure_array = []
        for (let index = height; index > 0; index--) {
            // Get Random card associated
            const randomCard = this.state.card_list[Math.floor(Math.random()*this.state.card_list.length)];
            const data = new Array(index).fill(["X",randomCard])
            structure_array.push(data)
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
                children.push(<button onClick={this.playCard(data[j][1])}>{data[j][0]}</button>)
          }
          table.push(<p>{children}</p>)
        }
        return table
    }
    
    playCard(card){
        console.log(card)
    }

    render(){
        return(
                <div class="btn-group">
                    <center>{this.createTable()}</center>
                </div>
        );
    }
}

export default Game;