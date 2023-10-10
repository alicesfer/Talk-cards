import React from 'react';
import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
 

/*PÁGINAS*/
import Login from './view/login/';
import NovoUsuario from './view/usuario-novo/';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' Component={Login}/>
        <Route exact path='/novousuario' Component={NovoUsuario}/>
      </Routes>
    </Router>
  );
}

export default App;
