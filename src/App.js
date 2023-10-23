import React from 'react';
import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import store from '../src/store/'; 
import { Provider } from 'react-redux';

/*PÁGINAS*/
import Login from './view/login/';
import NovoUsuario from './view/usuario-novo/';
import Home from './view/home/';
import UsuarioRecuperarSenha from './view/usuario-recuperar-senha/';
import CriarCard from './view/criar-card/';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path='/' Component={Home}/>
          <Route exact path='/novousuario' Component={NovoUsuario}/>
          <Route exact path='/login' Component={Login}/>
          <Route exact path='/usuariorecuperarsenha' Component={UsuarioRecuperarSenha}/>
          <Route exact path='/criarcard' Component={CriarCard}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
