import React, { useState } from "react";
import "./usuario-recuperar-senha.css";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Navbar from '../../components/navbar'
import firebase from '../../config/firebase';
import 'firebase/compat/auth';
import Logo from '../LOgo.svg'

function UsuarioRecuperarSenha(){

    const [email, setEmail] = useState();
    const [carregando, setCarregando] = useState();
    const [msgTipo, setMsgTipo] = useState();

    function recuperarSenha(){
        setMsgTipo(null);
        setCarregando(1);
        firebase.auth().sendPasswordResetEmail(email).then(resultado =>{
            setMsgTipo('sucesso');
            setCarregando(0);
        }).catch(erro => {
            setMsgTipo('erro');
            setCarregando(0);
        });
    };
    
    return(
        <>
        {useSelector(state => state.usuarioLogado) > 0 ? <Navigate to="/"/> : null}
        <Navbar/>
        <div className="d-flex align-items-center my-2 py-lg-5">
        <form className="text-center form-login mx-auto" onSubmit={e => e.preventDefault()} >
            <div className="text-center mb-4">
            <img className="mb-4" src={Logo} alt="" width="150" height="150"/>
            <h1 className="h3 mb-3 fw-normal fw-bold">Recuperar senha</h1>
          </div>
            <div className="form-floating">
                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email"/> 
                <label htmlFor="floatingInput">Email</label>
            </div>
            {
            carregando ? <div className="mx-auto spinner-border text-danger mt-3" role="status"></div>
            : <button type="button" className="btn btn-lg btn-block mt-3 btn-login w-100 text-white" onClick={recuperarSenha}>Enviar</button>
            }
            <div className="msg-login text-center my-3">
              {msgTipo === 'sucesso' && <span><strong>Legal!</strong> Caso exista uma conta associada a este e-mail, foi enviado um link para mudança de senha! &#128526;</span>}
              {msgTipo === 'erro' && <span><strong>Ops!</strong> Verifique se o e-mail está correto!</span>}
            </div>
            </form>
            </div>
        </>
    );
};

export default UsuarioRecuperarSenha;