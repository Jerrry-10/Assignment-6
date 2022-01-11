import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  async function GetZip () {
    let input = document.getElementById("zip").value;

    if (input.length === 5) {
      await axios
        .get(`http://ctp-zip-api.herokuapp.com/zip/${input}`)
        .then(response => {
          setPosts(response.data)
          console.log(response.data);
        })
    }
  }

  return (
    <div className="App text-center">
      <h1 className='text-light bg-dark p-5'>Zip Code Search</h1>
      <div className='align-items-center'>
        <label className="form-label"><b>Zip Code:</b></label>
        <div className='justify-content-center'>
          <div>
            <input type="text" id="zip" className="text-center " />
            <button type="button" onClick={GetZip}className="btn btn-primary">Search</button>
          </div>
        </div>
      </div>

      {
        posts.map(e => {   
          return(       
              <div className='card'>
                <div className='card-header'>{e.LocationText}</div>
                    <ul>
                      <li>State: {e.State ? e.State : "N/A"}</li>
                      <li>Location: ({e.Lat ? e.Lat : "N/A"}, {e.Long ? e.Long : "N/A"})</li>
                      <li>Population (estimated): {e.EstimatedPopulation ? e.EstimatedPopulation : "N/A"}</li>
                      <li>Total Wages: {e.TotalWages ? e.TotalWages : "N/A"}</li>
                    </ul>
              </div>
          )
        })
      }
    </div>
  );
}

export default App;
