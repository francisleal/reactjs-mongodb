import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api'

import './styles.css';
import Formulario from './Formulario';
import Alert from '../Alert';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensagemAlert, setMensagemAlert] = useState('');

    const usuarioLogado = localStorage.getItem('usuario');

    const history = useHistory();

    useEffect(() => {
        if (usuarioLogado) {
            history.push('/note');
        }
    });

    async function handdleLogin(e) {
        e.preventDefault();

        let data = { email, password }

        try {
            const response = await api.post('auth/authenticate', data);

            localStorage.setItem('token', `Bearer ${response.data.token}`);
            localStorage.setItem('usuario', response.data.user._id);

            history.push('/note');

            console.log('response ', response)
        } catch (err) {
            setMensagemAlert('Não foi possível realizar o login');
        }
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

            <Alert msg={mensagemAlert} />
        </section>
    );
}

export default Login