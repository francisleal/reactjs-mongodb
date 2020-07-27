import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import MenuLateral from './MenuLateral';
import Dashboard from './Dashboard';
import Alert from '../Alert';

function Note() {

    const [lists, setLists] = useState([]);

    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [mensagemAlert, setMensagemAlert] = useState('');
    
    const Authorization = localStorage.getItem('token');

    const history = useHistory();

    useEffect(() => {      
        handleList(Authorization, history);
    }, [Authorization, history]);

    async function handleList(Authorization, history) {
        try {
            const response = await api.get('notas', { headers: { Authorization } });
            setLists(response.data.noteUserLogged);
        } catch (error) {
            history.push('/');
        }
    }

    async function handleSaveNote(e) {
        e.preventDefault();

        let dados = { title, description, type };

        try {
            await api.post('notas', dados, { headers: { Authorization } });

            setMensagemAlert(`${title} - salvo com sucesso`);

            limparCampo();
        } catch (error) {
            setMensagemAlert('Não foi possível salvar a notificação');
        }
    }

    const logout = () => {
        localStorage.clear();
        history.push('/');
    }

    const closeAdd = () => {
        const form = document.querySelector('aside');
        form.classList.add("close");
        form.classList.remove('show')

    }

    const openAdd = () => {
        const form = document.querySelector('aside');
        form.classList.add('show');
        form.classList.remove('close')
    }

    const limparCampo = () => {
        setTitle('')
        setDescription('')
        handleList(Authorization, history);
    }

    return (
        <div className='note'>

            <Alert msg={mensagemAlert}></Alert>

            <div className="add" onClick={openAdd}>
                <span>+</span>
            </div>

            <header>
                <div className='titulo'>
                    <h1>Save note <span>Notificações</span></h1>
                </div>
                <div className='sair' onClick={logout}>Sair</div>
            </header>

            <section>
                <MenuLateral
                    closeProps={closeAdd}

                    onSubmitProps={handleSaveNote}

                    titleValue={title}
                    titleChange={e => setTitle(e.target.value)}

                    descriptionValue={description}
                    descriptonChange={e => setDescription(e.target.value)}

                    linkChange={e => setType(e.target.value)}
                ></MenuLateral>

                <Dashboard listas={lists} />
            </section>
        </div>
    );
}

export default Note;