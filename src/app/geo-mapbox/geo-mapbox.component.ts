import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import { $ } from 'protractor';
import { posix } from 'node:path';

@Component({
  selector: 'app-geo-mapbox',
  templateUrl: './geo-mapbox.component.html',
  styleUrls: ['./geo-mapbox.component.css']
})
export class GeoMapboxComponent implements OnInit{
  
  mapa: Mapboxgl.Map;
  

 
  ngOnInit(){
    Mapboxgl.accessToken = environment.mapboxKey;
    this.mapa = new Mapboxgl.Map({
    container: 'mapa-mapbox', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [       
      77.31834433971422,
      28.566885227533554,], // starting position
    zoom: 16 // starting zoom
    });
    
    this.Addcontrols();
    this.AddDirections();

this.mapa.on('load', (event) => {
      // add the real time map data
      this.mapa.addSource('maine', {
        'type': 'geojson',
        'data': 
        {
            'type':'FeatureCollection',
            'features':[
        {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [
                    
                77.24101012622474,
                28.632509817975556,
               
                    
                ]
            }
        },
        {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [
                    
                77.08228995505716,
                28.479608220167425,
               
                    
                ]
            }
        },
        {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [
                    
                77.31834433971422,
                28.566885227533554,
               
                    
                ]
            }
        }
        ]
      } 
      }),
  this.mapa.addLayer({
    'id': 'maine',
    'type': 'circle',
    'source': 'maine',
    
    'paint': {
        'circle-color': 'red',
        'circle-radius': 50,
        'circle-opacity': 0.5
                }
    });
  });
    
  this.watchPosition();
    
    
  }
Addcontrols(){
  this.mapa.addControl(new Mapboxgl.NavigationControl());
}

AddDirections(){
  this.mapa.addControl(
    new MapboxDirections({
    accessToken: Mapboxgl.accessToken
    }),
    'top-left'
    );
    
}


calcDist(lat1: number,lon1: number,lat2: number,lon2: number){
  var R = 6371; // km
    var dLat = ((lat2-lat1)* Math.PI) / 180;
    var dLon = ((lon2-lon1)* Math.PI) / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos((lat1* Math.PI) / 180) * Math.cos((lat2* Math.PI) / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
  }
  

watchPosition(){
  let deslat = 28.632509817975556;
  let deslong = 77.24101012622474;
  
  navigator.geolocation.watchPosition((position) =>{
      console.log(position.coords.latitude,position.coords.longitude);
      let distance = this.calcDist(deslat,deslong,position.coords.latitude,position.coords.longitude )
      if(distance < 0.5)
      {
        setTimeout(function () {
          const element: HTMLElement = document.getElementById('message') as HTMLElement
        element.innerHTML = 'Inside the geofence.'
        
        }, 3000);
        
      }
      else{
        setTimeout(function () {
          const element: HTMLElement = document.getElementById('message') as HTMLElement
        element.innerHTML = 'Not inside the geofence.'
        }, 3000);
        
        
      }
      
  },(err)=>{
    console.log(err);
  },{
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }
)
}


  
}