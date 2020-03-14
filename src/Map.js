import React from 'react'
import L from 'leaflet'
import borderData from './border.js'
import leafletPip from 'leaflet-pip'
// import Footer from './Footer'




// Maplet component


class Maplet extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            lat: 43.9,
            lng: -72.7317,
            zoom: 8
        }
    }

    componentDidMount = () => {

        this.myMap = L.map('map').setView([this.state.lat, this.state.lng], this.state.zoom);

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash;'
        }).addTo(this.myMap);

        L.geoJSON((borderData), {
            fillOpacity: 0,
        }).addTo(this.myMap);

    }

    componentDidUpdate = () => {
        
        if (/*(this.props.gameStarted)*/ this.props.currentLat !== this.state.lat || this.props.currentLng !== this.state.lng) {
            this.setState({
                lat: this.props.currentLat,
                lng: this.props.currentLng,
            });
            
            this.myMap.setView([this.props.currentLat, this.props.currentLng], 18)
        };

        // drops pin

        L.marker([this.props.currentLat, this.props.currentLng]).addTo(this.myMap)

        // disables zoom and panning

        this.myMap.dragging.disable()
        this.myMap.touchZoom.disable()
        this.myMap.doubleClickZoom.disable()
        this.myMap.scrollWheelZoom.disable()
        this.myMap.zoomControl.disable()
    }



    render() {

        return (
            <div id='map'>

            </div>
        )
    }
}

export default Maplet

