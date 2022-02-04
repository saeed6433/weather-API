
import React from 'react';
import './Forecast.css';

const Conditions = (props) => {
   return (
       <div className='Wrapper'>
           {props.data.cod === 200 ?
               <div>
                   <p><strong>{props.data.name}</strong></p>
                   <p>It is currently {Math.round(props.data.main.temp)} degrees out with {props.data.weather[0].description}.</p>
               </div>
           :  null
           }
           
           {props.error &&
            <small className='Small'>Please enter a valid city.</small>
           }
           {props.loading &&
           <div className='Loader'></div>
           }
       </div>
   )
}
export default Conditions;