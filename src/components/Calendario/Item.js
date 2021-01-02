import React from 'react';

export const Item = ({ dia, eliminarDiaCalendario }) => {
    return (
        <div className="col">
            <div className="card border-primary shadow-lg bg-white rounded">
                <div className="card-body">
                    <h5 className="card-title text-center text-uppercase">{dia.fecha.split('-').reverse().join('/')}</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Calorías máximas al día: {dia.caloriasMaximasAlDia}</li>
                    <li className="list-group-item">Calorías consumidas este día: {dia.caloriasConsumidasDia}</li>
                </ul>
                <div className="card-footer">
                    <div className="d-grid gap-2">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => eliminarDiaCalendario(dia)}
                        >ELIMINAR ESTE DÍA</button>
                    </div>
                </div>
            </div>
        </div>
    );
};