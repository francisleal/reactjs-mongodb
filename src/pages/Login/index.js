import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api'

import './styles.css';
import Formulario from './Formulario';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handdleLogin(e) {
        e.preventDefault();

        let data = { email, password }

        try {
            const response = await api.post('auth/authenticate', data);

            localStorage.setItem('token', `Bearer ${response.data.token}`);

            history.push('/note')

            console.log('response ', response.data)
        } catch (err) {
            alert('User not found');
        }

        console.log(data)
    }

    return (
        <section className="login-container">
            <Formulario
                onSubmitProps={handdleLogin}

                valorEmail={email}
                changeEmail={e => setEmail(e.target.value)}

                valorPassword={password}
                changePassoword={e => setPassword(e.target.value)}
            >
            </Formulario>
        </section>
    );
}

export default Login