import React from 'react';

function MenuLateral(props) {
    return (
        <aside className='aside close'>
            <span className='close-form' onClick={props.closeProps}>X</span>
            <form id="form" onSubmit={props.onSubmitProps}>
                <h4>Adicionar <span>notificação</span></h4>
                <div className="form-div">
                    <input
                        type='text'
                        placeholder='Titulo'
                        value={props.titleValue}
                        onChange={props.titleChange}
                    />
                </div>
                <div className="form-div">
                    <textarea
                        placeholder='Descrição'
                        value={props.descriptionValue}
                        onChange={props.descriptonChange}
                    ></textarea>
                </div>
                <div className="form-div radio">
                    <p>Tipo</p>
                    <input
                        type="radio"
                        id="link"
                        name="type"
                        value="link"
                        onChange={props.linkChange}
                    />
                    <label htmlFor="link">Link</label>

                    <input
                        type="radio"
                        id="anotacao"
                        name="type"
                        value="anotacao"
                        onChange={props.linkChange}
                    />
                    <label htmlFor="anotacao">Anotação</label>
                </div>

                <div className="form-div">
                    <button>Salvar</button>
                </div>
            </form>
        </aside>
    )
}

export default MenuLateral;