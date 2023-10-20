import React, { useState, useEffect } from "react";
import { Link, Navigate } from 'react-router-dom';
import "./evento-card.css";

import Navbar from '../navbar/'

import firebase from '../../config/firebase';
import 'firebase/compat/auth';

import { useSelector, useDispatch } from "react-redux";


function EventoCard(){
    return(
        <div className="col-md-3 col-sm-2">
            <img src="https://fakeimg.pl/70x200" className="card-img-top img-fluid rounded img-cartao" alt="Imagem do Evento"/>
            <div className="card-body">
                <h5>Título do Evento</h5>
                <p className="card-text text-justify">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>

                <div className="row rodape-card d-flex align-items-center">
                    <div className="col-6">
                        <Link to='/' className="btn btn-sm btn-detalhes">+ Detalhes</Link>
                    </div>
                    <div className="col-6 text-end">
                        <i className="fa-solid fa-eye"></i> <span>2023</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventoCard;