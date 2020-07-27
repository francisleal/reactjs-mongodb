import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import Alert from '../Alert';

function Dashboard(props) {

    const [lists, setLists] = useState([]);
    const [mensagemAlert, setMensagemAlert] = useState('');

    const Authorization = localStorage.getItem('token');
    const history = useHistory();

    useEffect(() => {
        setLists(props.listas);
    }, [props.listas])

    async function refesh() {
        try {
            const response = await api.get('notas', { headers: { Authorization } });
            setLists(response.data.noteUserLogged);
        } catch (error) {
            history.push('/');
        }
    }

    async function handleDelete(id) {
        try {
            await api.delete(`notas/${id}`, { headers: { Authorization } });
            refesh();
        } catch (error) {
            setMensagemAlert('erro ao deletar o arquivo');
        }
        document.querySelector('main').classList.remove("fullpage");
    }

    const openNote = (idNota) => {
        const main = document.querySelector('main');
        main.classList.toggle("fullpage");

        const mainFulpage = document.querySelector('main.fullpage');

        if (mainFulpage) {
            setLists(lists.filter(list => list._id === idNota));
        } else {
            refesh();
        }
    }

    return (
        <main>
            <Alert msg={mensagemAlert}></Alert>
            
            <div className='card-container'>
                {
                    lists.map(list => (
                        <div className='card' key={list._id} onDoubleClick={() => openNote(list._id)}>
                            <div className='card-header'>
                                <span>{list.title}</span>
                                <span className='close' onClick={() => handleDelete(list._id)}>x</span>
                            </div>
                            <div className='card-body'>
                                {list.description}
                            </div>
                        </div>
                    ))
                }
            </div>
        </main>
    )
}

export default Dashboard;