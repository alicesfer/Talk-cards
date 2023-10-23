import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./evento-card.css";
import firebase from "../../config/firebase";
import 'firebase/compat/auth';
import 'firebase/compat/storage';



function EventoCard({key, myKey, img, titulo, detalhes, visualizacoes}){
    
    const storage = firebase.storage();
    const [urlImagem, setUrlImagem] = useState();

    useEffect(()=>{
        if(img.split('.').pop() !== 'null' && img.split('.').pop() === 'jpg' ){
            storage.ref(`imagens/${img}`).getDownloadURL().then(url => setUrlImagem(url));
        }
        else{
            setUrlImagem("https://fakeimg.pl/70x200");
        }
    }, []);
    
    return(
        <div className="col-md-3 col-sm-2">
            <img src={urlImagem} className="card-img-top img-fluid rounded img-cartao" alt="Imagem do Evento"/>
            <div className="card-body">
                <h5>{titulo}</h5>
                <p className="card-text text-justify">
                {detalhes}
                </p>
                <div className="row rodape-card d-flex align-items-center">
                    <div className="col-6">
                        <Link to='/' className="btn btn-sm btn-detalhes">+ Detalhes</Link>
                    </div>
                    <div className="col-6 text-end">
                        <i className="fa-solid fa-eye"></i> <span>{visualizacoes}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventoCard;