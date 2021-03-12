import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { router } from './Router';
import './assets/CSS/App.css';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="App">
      <Header />
        { 
            router.map((prop,key) => 
              prop.redirect
              ? <Redirect from={prop.path} to={prop.to} key={key}/>
              : <Route path={prop.path} component={prop.component} key={key}/>
            )
        }
        <Footer />
    </div>
  );
}

export default App;