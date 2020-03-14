import React from 'react';
import Header from './Header.js'
import Maplet from './Map.js'
import Sidebar from './Sidebar.js'
import Footer from './Footer.js'
import Modal from './Modal.js'
import borderData from './border.js'
import leafletPip from 'leaflet-pip'
import L from 'leaflet'

import './App.css';

// let startButton = document.getElementById('startButton')
// let guessButton = document.getElementById('guessButton')
// let quitButton = document.getElementById('quitButton')
// console.log(quitButton)

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
            },

            countyName: '',

            modalDisplayed: false

        }
    }



    displayModal = () => {
        this.setState({
            modalDisplayed: true
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
    }



    render() {
        return (
            <div id='pageContainer'>

                <div id='modal'>
                    <Modal modalDisplayed={this.state.modalDisplayed} />
                </div>

                <div id="headerContainer">
                    {/* <Header /> */}
                </div>

                <div id='centerContainer'>

                    <div id="leaflet-container">
                        <Maplet gameStarted={this.state.gamestarted} />
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
