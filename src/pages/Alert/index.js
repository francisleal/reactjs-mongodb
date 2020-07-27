import React, { useEffect, useState } from 'react';

import './style.css';

function Alert(props) {

    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        setMensagem(props.msg);

        setTimeout(() => setMensagem(''), 3000);

    }, [props.msg]);

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