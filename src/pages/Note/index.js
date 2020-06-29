import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

function Note() {

    const Authorization = localStorage.getItem('token');

    useEffect(() => {
        api.get('projects', { headers: { Authorization } }).then(response => {
            console.log(response);
        })
    }, [Authorization]);

    return (
        <div>
            <h1>Login realizado com sucesso</h1>
            <Link to="/">Voltar</Link>
        </div>
    );
}

export default Note