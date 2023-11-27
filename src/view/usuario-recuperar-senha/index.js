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
    const [msg, setMsg] = useState();

    function recuperarSenha(){
        setMsg(null);
        setCarregando(1);
        firebase.auth().sendPasswordResetEmail(email).then(resultado =>{
            setCarregando(0);
            setMsg('Caso a conta exista, foi enviado um link ao seu e-mail para você redefinir sua senha! 😉');
        }).catch(erro => {
            setCarregando(0);
            setMsg('Verifique se o e-mail está correto.');
        });
    };
    
    return(
        <>
        {useSelector(state => state.usuarioLogado) > 0 ? <Navigate to="/"/> : null}
        <Navbar/>
        <div className="align-items-center my-2 py-lg-5">
        <form className="text-center form-login mx-auto" onSubmit={e => e.preventDefault()} >
            <img className="mb-4" src={Logo} alt="" width="150" height="150"/>
            <h3 className="mb-3 fw-bold">Recuperar senha</h3>
            <div className="form-floating">
                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email"/> 
                <label htmlFor="floatingInput">Email</label>
            </div>
            <div className="msg my-4 text-center">
                <span>{msg}</span>
            </div>{
            carregando ? <div className="mx-auto spinner-border text-danger mt-3" role="status"></div>
            : <button type="button" className="btn btn-detalhes w-100" onClick={recuperarSenha}>Enviar</button>
            }
            </form>
            </div>
        </>
    );
};

export default UsuarioRecuperarSenha;