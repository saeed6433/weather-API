import React,{useState} from 'react';
import Conditions from './Conditions';
import './Forecast.css';

const Forecast = ()=>{
  let [city, setCity] = useState('');
  let [unit, setUnit] = useState('imperial');
  let [data, setData] = useState({});
  // ({}); because we supposed to receive an object

  const uriEncodedCity = encodeURIComponent(city)
  //The city-input will need to be URI encoded before we put it in our URL string.
  //Javascript has a built-in function that takes care of this.

  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);


  function getForecast(e) {
    e.preventDefault();

     if(!city) return setError(true); 
       // if (!city) return;      :without setting error, just do nothing
       // if (city.length === 0) {return setError(true); } 

      
      setError(false);
      setData({});
      // Clear state in preparation for new data; to clear page for new try
      // withot them, the error would remain true, and also we would see the prior result of data

      setLoading(true);

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${uriEncodedCity}&units=${unit}&appid=18f9e1b286219145ec8530b4c4ea8925`)
      .then(resp=> resp.json())
      /*.then(setData)
        .then(()=>setLoading(false))
        .catch(setError) */
      .then(resp => {
        if (resp.cod !== 200) {
            throw new Error()
        } 
        setData(resp)
        setLoading(false)
      })
      .catch((err)=>{ 
        setError(true)
        setLoading(false)
        console.log(err.message)
      });
                /*Although the Javascript built-in fetch function has a catch block, 
    it will still run the code in the then block if the API request returns with a status of 400 or 404.
    We don’t want that. If there is an error, 
    we want to display an error message to the user and not set the response object. */


  }
  console.log(error)
  return(
    <div className='Wrapper'>
      <h2>Find Current Weather Conditions</h2>

    {//  <div>{JSON.stringify(data)}</div>
    /*stringifying using built in Javascript code. 
     This has to be done because the data is returned as JSON and 
     React does not render objects.*/}

     {//  <button onClick={getForecast}>Get Forecast</button>
      //button without input city
     }
      

      <form onSubmit={getForecast}> 
      {//<form onSubmit={(e) => {getForecast(); e.preventDefault()}}>
      // we can also use preventDefault here, instead of first line of  function
      }
        <input type="text" placeholder='Enter City' maxLength='50' className="TextInput"
          value={city} onChange={(e)=> setCity(e.target.value)} />
        <label> 
          <input type="radio" name='unit' className="Radio"
          checked={unit === "imperial"} value="imperial" onChange={(e)=>setUnit(e.target.value)} />
          Fahrenheit
        </label>
        <label> 
          <input type="radio" name='unit' className='Radio'
          checked={unit === "metric"} value="metric" onChange={(e)=>setUnit(e.target.value)} />
          Celcius
        </label>

        <button className='Button' type='submit'>Get Forecast</button>
      </form>
           
      <Conditions
              data={data}
              error={error}
              loading={loading}
              />
    </div>

  )

}

export default Forecast
