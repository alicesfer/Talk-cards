import React from 'react';
import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

/*PÁGINAS*/
import Login from './view/login';
import NovoUsuario from './view/usuario-novo';
import Home from './view/home';
import UsuarioRecuperarSenha from './view/usuario-recuperar-senha';
import CriarCard from './view/criar-card';

const App: React.FC = () => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/novousuario' Component={NovoUsuario}/>
          <Route path='/login' Component={Login}/>
          <Route path='/usuariorecuperarsenha' Component={UsuarioRecuperarSenha}/>
          <Route path='/criarcard' Component={CriarCard}/>
        </Routes>
      </Router>
      </PersistGate>
    </Provider>
  );

export default App;
