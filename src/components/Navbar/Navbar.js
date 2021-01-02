import React from 'react';
import { Link } from 'react-router-dom';

import '../../index.css';

export const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand mx-5 titulo" to="/alimentos">AppLIMENTOS</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item mx-1">
                                <Link className="btn btn-outline-primary" to="/alimentos">ALIMENTOS</Link>
                            </li>
                            <li className="nav-item mx-1">
                                <Link className="btn btn-outline-primary" to="/dia">DÍA</Link>
                            </li>
                            <li className="nav-item mx-1">
                                <Link className="btn btn-outline-primary" to="/calendario">CALENDARIO</Link>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <Link className="btn btn-outline-primary" to="/micuenta">MI CUENTA</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};