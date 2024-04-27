
import React, { Component } from 'react';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      marker: null,
      selectedLocation: null,
      circle: null,
      circleRadius: 5000
    };
  }

  componentDidMount() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCj5mlYEy09B3Mr2nN4PAJXYA6CAvyq01k&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);
    window.initMap = this.initMap;
  }

  initMap = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const userLocation = { lat: latitude, lng: longitude };
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: userLocation,
        zoom: 10
      });
      const marker = new window.google.maps.Marker({
        position: userLocation,
        map: map,
        title: 'Your Location',
        draggable: true
      });
      const circle = new window.google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: userLocation,
        radius: this.state.circleRadius
      });
      marker.setPosition(circle.getCenter());
      marker.addListener('dragend', () => {
        const newPosition = marker.getPosition();
        this.setState({ 
          selectedLocation: { lat: newPosition.lat(), lng: newPosition.lng() },
          circleRadius: this.state.circleRadius
        });
        circle.setCenter(newPosition);
      });
      this.setState({ map, marker, circle });
    }, error => {
      console.error('Error getting user location:', error);
    });
  }

  handleSaveLocation = () => {
    const { selectedLocation } = this.state;
    if (selectedLocation) {
      console.log('Selected location:', selectedLocation);
    } else {
      console.error('No location selected.');
    }
  }

  handleIncreaseCircleSize = () => {
    const { circle, circleRadius } = this.state;
    if (circle) {
      const newRadius = circleRadius + 1000;
      circle.setRadius(newRadius);
      this.setState({ circleRadius: newRadius });
    }
  }

  handleDecreaseCircleSize = () => {
    const { circle, circleRadius } = this.state;
    if (circle && circleRadius > 1000) {
      const newRadius = circleRadius - 1000;
      circle.setRadius(newRadius);
      this.setState({ circleRadius: newRadius });
    }
  }

  handleLeadToArea = () => {
    const { map, marker, selectedLocation } = this.state;
    if (map && marker && selectedLocation) {
      map.setCenter(selectedLocation);
      marker.setPosition(selectedLocation);
    }
  }

  render() {
    const { circleRadius, selectedLocation } = this.state;
    return (
      <div className="flex flex-col items-center">
        <div id="map" className="w-full h-96 md:h-screen"></div>
        <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-x-2 md:space-y-0 mt-4">
          <button onClick={this.handleSaveLocation} className="btn">
            Save Location
          </button>
          <button onClick={this.handleIncreaseCircleSize} className="btn">
            Increase Circle Size
          </button>
          <button onClick={this.handleDecreaseCircleSize} className="btn">
            Decrease Circle Size
          </button>
          <button onClick={this.handleLeadToArea} className="btn">
            Lead to Area
          </button>
        </div>
        <div className="mt-4 text-center">
          <p>Circle Size: {circleRadius.toFixed(0)} meters</p>
          <p>Location: {selectedLocation ? `Lat: ${selectedLocation.lat.toFixed(6)}, Lng: ${selectedLocation.lng.toFixed(6)}` : 'No location selected'}</p>
        </div>
      </div>
    );
  }
}

export default Map;
