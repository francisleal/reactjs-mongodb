import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';
import Formulario from './Formulario';
import Alert from '../Alert';

function Register(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [mensagemError, setMensagemError] = useState('');

    const usuarioLogado = localStorage.getItem('usuario');
    const history = useHistory();

    useEffect(() => {
        if (usuarioLogado) {
            history.push('/note');
        }
    });

    async function handleRegister(e) {
        e.preventDefault();

        let dados = { name, email, password };

        let data = {
            name: dados.name.trim(),
            email: dados.email.trim(),
            password: dados.password
        }

        if (password === confirmPassword) {

            const url = 'http://localhost:3333/auth/register';

            const settings = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            };

            try {
                const fetchResponse = await fetch(url, settings);
                const result = await fetchResponse.json();

                if (result.error)
                    setMensagemError('Não foi possivel criar sua conta');

                return result;
            } catch (err) {
                setMensagemError('Não foi possivel criar sua conta');
            }

        } else {
            setMensagemError('As senhas estão diferentes');
        }

        if (mensagemError !== '') {
            setMensagemError('')
        }
    }

    return (
        <div className="register-container">
            <Alert msg={mensagemError} />

            <Formulario
                onSubmitProps={handleRegister}

                valorName={name}
                changeName={e => setName(e.target.value)}

                valorEmail={email}
                changeEmail={e => setEmail(e.target.value)}

                valorPassword={password}
                changePassoword={e => setPassword(e.target.value)}

                confirmPassword={confirmPassword}
                changeConfirmPassoword={e => setConfirmPassword(e.target.value.trim())}
            ></Formulario>
        </div>
    )
}

export default Register;