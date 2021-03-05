import logo from './assets/Img/logo.svg';
import './assets/CSS/App.css';
import Footer from './components/Footer';
import Forms from './components/Forms';
import Header from './components/Header';
import { useState } from 'react';


const App = () => {
  const [variable, functionChangeVariable] = useState(false)

  return <>
    <Header/>
      {!variable && <div className="content-button">
        <button onClick={()=>functionChangeVariable(true)}>
        Accéder au formulaire
      </button> 
      </div>}
    {variable && <Forms/>}

    {/* <Results/> */}
    {/* <Footer/> */}
  </>
}

export default App;
