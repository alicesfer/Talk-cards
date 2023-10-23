import React, { useState, useEffect } from "react";
import "./home.css";
import { useSelector } from "react-redux";
import firebase from '../../config/firebase'
import 'firebase/compat/firestore';
import Navbar from '../../components/navbar/'
import EventoCard from "../../components/evento-card";

const db = firebase.firestore();

function Home(){
    
    const [eventos, setEventos] = useState([]);
    let listaeventos = [];



    useEffect(() => {
        db.collection('eventos').get().then(async (resultado) => {
            await resultado.docs.forEach(doc => {
                listaeventos.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setEventos(listaeventos);
        });
    }, []);
    return(
        <>
        <Navbar/>
        <div className="mx-4">
            <h1>{useSelector(state => state.usuarioEmail) }</h1>
            <h1>Logado: {useSelector(state => state.usuarioLogado) }</h1>
            <div className="row">
                {eventos.map(item => <EventoCard key={item.id} myKey={item.id} img={item.id+`.${item.foto}`} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes}/>)}
            </div>
        </div>
        </>
    )
}

export default Home;
