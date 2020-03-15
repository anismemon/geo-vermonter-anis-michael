import React from 'react'


class Sidebar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            county: 'County',
            town: 'Town',
            coordinates: {
                lat: 'Latitude',
                lng: 'Longitude'
            }
        }

    }

    componentDidUpdate = () => {

        if ((this.props.gameEnded) && (this.props.startingPoint !== this.state.coordinates)) {
           
            this.setState({
                county: this.props.countyName,
                town: this.props.town,
                coordinates: this.props.startingPoint
            });
        }
    }
    render() {

        return (
            <div id='sidebarGrid'>

                <button className='compassButton' id='north' onClick={this.props.moveNorth}>N</button>
                <button className='compassButton' id='east' onClick={this.props.moveEast}>E</button>
                <button className='compassButton' id='south' onClick={this.props.moveSouth}>S</button>
                <button className='compassButton' id='west' onClick={this.props.moveWest} >W</button>

                <img id='compassRose' src='https://d2d11z2jyoa884.cloudfront.net/product_images/compass-rose_lifestyle_1_20200314080506_500.png' alt='compass rose' />

                <button className='button' id='returnButton' onClick={this.props.returnToStart}>Return</button>

                <input type='text' readOnly="readonly" className='displayLocationData' id='score' placeholder={this.props.score} />

                <input type='text' readOnly="readonly" className='displayLocationData' id='latitude' placeholder={this.state.coordinates.lat} />
                <input type='text' readOnly="readonly" className='displayLocationData' id='longitude' placeholder={this.state.coordinates.lng} />
                <input type='text' readOnly="readonly" className='displayLocationData' id='county' placeholder={this.state.county} />
                <input type='text' readOnly="readonly" className='displayLocationData' id='town' placeholder={this.state.town} />

                <input type='text' readOnly='readonly' className='displayLocationData' id='winCondition' placeholder='Correct // Wrong -10pts' />

                <img id='vtCountyMap' src='https://geology.com/county-map/vermont-county-map.gif' alt='County Map' />

            </div>
        )
    }
}

export default Sidebar
