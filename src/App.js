import React from 'react';
import Header from './Header.js'
import Maplet from './Map.js'
import Sidebar from './Sidebar.js'
import Footer from './Footer.js'
import borderData from './border.js'
import leafletPip from 'leaflet-pip'
import L from 'leaflet'

import './App.css';

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
    return coordinatesArray
}

class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

            gamestarted: false,
            
            currentPoint: {
                lat: 1,
                lng: 1,
            },
            
            startingPoint: {
                lat: 1,
                lng: 1
            },

            pathArray: []
        }
    }

    // start game function

    startGame = () => {
        this.setState({
            gamestarted: true
        })
    }

    render() {
        return (
            <div id='pageContainer'>

                <div id="headerContainer">
                    {/* <Header /> */}
                </div>

                <div id='centerContainer'>

                    <div id="leaflet-container">
                        <Maplet gameStarted = {this.state.gamestarted}/>
                    </div>

                    <div id="sidebarContainer">
                        {/* <Sidebar /> */}
                    </div>

                </div>

                <div id="footerContainer">
                    <Footer startGame = {this.startGame}/>
                </div>

            </div>)
    }
}

export default App;
