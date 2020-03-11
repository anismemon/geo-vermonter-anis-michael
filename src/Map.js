import React from 'react'
import L from 'leaflet'



class Maplet extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            lat: 51.505,
            lng: -0.09,
            zoom: 8,
        }
    }

    componentDidMount = () => {
        let myMap = L.map('map').setView([this.state.lat, this.state.lng], this.state.zoom);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
        }).addTo(myMap)
    }

    render() {

        return (
            <div id='map'>

            </div>
        )
    }
}




export default Maplet
