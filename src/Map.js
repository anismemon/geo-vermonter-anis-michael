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
            currentPoint: {
            lat: 43.9,
            lng: -72.7317
            },
            zoom: 8
        }
    }

    componentDidMount = () => {

        this.myMap = L.map('map').setView(this.state.currentPoint, this.state.zoom);

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash;'
        }).addTo(this.myMap);

        L.geoJSON((borderData), {
            fillOpacity: 0,
        }).addTo(this.myMap);

    }

    componentDidUpdate = () => {
        
        if ((this.props.gameStarted) && (this.props.currentPoint !== this.state.currentPoint)) {
            this.setState({
                currentPoint: this.props.currentPoint
                // lng: this.props.currentLng,
            });
            
            this.myMap.setView(this.props.currentPoint, 18)
        };

        // drops pin

        L.marker(this.props.currentPoint).addTo(this.myMap)

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

