import React, { Component } from 'react';
import Styles from '../Assets/Styles';
import { Field } from 'react-final-form';
import Wizard from '../Components/Wizard';

class SetupGame extends Component {

    constructor(props){
        super(props)
        this.state = {
            card_list: ["A","2","3","4","5","6","7","8","9","10","J","Q","K"],
            number_users : 1,
            pyramid_height : 0,
            users: [{ name: "", cards: ["",""] }]
        }
    }

    // Wizard functions
    // https://codesandbox.io/s/km2n35kq3v?file=/index.js

    sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    required = value => (value ? undefined : 'Required')

    onSubmit = (values) => {
        this.setState({
            pyramid_height : values.pyramid_height
        })
        // Save Data on Local Storage
        localStorage.setItem("pyramid_height",values.pyramid_height)
        localStorage.setItem("number_users",this.state.number_users)
        const users_data = JSON.stringify(this.state.users);
        localStorage.setItem("users",users_data)
        alert("START GAME");
    }

    // Dynamic form to add users
    // https://goshakkk.name/array-form-inputs/

    handleUserNameChange = idx => evt => {
        const randomCard1 = this.state.card_list[Math.floor(Math.random()*this.state.card_list.length)];
        const randomCard2 = this.state.card_list[Math.floor(Math.random()*this.state.card_list.length)];
        const newUsers = this.state.users.map((user, sidx) => {
            if (idx !== sidx) return user;
            return { ...user, name: evt.target.value, cards: [randomCard1,randomCard2] };
        });

        this.setState({ users: newUsers });
    };

    handleAddUser = () => {
        const randomCard1 = this.state.card_list[Math.floor(Math.random()*this.state.card_list.length)];
        const randomCard2 = this.state.card_list[Math.floor(Math.random()*this.state.card_list.length)];
        this.setState({
            number_users: this.state.number_users + 1,
            users: this.state.users.concat([{ name: "", cards: [randomCard1,randomCard2] }])
        });
    };

    handleRemoveUser = idx => () => {
        this.setState({
            number_users: this.state.number_users - 1,
            users: this.state.users.filter((s, sidx) => idx !== sidx)
        });
    };

    render(){
        return(
            <div className="outer-div">
            <Styles>
                <Wizard onSubmit={this.onSubmit}>
                    <Wizard.Page>
                    <form>
                        {this.state.users.map((user, idx) => (
                        <div className="inner-div" key={idx}>
                            <input
                            type="text"
                            placeholder="Ingrese el nombre"
                            value={user.name}
                            onChange={this.handleUserNameChange(idx)}
                            />
                            <button
                            type="button"
                            onClick={this.handleRemoveUser(idx)}
                            className="small"
                            >
                            Quitar
                            </button>
                        </div>
                        ))}
                        <button
                        type="button"
                        onClick={this.handleAddUser}
                        className="small"
                        >
                            Agregar otro jugador
                        </button>
                        <button type="submit">Continuar</button>
                    </form>
                    </Wizard.Page>
                    <Wizard.Page>
                        <div>
                        <label>Altura Pirámide</label>
                        <Field
                            name="pyramid_height"
                            component="input"
                            type="number"
                            placeholder="Ingrese altura de pirámide"
                            validate={this.required}
                        />
                        </div>
                    </Wizard.Page>
                </Wizard>
            </Styles>
            </div>
        );
    }
}

export default SetupGame;