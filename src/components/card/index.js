import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./card.css";
import firebase from "../../config/firebase";
import 'firebase/compat/auth';
import 'firebase/compat/storage';



function GerarCard({id, img, titulo, detalhes, visualizacoes}){

    const storage = firebase.storage();
    const [urlImagem, setUrlImagem] = useState();
    const [carregando, setCarregando] = useState(1);

    useEffect(()=>{
        if(img.split('.').pop() !== 'null' && img.split('.').pop() === 'png' ){
            storage.ref(`imagens/${img}`).getDownloadURL().then(url => {
                setUrlImagem(url);
                setTimeout(()=>{
                setCarregando(0);
                },1000)
            });
        }
        else{
            setUrlImagem("https://fakeimg.pl/400");
            setTimeout(()=>{setCarregando(0)},2000)
        }// eslint-disable-next-line
    }, []);
    
    return(

        <div className="col-sm-4 col-lg-3 col-xl-2 mb-3 mb-sm-0">
            <div className="card mb-3">
                {
                carregando ? <div className='row'><div className="mx-auto spinner-border text-danger my-5" role="status"></div></div>
                : <img src={urlImagem} className="card-img-top img-fluid img-cartao" alt="Imagem do Card"/>
                }

                <div className="card-body">
                    <h5 className="card-title">{titulo}</h5>
                    <p className="card-text">{detalhes}</p>
                    <Link to={/detalhescard/ + id} className="btn btn-sm btn-detalhes">+ Detalhes</Link>
                </div>
            </div>
        </div>
    )
}

export default GerarCard;