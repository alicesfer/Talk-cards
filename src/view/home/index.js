import React, { useState, useEffect } from "react";
import "./home.css";
import firebase from '../../config/firebase';
import {Link} from 'react-router-dom';
import 'firebase/compat/firestore';
import Navbar from '../../components/navbar/';
import Card from "../../components/card";
import { useSelector } from "react-redux";

const db = firebase.firestore();

function Home(){

    const [cards, setCards] = useState([]);
    const [modalBody, setModalBody] = useState([]);
    const [carregando, setCarregando] = useState();
    const [msg, setMsg] = useState();
    const [modalTitle, setModalTitle] = useState([]);
    const [currentModalId, setCurrentModalId] = useState([]);

    const updateModal = (title, description, imgsrc, id)=>{
        setModalTitle(title);
        setCurrentModalId(id);
        setModalBody(<>
        <div className="card-body w-100 border-bottom">
            <p className="card-text">{description}</p>
        </div>
        <img src={imgsrc} className="img-fluid img-Modal" alt={title}/>
        </>
        );
    }
    let listaCards = [];
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    const deleteCard = async(id)=>{
        setMsg('Excluindo card...');
        setCarregando(1);
        await db.collection('cards').doc(id).delete().then(()=>{
            setMsg('Card excluído com sucesso!');
            setTimeout(()=>{window.location.reload()}, 2000);
        }).catch((error) => {console.log(error)});
    }

    useEffect(() => {
        db.collection('cards').where('usuario', '==', usuarioEmail).get().then(async (resultado) => {
            await resultado.docs.forEach(doc => {
                listaCards.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            setCards(listaCards);
        });// eslint-disable-next-line
    }, []);

    var filtrar = (categoria) => {
        const cards = document.querySelector('.userContent').getElementsByClassName("card");
        const buttons = document.querySelector('.buttons').getElementsByClassName("btn");
        for(let a = 0; a < buttons.length; a++){
            if(buttons[a].innerText.split(' ')[0] === categoria){
                buttons[a].classList.add("btn-selected");
            }
            else{
                buttons[a].classList.remove("btn-selected");
            }
        }
        for (let i = 0; i < cards.length; i++) {
            if(cards[i].getAttribute('category') === categoria){
                cards[i].classList.remove("d-none");
            }
            else{
                cards[i].classList.add("d-none");
            }
        }
    }
    
    var limparFiltro = () => {
        const cards = document.getElementsByClassName("card");
        const buttons = document.querySelector('.buttons').getElementsByClassName("btn");
        for (var o = 0; o < buttons.length; o++) {
            buttons[o].classList.remove("btn-selected");
        }
        for (var i = 0; i < cards.length; i++) {
            cards[i].classList.remove("d-none");
        }
    }

    return(
        <>
        <Navbar/>
        <div className="modal fade" id="cardModal" tabIndex="-1" aria-labelledby="cardModalLabel">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title lead fs-5" id="cardModalLabel">
                        {
                        modalTitle.length !== 0 ? modalTitle
                        : <>Carregando...</>
                        }
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div className="modal-body p-0 d-flex justify-content-center flex-wrap">
                        {
                        modalBody.length !== 0 ? <div className="card w-100 border-white">{modalBody}</div>
                        : <>...</>
                        }
                    </div>
                    <div className="modal-footer justify-content-between">
                        <button type="button" className="btn btn-danger" data-bs-target="#modalExcluir" data-bs-toggle="modal">Excluir card</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal fade" id="modalExcluir" aria-hidden="true" aria-labelledby="modalExcluirLabel" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalExcluirLabel">
                        {carregando ? <>{msg}</>
                        : <>Excluir card</>
                        }
                        </h5>
                        {carregando ? null
                        : <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        }
                    </div>
                    <div className="modal-body text-center">

                        {carregando ? <> {msg === "Card excluído com sucesso!" ? null
                        : <div className="mx-auto spinner-border text-danger" role="status"></div>}
                            
                        </>
                        : <>Você tem certeza que quer excluir o card "{modalTitle}"?<br/>Essa ação é irreversível.</>
                        }
                        
                        
                    </div>
                    {carregando ? null
                    :
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-target="#cardModal" data-bs-toggle="modal" data-bs-dismiss="modal">Voltar</button>
                        <button type="submit" className="btn btn-danger" onClick={()=>{deleteCard(currentModalId)}}>Excluir card</button>
                    </div>
                    }

                </div>
            </div>
        </div>
        <div className="d-flex justify-content-center pb-3">
            {
            useSelector(state => state.usuarioLogado) > 0 ?
            
            <div className="userContent col-12 text-center">
            {
            cards.length < 1 ? <>
            <h3 className="mt-4">Você não possui ainda nenhum card! &#128546;</h3>
            <h4><Link to='/criarcard'>Cadastre um card!</Link></h4>
                </>
                : 
                <>
                <h2 className="pt-3 position-relative">Aqui estão seus cards!</h2>

                <div className="buttons">
                    <h3>Filtrar por tipo</h3>
                    
                    {cards.filter((a) => a.tipo === 'Comida').length !== 0 ? <button className="btn btn-detalhes btn-comida" onClick={()=>{filtrar('Comida')}} type="button">Comida <span className="ms-1 badge">{cards.filter((a) => a.tipo === 'Comida').length}</span></button>
                    : <button className="btn btn-detalhes btn-comida disabled text-white" type="button">Comida <span className="ms-1 badge">0</span></button>
                    }
                    
                    {cards.filter((a) => a.tipo === 'Emergências').length !== 0 ? <button className="btn btn-detalhes btn-emergencias" onClick={()=>{filtrar('Emergências')}} type="button">Emergências <span className="ms-1 badge">{cards.filter((a) => a.tipo === 'Emergências').length}</span></button>
                    : <button className="btn btn-detalhes btn-emergencias disabled text-white" type="button">Emergências <span className="ms-1 badge">0</span></button>
                    }

                    {cards.filter((a) => a.tipo === 'Outros').length !== 0 ? <button className="btn btn-detalhes btn-outros" onClick={()=>{filtrar('Outros')}} type="button">Outros <span className="ms-1 badge">{cards.filter((a) => a.tipo === 'Outros').length}</span></button>
                    : <button className="btn btn-detalhes btn-outros disabled text-white" type="button">Outros <span className="ms-1 badge">0</span></button>
                    }
                    <button className="btn btn-detalhes btn-limpar" onClick={()=>{limparFiltro()}} type="button">Limpar</button>
                </div>

                {cards.map(item => <Card key={item.id} id={item.id} img={item.foto} titulo={item.titulo} descricao={item.descricao} props={updateModal} tipo={item.tipo} typeButton="vercard"/>)}
                <h4 className="mt-3"><Link to='/criarcard'>Cadastre um card!</Link></h4>
                </>
                
                }
 
            </div>
            :
            <div className="p-3 userNotContent">
                <h1>Você não está logado! &#128546;</h1>
                <h4><Link to='/login'>Logue-se</Link> para ver seus cards!</h4>
            </div>
            }
        </div>
        </>
    );
};

export default Home;
