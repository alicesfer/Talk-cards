import React, { useState } from "react";
import firebase from '../../config/firebase';
import 'firebase/compat/auth';

import './usuario-novo.css';

function NovoUsuario(){

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();

    function cadastrar(){

        setCarregando(1);

        setMsgTipo(null);
        
        if(!email || !senha){
            setMsgTipo('erro')
            setMsg('Você precisa informar o e-mail e senha para fazer o cadastro.')
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, senha).then(resultado =>{
            setMsgTipo('sucesso')
            setCarregando(0);
        }).catch(erro => {
            setCarregando(0);
            setMsgTipo('erro')
            switch(erro.message) 
            {
            case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
                setMsg('A senha deve ter pelo menos 6 caracteres!');  
                break;
            case 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).':
                setMsg('Este e-mail já está sendo utilizado por outro usuário!'); 
                break; 
            case 'Firebase: The email address is badly formatted. (auth/invalid-email).':
                setMsg('O formato do seu email é inválido!'); 
                break;
             default:
                setMsg('Não foi possível cadastrar. Tente novamente mais tarde!');
                break; 
            }
        })
    }


    return (
        <div className="form-cadastro">
            <form className="text-center form-login mx-auto mt-5">
                <h1 className="h3 mb-3 text-black fw-bold">Cadastro</h1>

                <div className="form-floating">
                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" id="floatingInput" placeholder="E-mail"/>
                    <label for="floatingInput">Email</label>
                </div>

                <div className="form-floating">
                    <input onChange={(e) => setSenha(e.target.value)} type="password" className="form-control my-2" id="floatingPassword" placeholder="Senha"/>
                    <label for="floatingPassword">Senha</label>
                </div>




                {
                    carregando ? <div class="spinner-border text-danger" role="status"></div>
                    : <button onClick={cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro w-100">Cadastrar</button>
                }

                <div className="msg-login text-black text-center my-5">
                {msgTipo === 'sucesso' && <span><strong>WoW!</strong> Usuário cadastrado com sucesso &#128526;</span>}
                {msgTipo === 'erro' && <span><strong>Ops!</strong> {msg} &#128546;</span>}
                </div>

            </form>
        </div>
    )
}


export default NovoUsuario;