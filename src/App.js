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

class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

            gameStarted: false,

            gameEnded: false,

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
            },
            
            countyName: '',

            cityName: '',

            townName: '',

            villageName: '',

            hamletName: '',

            modalDisplayed: false

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

        // loop to keep generating random points until one falls within Vermont 

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
        });

        // and array of moves is given a starting point

        this.setState(state => {
            let pathArray = state.pathArray.concat(state.startingPoint);

            return {
                pathArray
            }
        });


    }

    

    // start game function enables and disables buttons accordingly

    startGame = () => {
        this.setState({
            gameStarted: true,
            // startButton: false,
            // guessButton: true,
            // quitButton: true
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

        this.checkPoint();


    }

    // cardinal directional movement functions (subtracts points from score)

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
        this.getCountyName()
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
        this.getCountyName()
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

        this.getCountyName()
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

        this.getCountyName()
    }

    getCountyName = () => {
        console.log(this.state.startingPoint.lat)
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${this.state.startingPoint.lat}&lon=${this.state.startingPoint.lng}`)
            .then((data) => {
                return data.json()
            }).then((result) => {
                console.log(result)
                //let nameArray = result.display_name.split(',')
                let countyName = result.address.county
                // let countyName = nameArray[3]

                console.log(countyName)
                this.setState({
                    countyName: result.address.county,
                    cityName: result.address.city,
                    townName: result.address.town,
                    villageName: result.address.village,
                    hamletName: result.address.hamlet
                })
            })

    }


    quitGame = () => {

        // buttons  disabled  

        let startState = this.state.startButton
        startState.disabled = true
        
        let guessState = this.state.guessButton
        guessState.disabled = true
        
        this.setState({
            // startButton: false, 
            // guessButton: false,
            gameEnded: true,
            guessState,
            startState
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
                    <MyModal onClose={this.hideModal} modalDisplayed={this.state.modalDisplayed}>
                        Modal Contents
                    {this.props.children}
                    </MyModal>
                </div>

                <div id="headerContainer">
                    {/* <Header /> */}
                </div>

                <div id='centerContainer'>

                    <div id="leaflet-container">
                        <Maplet gameStarted={this.state.gameStarted} currentPoint={this.state.currentPoint} startingPoint={this.state.startingPoint} pathArray={this.state.pathArray} getCountyName={this.state.getCountyName} />

                    </div>

                    <div id="sidebarContainer">

                        <Sidebar score={this.state.score} moveNorth={this.moveNorth} moveSouth={this.moveSouth} moveWest={this.moveWest} moveEast={this.moveEast} returnToStart={this.returnToStart} gameEnded={this.state.gameEnded} countyName={this.state.countyName} townName={this.state.townName} villageName={this.state.villageName} hamletName={this.state.hamletName} currentPoint={this.state.currentPoint} startingPoint={this.state.startingPoint}/>

                    </div>

                </div>

                <div id="footerContainer">
                    <Footer displayModal={this.displayModal} startGame={this.startGame} startButton={this.state.startButton} guessButton={this.state.guessButton} quitButton={this.state.quitButton} quitGame={this.quitGame} />

                </div>

            </div>)
    }
}

export default App;
