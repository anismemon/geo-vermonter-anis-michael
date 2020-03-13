import React from 'react'
// import L from 'leaflet'
// import borderData from './border.js'
// import leafletPip from 'leaflet-pip'

class Footer extends React.Component {


    








    render() {

        return (
            <div>
            <button className='button' id='startButton' disabled={this.props.startButton.disabled} onClick={this.props.startGame}>Start</button>
           
            <button className='button' id='guessButton' disabled={this.props.guessButton.disabled}>Guess</button>
            <button className='button' id='quitButton' disabled={this.props.quitButton.disabled} >I give up!</button>
            </div>
        )
    }
}

export default Footer
