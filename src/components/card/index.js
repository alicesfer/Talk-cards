import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./card.css";
import firebase from "../../config/firebase";
import 'firebase/compat/auth';
import 'firebase/compat/storage';



function GerarCard({id, img, titulo, detalhes, visualizacoes}){
    
    const storage = firebase.storage();
    const [urlImagem, setUrlImagem] = useState();

    useEffect(()=>{
        if(img.split('.').pop() !== 'null' && img.split('.').pop() === 'jpg' ){
            storage.ref(`imagens/${img}`).getDownloadURL().then(url => setUrlImagem(url));
        }
        else{
            setUrlImagem("https://fakeimg.pl/200x200");
        }// eslint-disable-next-line
    }, []);
    
    return(

        <div class="col-sm-4 col-lg-3 col-xl-2 mb-3 mb-sm-0">
            <div class="card mb-3">
                <img src={urlImagem} className="card-img-top img-fluid img-cartao" alt="Imagem do Card"/>
                <div class="card-body">
                    <h5 class="card-title">{titulo}</h5>
                    <p class="card-text">{detalhes}</p>
                    <Link to={/detalhescard/ + id} className="btn btn-sm btn-detalhes">+ Detalhes</Link>
                </div>
            </div>
        </div>        
    )
}

export default GerarCard;