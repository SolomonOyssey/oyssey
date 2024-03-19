import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoibmlsZXNob3lzc2V5IiwiYSI6ImNsdGhvYjgyYjA3YjUya3RrcTB0dXR1d3YifQ.Uu9Uq7MuYHdTxXvhCna0lQ';


function Map() {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-77.0);
    const [lat, setLat] = useState(38.91);
    const [zoom, setZoom] = useState(9);
  
    useEffect(() => {
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
      });
  
      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
        });
  
        const geojson = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-77.032, 38.913]
              },
              properties: {
                title: 'Mapbox',
                description: 'Washington, D.C.'
              }
            },
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-122.414, 37.776]
              },
              properties: {
                title: 'Mapbox',
                description: 'San Francisco, California'
              }
            }
          ]
        };
      
        // add markers to map
      for (const feature of geojson.features) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';
      
        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
            )
        )
        .addTo(map.current);
      }
    });
  
  
  
    return (
      <div className="map">
          <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
          <div ref={mapContainer} className="map-container" />
      </div>
    );
  }
  
  export default Map;