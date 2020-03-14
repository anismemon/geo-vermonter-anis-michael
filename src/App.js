import React from 'react';
import Header from './Header.js'
import Maplet from './Map.js'
import Sidebar from './Sidebar.js'
import Footer from './Footer.js'
import borderData from './border.js'
import leafletPip from 'leaflet-pip'
import L from 'leaflet'

import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

            gamestarted: false,
            gjLayer: L.geoJSON(borderData),
            currentPoint: {
                lat: 1,
                lng: 1
            },

            startingPoint: {
                lat: 1,
                lng: 1
            },
            
            pathArray: [],
            score: 100,
            startButton: {
                disabled: false
            },
            guessButton: {
                disabled: true
            },
            quitButton: {
                disabled: true
            }
        }
    }

    // random number generator for lat and long coordinates

    randomInt = (max, min) => {
        return (min + (Math.random() * (max - min)))
    }

    // function to check if random point is within Vermont polygon    

    checkPoint = () => {

        let randomLong = this.randomInt(-71.51022535353107, -73.42613118833583)

        let randomLat = this.randomInt(45.007561302382754, 42.730315121762715)

        let pointInVermont = leafletPip.pointInLayer([randomLong, randomLat], this.state.gjLayer)

        // loop to keep generating random points until point is in Vermont polygon

        while (pointInVermont.length < 1) {

            randomLong = this.randomInt(-71.51022535353107, -73.42613118833583)
            randomLat = this.randomInt(45.007561302382754, 42.730315121762715)
            pointInVermont = leafletPip.pointInLayer([randomLong, randomLat], this.state.gjLayer)
        }

        // once an appropriate point is found, coordinates passed into state

        this.setState({
            currentPoint: {
                lat: randomLat,
                lng: randomLong
            },
            startingPoint: {
                lat: randomLat,
                lng: randomLong
            },
            
            pathArray: (this.state.startingPoint)
        })

    }

    // start game function  

    startGame = () => {
        this.setState({
            gamestarted: true,
        });

        // buttons enabled or disabled accordingly 

        let startState = this.state.startButton
        startState.disabled = true
        this.setState({
            startState
        });
        let guessState = this.state.guessButton
        guessState.disabled = false
        this.setState({
            guessState
        });
        let quitState = this.state.quitButton
        quitState.disabled = false
        this.setState({
            quitState
        });

        // calls checkPoint function

        this.checkPoint()
    }

    moveNorth = () => {

        this.setState({
            currentPoint: {
                lat: this.state.currentPoint.lat + .002,
                lng: this.state.currentPoint.lng
            },
            score: this.state.score - 1
           
            // pathArray: [this.state.currentLat, this.state.currentLng]
        })
    }

    moveSouth = () => {
        this.setState({
            currentPoint: {
                lat: this.state.currentPoint.lat - .002,
                lng: this.state.currentPoint.lng
            },
            score: this.state.score - 1
            
        })
    }

    moveWest = () => {
        this.setState({
            currentPoint: {
                lat: this.state.currentPoint.lat,
                lng: this.state.currentPoint.lng - .002,
            },
            score: this.state.score - 1
        })
    }

    moveEast = () => {
        this.setState({
            currentPoint: {
                lat: this.state.currentPoint.lat,
                lng: this.state.currentPoint.lng + .002,
            },
            score: this.state.score - 1
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
                        <Maplet gameStarted={this.state.gamestarted} currentPoint={this.state.currentPoint} />
                    </div>

                    <div id="sidebarContainer">

                        <Sidebar score={this.state.score} moveNorth={this.moveNorth} moveSouth={this.moveSouth} moveWest={this.moveWest} moveEast={this.moveEast} />

                    </div>

                </div>

                <div id="footerContainer">
                    <Footer startGame={this.startGame} startButton={this.state.startButton} guessButton={this.state.guessButton} quitButton={this.state.quitButton} />
                </div>

            </div>)
    }
}

export default App;
