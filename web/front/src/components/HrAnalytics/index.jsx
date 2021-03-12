import { useState } from 'react';
import '../../assets/CSS/App.css';
import Forms from '../Forms';

const HrAnalytics = () => {
  const [variable, functionChangeVariable] = useState(false)

  return <>
    {!variable && <div className="content-button">
        <button onClick={()=>functionChangeVariable(true)}>
        Accéder au formulaire
      </button> 
      </div>}
    {variable && <Forms/>}
  </>
}

export default HrAnalytics;
