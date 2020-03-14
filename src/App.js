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
            currentLat: 1,
            currentLng: 1,
            startingLat: 1,
            startingLng: 1,
            pathArray: [],
            points: 100,
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

        this.setState({
            currentLat: randomLat,
            currentLng: randomLong,
            startingLat: randomLat,
            startingLng: randomLong,
            pathArray: ([randomLat, randomLong])
        })
         
    } 

    // start game function  

    startGame = () => {
        this.setState({
            gamestarted: true,
        });
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

        this.checkPoint()
    }

moveNorth = () => {
    
    this.setState({
        currentLat: this.statecurrentLat + .002,
        currentLng: this.state.currentLng,
        // pathArray.push: 
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
                        <Maplet gameStarted={this.state.gamestarted} currentLat={this.state.currentLat} currentLng={this.state.currentLng} />
                    </div>

                    <div id="sidebarContainer">

                        <Sidebar points={this.state.points} />

                    </div>

                </div>

                <div id="footerContainer">
                    <Footer startGame={this.startGame} startButton={this.state.startButton} guessButton={this.state.guessButton} quitButton={this.state.quitButton} />
                </div>

            </div>)
    }
}

export default App;
