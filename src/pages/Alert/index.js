import React, { useEffect, useState } from 'react';

import './style.css';

function Alert(props) {

    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        setMensagem(props.error);

        setTimeout(() => setMensagem(''), 3000);

    }, [props.error]);

    return (
        <>
            {mensagem &&
                <div className="alert-msg">
                    <p>{mensagem}</p>
                </div>
            }
        </>
    )
}

export default Alert;