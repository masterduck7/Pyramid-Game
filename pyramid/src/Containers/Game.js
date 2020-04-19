import React, { Component } from 'react';

class Game extends Component{

    constructor(state){
        super(state)
        this.state = {
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
            const data = new Array(index).fill("X")
            structure_array.push(data)
        }
        this.setState({structure: structure_array})
    }

    render(){
        return(
            <div>
                <p>{this.state.pyramid_height}</p>
            </div>
        );
    }
}

export default Game;