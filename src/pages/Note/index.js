import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import Alert from '../Alert';

function Note() {

    const [lists, setLists] = useState([]);

    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [mensagemAlert, setMensagemAlert] = useState('');

    const usuario = localStorage.getItem('usuario');
    const Authorization = localStorage.getItem('token');

    const history = useHistory();

    useEffect(() => {
        async function handleList() {
            try {
                const response = await api.get('notas', { headers: { Authorization } });
                setLists(response.data.noteUserLogged);
            } catch (error) {
                history.push('/');
            }
        }
        handleList();
    }, [Authorization, usuario, history]);

    async function refesh() {
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

    async function handleDelete(id) {
        try {
            await api.delete(`notas/${id}`, { headers: { Authorization } });
            refesh();
        } catch (error) {
            setMensagemAlert('erro ao deletar o arquivo');
        }
        document.querySelector('main').classList.remove("fullpage");
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
        refesh();
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
                <aside className='aside close'>
                    <span className='close-form' onClick={closeAdd}>X</span>
                    <form id="form" onSubmit={handleSaveNote}>
                        <h4>Adicionar <span>notificação</span></h4>
                        <div className="form-div">
                            <input
                                type='text'
                                placeholder='Titulo'
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-div">
                            <textarea
                                placeholder='Descrição'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="form-div radio">
                            <p>Tipo</p>
                            <input
                                type="radio"
                                id="link"
                                name="type"
                                value="link"
                                onChange={e => setType(e.target.value)}
                            />
                            <label for="link">Link</label>

                            <input
                                type="radio"
                                id="anotacao"
                                name="type"
                                value="anotacao"
                                onChange={e => setType(e.target.value)}
                            />
                            <label for="anotacao">Anotação</label>
                        </div>

                        <div className="form-div">
                            <button>Salvar</button>
                        </div>
                    </form>
                </aside>

                <main>
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

                {/* <Link to="/">Voltar</Link> */}
            </section>
        </div>
    );
}

export default Note