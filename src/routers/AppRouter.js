import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import { DiaState } from '../context/Dia/diaState';

import { Navbar } from '../components/Navbar/Navbar';
import { Alimentos } from '../components/Alimentos/Alimentos';
import { Dia } from '../components/Dia/Dia';
import { Calendario } from '../components/Calendario/Calendario';
import { MiCuenta } from '../components/MiCuenta/MiCuenta';

export const AppRouter = () => {
    return (
        <DiaState>
            <Router>
                <div>
                    <Navbar />
                    <Switch>
                        <Route exact path="/alimentos" component={Alimentos} />
                        <Route exact path="/dia" component={Dia} />
                        <Route exact path="/calendario" component={Calendario} />
                        <Route exact path="/micuenta" component={MiCuenta} />
                        <Redirect to="/micuenta" />
                    </Switch>
                </div>
            </Router>
        </DiaState>
    );
};