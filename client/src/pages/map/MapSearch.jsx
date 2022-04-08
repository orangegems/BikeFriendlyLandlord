import React, { useState, useEffect } from 'react';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import HomeCard from '../../components/homeCard/HomeCard.jsx';

import './mapSearch.css';

export default function MapSearch(props) {
  // 'pins' is an array of pins to post on the map based on address from the database
  const [pins, setPins] = useState([]);

  useEffect(() => {
    fetch('/landlords/allAddresses')
      .then((res) => res.json())
      .then(async (json) => {
        /**  iterate through the returned array of landlords with addresses
         *   use the google maps geocoding api to convert address to gpl coordinates
         */
        
        // keep google API key in the backend (safe)
        const apiKey = await (await fetch('http://localhost:3000/apiKey')).json();


        // const google_API_key = await fetch('/apiKey');
        // const apiKey = await google_API_key.json()

        const pinsToSet = [];
        for (let i = 0; i < json.length; i++) {
          const landlord = json[i];

          // query string that sends the landlord address to the google geocoding API
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=
            ${landlord.street_num}
            +${landlord.street.replaceAll(' ', '+')},
            +${landlord.city.replaceAll(' ', '+')},
            +${landlord.state}&key=${apiKey}`
          );
          const geoCode = await response.json();
          // strip coordinates off the response from google
          const coordinates = [
            geoCode.results[0].geometry.location.lat,
            geoCode.results[0].geometry.location.lng,
          ];

          pinsToSet.push(
            <Marker key={i} position={coordinates}>
              <Popup autoPan={true} closeButton={false}>
                <HomeCard landlord={landlord} />
              </Popup>
            </Marker>
          );
        }
        setPins(pinsToSet);
      })
      .catch((err) => console.log('error getting all landlords ->', err));
  }, []);

  /** Display the map positioned over the USA by default */
  return (
    <div id="map">
      <MapContainer center={[37.09024, -95.712891]} zoom={4}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pins}
      </MapContainer>
    </div>
  );
}
