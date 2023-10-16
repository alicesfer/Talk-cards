import React, { useState } from "react";
import "./login.css";
import {Link} from 'react-router-dom';

import Navbar from '../../components/navbar'
import Logo from '../LOgo.svg'

import firebase from '../../config/firebase';
import 'firebase/compat/auth';

function Login() {

  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [msgTipo, setMsgTipo] = useState();

  function logar(){
    firebase.auth().signInWithEmailAndPassword(email, senha).then(resultado =>{
      setMsgTipo('sucesso')
    }).catch(erro =>{
      setMsgTipo('erro')
    })
  }

  return (
    <>
      <Navbar/>
      <div className="login-content d-flex align-items-center">
        <form className="form-signin mx-auto">
          <div className="text-center mb-4">
            <img className="mb-4" src={Logo} alt="" width="150" height="150"/>
            <h1 className="h3 mb-3 fw-normal text-white fw-bold">Login</h1>
          </div>

          <div className="form-floating">
            <input onChange={(e) => setEmail(e.target.value) } type="email" className="form-control my-2" id="floatingInput" placeholder="E-mail"/>
            <label for="floatingInput">Email</label>
          </div>

          <div className="form-floating">
            <input onChange={(e) => setSenha(e.target.value) } type="password" className="form-control my-2" id="floatingPassword" placeholder="Senha"/>
            <label for="floatingPassword">Senha</label>
          </div>

          <button onClick={logar} className="btn w-100 btn-login" type="button">Logar</button> 

          <div className="msg-login text-white text-center my-5">
            {msgTipo === 'sucesso' && <span><strong>WoW!</strong> Você está conectado! &#128526;</span>}
            {msgTipo === 'erro' && <span><strong>Ops!</strong> Verifique se o usuário ou a senha estão corretos! &#128546;</span>}
          </div>

          <div className="opcoes-login mt-5 text-center">
            <a href="#" className="mx-2">Recuperar Senha</a>
            <span className="text-white">&#9733;</span>
            <Link to="novousuario" className="mx-2">Quero Cadastrar</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
