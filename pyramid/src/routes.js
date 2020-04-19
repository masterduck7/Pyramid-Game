import React from 'react';
import {Route,Switch} from 'react-router-dom';
import { HashRouter } from 'react-router-dom'; 
import Home from './Containers/Home';
import DataEntry from './Containers/DataEntry';
import Game from './Containers/Game';
import CustomLayout from './Containers/Layout';

const BaseRouter = () => (
    <div>
        <HashRouter basename='/'>
            <CustomLayout />
            <br />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/setup-game' component={DataEntry} />
                <Route exact path='/game' component={Game} />
            </Switch>
        </HashRouter>
    </div>
);

export default BaseRouter;