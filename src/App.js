import React from 'react';
import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
 

/*PÁGINAS*/
import Login from './view/login/';
import NovoUsuario from './view/usuario-novo/';
import Home from './view/home/';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' Component={Login}/>
        <Route exact path='/novousuario' Component={NovoUsuario}/>
        <Route exact path='/' Component={Home}/>
      </Routes>
    </Router>
  );
}

export default App;
