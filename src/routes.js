import React from 'react';
import {Route,Switch} from 'react-router-dom';
import { HashRouter } from 'react-router-dom'; 
import Home from './Containers/Home';
import DataEntry from './Containers/DataEntry';
import Game from './Containers/Game';
import Statistics from './Containers/Statistics';

const BaseRouter = () => (
    <div>
        <HashRouter basename='/'>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/setup-game' component={DataEntry} />
                <Route exact path='/game' component={Game} />
                <Route exact path='/statistics' component={Statistics} />
            </Switch>
        </HashRouter>
    </div>
);

export default BaseRouter;