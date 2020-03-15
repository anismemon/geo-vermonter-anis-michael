import React from 'react'
import L from 'leaflet'
import borderData from './border.js'

// Map component

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

    // initial map area with Vermont border traced

    componentDidMount = () => {

        this.myMap = L.map('map').setView(this.state.currentPoint, this.state.zoom);

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash;'
        }).addTo(this.myMap);

        L.geoJSON((borderData), {
            fillOpacity: 0,
        }).addTo(this.myMap);

    }

    // once game starts, updates and shows all map and point movement

    componentDidUpdate = () => {

        if ((this.props.gameStarted) && (this.props.currentPoint !== this.state.currentPoint)) {
            this.setState({
                currentPoint: this.props.currentPoint
            });

            this.myMap.setView(this.props.currentPoint, 18);

        };

        // checks to make sure that at least one move has been made

        if ((this.props.gameStarted) && (this.props.startingPoint !== this.props.currentPoint)) {

            // draws a dotted line from one point to the next

            let breadcrumbs = Array.from(this.props.pathArray)

            L.polyline(breadcrumbs, { color: 'white', dashArray: '20, 20', dashOffset: '20' }).addTo(this.myMap)
        }
        // drops pin at each point along the path

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
            <div id='map'> </div>
        )
    }
}

export default Maplet

