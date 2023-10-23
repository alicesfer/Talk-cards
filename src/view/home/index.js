import React, { useState, useEffect } from "react";
import "./home.css";
import firebase from '../../config/firebase'
import 'firebase/compat/firestore';
import Navbar from '../../components/navbar/'
import Card from "../../components/card";
import { useSelector } from "react-redux";

const db = firebase.firestore();

function Home(){
    
    const [cards, setCards] = useState([]);
    let listaCards = [];
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    useEffect(() => {
        db.collection('cards').where('usuario', '==', usuarioEmail).get().then(async (resultado) => {
            await resultado.docs.forEach(doc => {
                listaCards.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setCards(listaCards);
        });// eslint-disable-next-line
    }, []);
    return(
        <>
        <Navbar/>
        <div className="p-3">
            <div className="row">
                {cards.map(item => <Card id={item.id} img={item.id+`.${item.foto}`} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes}/>)}
            </div>
        </div>
        </>
    )
}

export default Home;
