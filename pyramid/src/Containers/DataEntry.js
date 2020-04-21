import React, { Component } from 'react';
import Styles from '../Assets/Styles';
import { Field } from 'react-final-form';
import Wizard from '../Components/Wizard';
import CustomLayout from '../Containers/Layout';

class SetupGame extends Component {

    constructor(props){
        super(props)
        this.state = {
            card_options: ["A","2","3","4","5","6","7","8","9","10","J","Q","K"],
            card_list: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J","Q", "K",
            "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q","K",
            "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K",
            "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
            number_users : 1,
            pyramid_height : 0,
            users: [{ name: "", cards: ["",""], drinks: 0 }]
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
        // Save individual user drinks to easy access and set value
        const users_data = this.state.users
        users_data.forEach(user => {
            localStorage.setItem(user["name"]+"_drinks",user["drinks"])
        });
        // Save All users in one to get total data
        const users_all_data = JSON.stringify(this.state.users);
        localStorage.setItem("users",users_all_data)
        window.location.href="/#/game"
    }

    // Dynamic form to add users
    // https://goshakkk.name/array-form-inputs/

    handleUserNameChange = idx => evt => {
        // Get Random Card
        const randomCard1 = this.state.card_list[Math.floor(Math.random()*this.state.card_list.length)];
        const randomCard2 = this.state.card_list[Math.floor(Math.random()*this.state.card_list.length)];
        // Set users
        const newUsers = this.state.users.map((user, sidx) => {
            if (idx !== sidx) return user;
            return { ...user, name: evt.target.value, cards: [randomCard1,randomCard2], drinks: 0 };
        });

        this.setState({ users: newUsers });
    };

    handleAddUser = () => {
        const randomCard1 = this.state.card_list[Math.floor(Math.random()*this.state.card_list.length)];
        const randomCard2 = this.state.card_list[Math.floor(Math.random()*this.state.card_list.length)];
        this.setState({
            users: this.state.users.concat([{ name: "", cards: [randomCard1,randomCard2], drinks: 0 }])
        });
        // Remove cards from list
        const new_card_list = this.state.card_list;
        for (let index = 0; index < new_card_list.length; index++) {
            if ( randomCard1 === new_card_list[index] ) {
                delete new_card_list[index]
                break
            }
        }
        for (let index = 0; index < new_card_list.length; index++) {
            if ( randomCard2 === new_card_list[index] ) {
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
        this.setState({
            card_list: new_card_list_clean
        })
    };

    handleRemoveUser = idx => () => {
        this.setState({
            users: this.state.users.filter((s, sidx) => idx !== sidx)
        });
    };

    render(){
        return(
            <div className="outer-div">
            <CustomLayout />
            <br />
            <center><h1>Agregar jugadores:</h1></center>
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
                            required
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
                            pattern="^[1-9][0-9]*$"
                            required
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