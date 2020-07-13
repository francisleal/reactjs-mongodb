import React, { useEffect, useState } from 'react';
import {  useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

function Note() {

    const [lists, setLists] = useState([]);

    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const Authorization = localStorage.getItem('token');

    const [salvar, setSalvar] = useState(false);

    const history = useHistory();

    useEffect(() => {
        async function handleList() {
            try {
                const response = await api.get('notas', { headers: { Authorization } });
                setLists(response.data.note)
            } catch (error) {
                alert('erro ao carregar os usuários');
            }
        }
        handleList();
    }, [Authorization, salvar]);

    async function handleSaveNote(e) {
        e.preventDefault();

        let dados = { title, description, type };

        try {
            await api.post('notas', dados, { headers: { Authorization } });
            setSalvar(true);
            alert('enviado com sucesso');
        } catch (error) {
            alert('Não foi possível salvar a notificação');
        }
    }

    async function handleDelete(id) {
        try {
            await api.delete(`notas/${id}`, { headers: { Authorization } });
            setLists(lists.filter(list => list._id !== id));
        } catch (error) {
            alert('erro ao deletar o arquivo');
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

    return (
        <div className='note'>

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
                    <form onSubmit={handleSaveNote}>
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
                                <div className='card' key={list._id}>
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