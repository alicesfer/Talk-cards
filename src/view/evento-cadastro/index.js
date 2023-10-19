import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./evento-cadastro.css";

import Navbar from '../../components/navbar'

import firebase from '../../config/firebase';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';



function EventoCadastro(){

    const [msgTipo, setMsgTipo] = useState();
    const [titulo, setTitulo] = useState();
    const [tipo, setTipo] = useState();
    const [detalhes, setDetalhes] = useState();
    const [data, setData] = useState();
    const [hora, setHora] = useState();
    const [foto, setFoto] = useState();
    const [carregando, setCarregando] = useState();

    const storage = firebase.storage();
    const db = firebase.firestore();
    const usuarioEmail = useSelector(state => state.usuarioEmail)


    function cadastrar(){
        setMsgTipo(null);
        setCarregando(1);
        storage.ref(`imagens/${foto.name}`).put(foto).then(()=>{
                db.collection('eventos').add({
                    titulo: titulo,
                    tipo: tipo,
                    detalhes: detalhes,
                    data: data,
                    hora: hora,
                    usuario: usuarioEmail,
                    visualizacoes: 0,
                    foto: foto.name,
                    publico: 1,
                    criacao: new Date()
                });
                setMsgTipo('sucesso');
                setCarregando(0)
            }
        ).catch(erro=>{
            console.log(erro)
            setMsgTipo('erro');
            setCarregando(0)
        })
    }


    return(
        <>
        <Navbar/>
        <div className="col-12 p-3">
            <div className="row text-center">
                <h3 className="mx-auto fw-bold">Novo Evento</h3>
            </div>
            <form>
                <div className="form-group">
                    <label>Título: </label>
                    <input onChange={(e) => setTitulo(e.target.value)} type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Tipo do Evento: </label>
                    <select defaultValue={'-- Selecione um tipo --'} onChange={(e) => setTipo(e.target.value)} className="form-control">
                        <option disabled>-- Selecione um tipo --</option>
                        <option>Festa</option>
                        <option>Teatro</option>
                        <option>Show</option>
                        <option>Evento</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Descrição do Evento</label>
                    <textarea onChange={(e) => setDetalhes(e.target.value)} className="form-control" rows={3}/>
                </div>
                <div className="form-group row">
                    <div className="col-6">
                        <label>Data</label>
                        <input onChange={(e) => setData(e.target.value)} type="date" className="form-control"/>
                    </div>
                    <div className="col-6">
                        <label>Hora</label>
                        <input onChange={(e) => setHora(e.target.value)} type="time" className="form-control"/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Upload da Foto:</label>
                    <input onChange={(e) => setFoto(e.target.files[0])} type="file" className="form-control"/>
                </div>
                <div className="row">
                    {
                    carregando ? <div class="mx-auto spinner-border text-danger mt-3" role="status"></div>
                    :<button onClick={cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro w-100">Publicar Evento</button>
                    }
                </div>
                
            </form>

            <div className="msg-login text-center">
            {msgTipo === 'sucesso' && <span><strong>WoW!</strong> Evento publicado! &#128526;</span>}
            {msgTipo === 'erro' && <span><strong>Ops!</strong> Não foi possível publicar o evento! &#128546;</span>}
          </div>
        </div>
        </>
        
    )
}

export default EventoCadastro;