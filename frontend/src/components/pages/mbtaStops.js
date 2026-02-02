import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import './Stops.css';



function Stops() {
  const [stops, setStops] = useState([]);

  useEffect(() => {
  async function fetchData() {
    
    const stopsRes = await axios('https://api-v3.mbta.com/stops');
    setStops(stopsRes.data.data);
  }

  fetchData();
}, []);


  return (
    
    <div>
      <h1>List of Stops-</h1>
      <ul className="stops-list">
        
      {stops.map(stop => {
        const locationType = stop.attributes.location_type;
        let locationName;
        switch (locationType) {
          case 0:
            locationName = "Stop";
            break;
          case 1:
            locationName = "Station";
            break;
          case 2:
            locationName = "Entrance/Exit";
            break;
          case 3:
            locationName = "Generic Node";
            break;
          case 4:
            locationName = "Boarding Area";
            break;
          default:
            locationName = "Unknown";
        }
        const description = stop.attributes.description || "No description available.";
        const vehicleType = stop.attributes.vehicle_type || "Unknown";
        let vehicleName;
        switch (vehicleType) {
          case 0:
            vehicleName = "Light Rail";
            break;
          case 1:
            vehicleName = "Heavy Rail";
            break;
          case 2:
            vehicleName = "Commuter Rail";
            break;
          case 3:
            vehicleName = "Bus";
            break;
          case 4:
            vehicleName = "Ferry";
            break;
          default:
            vehicleName = "Unknown";
        }
        return(
        <li key={stop.id}>
            <Card.Body>
              <Card style={
                {
                  backgroundColor: '#6edff6ff',
                  margin: '10px',
                  padding: '30px',
                  borderRadius: '5px',
                  borderLeft: `10px solid `,
                }
              }>
                <h1 id="stopList">{stop.attributes.name}</h1>
                <p>{"Stop Description: " + description}</p>
                <p>{"Location Type: " + locationName}</p>
                <p>{"Stop ID: " + stop.id}</p>
                <p>{"Wheelchair Accessible: " + (stop.attributes.wheelchair_boarding === 1 ? "Yes" : "No")}</p>
                <p>{"Route: " + (stop.attributes.route || "Unknown")}</p>
                <p>{"Platform: " + (stop.attributes.platform_name || "Unknown")}</p>
                <p>{"Vehicle Type: " + vehicleName}</p>
              </Card>
            </Card.Body>
        </li>
        );
})}
      </ul>
      
        
    </div>
  );
}


export default Stops;