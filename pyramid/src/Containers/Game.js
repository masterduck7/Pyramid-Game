import React, { Component } from 'react';

class Game extends Component{

    constructor(state){
        super(state)
        this.state = {
            users: [],
            pyramid_height: 1,
            number_users: 1
        }
    }
    
    componentDidMount(){
        this.setState({users: JSON.parse(localStorage.getItem("users"))});
        this.setState({pyramid_height: JSON.parse(localStorage.getItem("pyramid_height"))});
        this.setState({number_users : JSON.parse(localStorage.getItem("number_users"))});
    }

    render(){
        return(
            <div>
                <p>{this.state.number_users}</p>
                <p>{this.state.pyramid_height}</p>
            </div>
        );
    }
}

export default Game;