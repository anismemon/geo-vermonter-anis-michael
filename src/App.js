import React from 'react';
import Modal from 'react-modal';
import Header from './Header.js'
import Maplet from './Map.js'
import Sidebar from './Sidebar.js'
import Footer from './Footer.js'
import MyModal from './MyModal.js'
import borderData from './border.js'
import leafletPip from 'leaflet-pip'
import L from 'leaflet'

import './App.css';

Modal.setAppElement(MyModal)

// global variables for storing game's random lat and long

let randomLat
let randomLong

// App component with the majority of game's functionality and data

class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

            gameStarted: false,           

            score: 100,

            gjLayer: L.geoJSON(borderData),

            // geographical and political info

            currentPoint: {
                lat: 1,
                lng: 1
            },

            startingPoint: {
                lat: 1,
                lng: 1
            },

            pathArray: [],

            countyName: '',

            town: '',

            // buttons 

            startDisabled: false,
            guessDisabled: true,
            quitDisabled: true,
            returnDisabled: true,
            northDisabled: true,
            southDisabled: true,
            eastDisabled: true,
            westDisabled: true,


            modalDisplayed: false,

            modalContent: '',

            countyChosen: ''
        }
    }

    // random number generator for lat and long coordinates

    randomInt = (max, min) => {
        return (min + (Math.random() * (max - min)))
    }

    // function to check if random point is within Vermont polygon    

    checkPoint = () => {

        randomLong = this.randomInt(-71.51022535353107, -73.42613118833583)

        randomLat = this.randomInt(45.007561302382754, 42.730315121762715)

        let pointInVermont = leafletPip.pointInLayer([randomLong, randomLat], this.state.gjLayer)

        // loop to keep generating random points until one falls within Vermont 

        while (pointInVermont.length < 1) {

            randomLong = this.randomInt(-71.51022535353107, -73.42613118833583)
            randomLat = this.randomInt(45.007561302382754, 42.730315121762715)
            pointInVermont = leafletPip.pointInLayer([randomLong, randomLat], this.state.gjLayer)
        }

        // once an appropriate point is found, coordinates passed into state ...

        this.setState({
            currentPoint: {
                lat: randomLat,
                lng: randomLong
            },
            startingPoint: {
                lat: randomLat,
                lng: randomLong
            },
        });

        // ... the array of moves is given a starting point ...

        this.setState(state => {
            let pathArray = state.pathArray.concat(state.startingPoint);

            return {
                pathArray
            }
        });

        // ... and the location info is fetched

        this.getCountyName()
    }



    // start game function enables and disables buttons accordingly

    startGame = () => {

        this.setState({
            gameStarted: true,
            startDisabled: true,
            guessDisabled: false,
            quitDisabled: false,
            returnDisabled: false,
            northDisabled: false,
            southDisabled: false,
            eastDisabled: false,
            westDisabled: false
        });

        // calls checkPoint function

        this.checkPoint();
    }

    // cardinal directional movement functions (that subtract points from score)

    moveNorth = () => {

        this.setState({
            currentPoint: {
                lat: this.state.currentPoint.lat + .002,
                lng: this.state.currentPoint.lng
            },
            score: this.state.score - 1

        });

        // adds new move to array of moves

        this.setState(state => {
            let pathArray = state.pathArray.concat(state.currentPoint);

            return {
                pathArray
            }
        });
        console.log(this.state.pathArray)
    }

    moveSouth = () => {
        this.setState({
            currentPoint: {
                lat: this.state.currentPoint.lat - .002,
                lng: this.state.currentPoint.lng
            },
            score: this.state.score - 1

        });

        // adds new move to array of moves

        this.setState(state => {
            let pathArray = state.pathArray.concat(state.currentPoint);

            return {
                pathArray
            }
        })
        console.log(this.state.countyName)
    }

    moveWest = () => {
        this.setState({
            currentPoint: {
                lat: this.state.currentPoint.lat,
                lng: this.state.currentPoint.lng - .002,
            },
            score: this.state.score - 1
        });

        // adds new move to array of moves

        this.setState(state => {
            let pathArray = state.pathArray.concat(state.currentPoint);

            return {
                pathArray
            }
        })
    }

    moveEast = () => {
        this.setState({
            currentPoint: {
                lat: this.state.currentPoint.lat,
                lng: this.state.currentPoint.lng + .002,
            },
            score: this.state.score - 1
        });

        // adds new move to array of moves

        this.setState(state => {
            let pathArray = state.pathArray.concat(state.currentPoint);

            return {
                pathArray
            }
        })        
    }

    // fetches county and town names from nominatim using random lat and long coordinates

    getCountyName = () => {
        console.log(this.state.startingPoint.lat)
       
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${randomLat}&lon=${randomLong}`)
            .then((data) => {
                return data.json()
            }).then((result) => {

                console.log(result)

                this.setState({
                    countyName: result.address.county,
                    town: result.address.town || result.address.city || result.address.village || result.address.hamlet
                })
            })
    }

    // function to end game (which then displays initial location info stored in App's state and copied in Sidebar's state)

    endGame = () => {

        // disables buttons
        
        this.setState({
            
            gameStarted: false,            
            guessDisabled: true,
            returnDisabled: true,
            northDisabled: true,
            southDisabled: true,
            eastDisabled: true,
            westDisabled: true

        });

        // this.setState({
        //     guessState
        // });
        // let quitState = this.state.quitButton
        // quitState.disabled = true
        // this.setState({
        //     quitState
        // });

        console.log(this.state.countyName)
    }

    // returns to starting point 

    returnToStart = () => {
        this.setState({
            currentPoint: this.state.startingPoint
        })
    }

    // display modal function  

    displayModal = () => {
        this.setState({
            modalDisplayed: !this.state.modalDisplayed
        })
    }

    hideModal = e => {
        this.setState({
            modalDisplayed: !this.state.modalDisplayed
        });
    };

    render() {
        return (
            <div id='pageContainer'>

                <div className="App" id='modal'>
                    <MyModal onClose={this.hideModal} countyChosen={this.state.countyChosen} modalDisplayed={this.state.modalDisplayed}>
                       
                    {this.state.modalContent}
                    </MyModal>
                </div>

                <div id="headerContainer">
                    <Header />
                </div>

                <div id='centerContainer'>

                    <div id="leaflet-container">
                        <Maplet gameStarted={this.state.gameStarted} currentPoint={this.state.currentPoint} startingPoint={this.state.startingPoint} pathArray={this.state.pathArray} getCountyName={this.getCountyName} score={this.state.score} endGame={this.endGame} />

                    </div>

                    <div id="sidebarContainer">

                        <Sidebar score={this.state.score} moveNorth={this.moveNorth} moveSouth={this.moveSouth} moveWest={this.moveWest} moveEast={this.moveEast} returnToStart={this.returnToStart} gameStarted={this.state.gameStarted} countyName={this.state.countyName} town={this.state.town} currentPoint={this.state.currentPoint} startingPoint={this.state.startingPoint} northDisabled={this.state.northDisabled} southDisabled={this.state.southDisabled} eastDisabled={this.state.eastDisabled} westDisabled={this.state.westDisabled} />

                    </div>

                </div>

                <div id="footerContainer">
                    <Footer displayModal={this.displayModal} startGame={this.startGame} startDisabled={this.state.startDisabled} guessDisabled={this.state.guessDisabled} quitDisabled={this.state.quitDisabled} endGame={this.endGame} />

                </div>

            </div>)
    }
}

export default App;
