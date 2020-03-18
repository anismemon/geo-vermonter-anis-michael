import React from 'react'


class Sidebar extends React.Component {
    constructor(props) {
        super(props)

        // default info to be displayed in info bar, updated to starting point info once games ends

        this.state = {
            county: 'County',
            town: 'Town',
            coordinates: {
                lat: 'Latitude',
                lng: 'Longitude'
            },
            winLose: 'Wrong Answer = ( - 10pts)'
        }
    }

    componentDidUpdate = () => {

        // once game ends, sends appropriate alert and updates Sidebar's coordinates to match App's starting coordinates

        // player guessed correctly 

        if ((this.state.county === 'County') && (this.props.stop === "stop")) {  
            
            this.setState({
                county: this.props.countyName,
                town: this.props.town,
                coordinates: this.props.startingPoint,
                winLose: 'You win!'

            })

            // hides modal

            this.props.concealModal()
        }

        // player gave up before guessing

        else if ((this.props.gameStarted === false) && (this.props.startingPoint !== this.state.coordinates)) {           
            
            this.setState({
                county: this.props.countyName,
                town: this.props.town,
                coordinates: this.props.startingPoint,
                winLose: "Better luck next time!"

            });
        }

        // score reached 0 before player guessed correctly

        if ((this.props.gameStarted === false) && (this.props.score === 0)) {

            this.setState({
                winLose: 'Better luck next time!'

            })
        }
    }

    render() {

        return (
            <div id='sidebarGrid'>

                <button className='compassButton' id='north' disabled={this.props.buttonsDisabled} onClick={this.props.moveNorth}>N</button>
                <button className='compassButton' id='east' disabled={this.props.buttonsDisabled} onClick={this.props.moveEast}>E</button>
                <button className='compassButton' id='south' disabled={this.props.buttonsDisabled} onClick={this.props.moveSouth}>S</button>
                <button className='compassButton' id='west' disabled={this.props.buttonsDisabled} onClick={this.props.moveWest} >W</button>

                <img id='compassRose' src='https://d2d11z2jyoa884.cloudfront.net/product_images/compass-rose_lifestyle_1_20200314080506_500.png' alt='compass rose' />

                <button className='button' name='returnButton' id='returnButton' disabled={this.props.buttonsDisabled} onClick={this.props.returnToStart}>Return</button>
                <div id='score'>Score - <input id='scoreBox' type='text' readOnly="readonly" className='score' placeholder={this.props.score} /></div>
                <div id='latitude'>Latitude - <input type='text' readOnly="readonly" className='displayLocationData' placeholder={this.state.coordinates.lat} /></div>
                <div id='longitude'>Longitude - <input type='text' readOnly="readonly" className='displayLocationData' placeholder={this.state.coordinates.lng} /></div>
                <div id='county'>County -<input type='text' readOnly="readonly" className='displayLocationData' placeholder={this.state.county} /></div>
                <div id='town'>Town -<input type='text' readOnly="readonly" className='displayLocationData' placeholder={this.state.town} /></div>

                <input type='text' readOnly='readonly' className='displayLocationData' id='winCondition' placeholder={this.state.winLose} />

                <img id='vtCountyMap' src='https://geology.com/county-map/vermont-county-map.gif' alt='County Map' />

            </div>
        )
    }
}

export default Sidebar
