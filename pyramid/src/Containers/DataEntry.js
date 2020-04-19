import React, { Component } from 'react';
import { render } from 'react-dom';
import Styles from '../Assets/Styles';
import { Field } from 'react-final-form';
import Wizard from '../Components/Wizard';
import { Form, Input, Icon, Button } from 'antd';

let id = 0

class SetupGame extends Component {

    constructor(props){
        super(props)
        this.state = {
            number_users : 0,
            user_cards : {},
            pyramid_height : 0
        }
    }

    // Wizard functions
    // https://codesandbox.io/s/km2n35kq3v?file=/index.js

    sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    required = value => (value ? undefined : 'Required')

    onSubmit = async values => {
        await this.sleep(300)
        this.setState({
            number_users : 1,
            user_cards : {"a": [1,2]},
            pyramid_height : values.pyramid_height
        })
    }

    render(){
        return(
            <div>
            <Styles>
                <Wizard onSubmit={this.onSubmit}>
                    <Wizard.Page>
                        <div>
                        <label>Altura Pirámide</label>
                        <Field
                            name="pyramid_height"
                            component="input"
                            type="text"
                            placeholder="Ingrese altura de pirámide"
                            validate={this.required}
                        />
                        </div>
                    </Wizard.Page>
                    <Wizard.Page>
                        <div>
                        <label>Nombre</label>
                        <Field
                            name="name"
                            component="input"
                            type="text"
                            placeholder="Ingrese nombre"
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