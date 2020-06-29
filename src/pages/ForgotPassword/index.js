import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

function ForgotPassword() {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');

    const [inputToken, setInputToken] = useState(false);

    function handleSendEmail(e) {
        e.preventDefault();

        if (!inputToken) {
            console.log({ email });

            setInputToken(true);
        } else {
            console.log({ token });

            history.push('/');
        }

        console.log('inputToken ', inputToken);
    }

    return (
        <div className="forgot-password-container">

            <form className="form" onSubmit={handleSendEmail}>
                <div className="form-div">
                    <h1>Save note <span>Esqueci minha senha</span></h1>
                </div>

                {!inputToken ?
                    < div className="form-div">
                        <input
                            required
                            type="email"
                            name="email"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
                    </div>
                    :
                    <div className="form-div">
                        <input
                            required
                            type="text"
                            name="token"
                            placeholder="Digite seu token"
                            value={token}
                            onChange={e => setToken(e.target.value)}
                        />
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
                    </div>
                }

                <div className="form-div">
                    <button >Enviar</button>
                </div>

                <div className="form-div">
                    <Link to="/">Voltar</Link>
                </div>

            </form>
        </div >
    );
}

export default ForgotPassword