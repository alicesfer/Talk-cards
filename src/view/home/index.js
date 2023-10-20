import React, { useState } from "react";
import "./home.css";
import {Link} from 'react-router-dom';
import Navbar from '../../components/navbar/'
import EventoCard from "../../components/evento-card";
import { useSelector } from "react-redux";


function Home(){
    return(
        <>
        <Navbar/>
        <div className="mx-4">
            <h1>{useSelector(state => state.usuarioEmail) }</h1>
            <h1>Logado: {useSelector(state => state.usuarioLogado) }</h1>
            <div className="row">
                <EventoCard/>
            </div>
        </div>
        </>
    )
}

export default Home;
