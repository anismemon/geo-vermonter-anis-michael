import React from 'react'
import L from 'leaflet'
import borderData from './border.js'
import leafletPip from 'leaflet-pip'
// import Footer from './Footer'

// random number generator for lat and long coordinates

function randomInt(max, min) {
    return (min + (Math.random() * (max - min)))
}

let randomLong = randomInt(-71.51022535353107, -73.42613118833583)

let randomLat = randomInt(45.007561302382754, 42.730315121762715)

// function to check if random point is within Vermont polygon

let coordinatesArray = [randomLat, randomLong]

let gjLayer = L.geoJSON(borderData)

checkPoint()

function checkPoint() {
    let pointInVermont = leafletPip.pointInLayer([randomLong, randomLat], gjLayer)
    console.log(coordinatesArray)
    // coordinatesArray = [randomLat, randomLong]

    // loop to keep generating random points until point is in Vermont polygon

    while (pointInVermont.length < 1) {

        randomLong = randomInt(-71.51022535353107, -73.42613118833583)
        randomLat = randomInt(45.007561302382754, 42.730315121762715)
        pointInVermont = leafletPip.pointInLayer([randomLong, randomLat], gjLayer)
        coordinatesArray = [randomLat, randomLong]
    }
    // return coordinatesArray
}

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
        this.dropPin()
        this.getCountyName()
        this.myMap.setView([this.state.lat, this.state.lng], this.state.zoom);

        // drops pin

        L.marker(coordinatesArray).addTo(this.myMap)

        // disables zoom and panning

        this.myMap.dragging.disable()
        this.myMap.touchZoom.disable()
        this.myMap.doubleClickZoom.disable()
        this.myMap.scrollWheelZoom.disable()
    }

    dropPin = () => {
        console.log('in dropPin')
        if (this.props.gameStarted === true && coordinatesArray[0] !== this.state.lat && coordinatesArray[1] !== this.state.lng) {
            console.log('in the if statement')
            this.setState({
                lat: coordinatesArray[0],
                lng: coordinatesArray[1],
                zoom: 18
            })
        }

    }

    getCountyName = () => {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${this.state.lat}&lon=${this.state.lng}`)
            .then((data) => {
                return data.json()

            }).then((result) => {
               this.setState({
                   countyName: result.address.county
               })
                alert(`Chris the lat is ${this.state.lat}, lon is ${this.state.lng}, and the countey is ${JSON.stringify(this.state.countyName)}`)
            })
    }

    render() {

        return (
            <div id='map'>

            </div>
        )
    }
}

export default Maplet

