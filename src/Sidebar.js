import React from 'react'


class Sidebar extends React.Component {

    render() {

        return (
            <div id='sidebarGrid'>

                <button className='compassButton' id='north' onClick={this.props.moveNorth}>N</button>
                <button className='compassButton' id='east' onClick={this.props.moveEast}>E</button>
                <button className='compassButton' id='south' onClick={this.props.moveSouth}>S</button>
                <button className='compassButton' id='west' onClick={this.props.moveWest} >W</button>

                <button className='button' id='returnButton' >Return</button>

                <input type='text' readOnly="readonly" className='displayLocationData' id='score' placeholder={this.props.points}/>

                <input type='text' readOnly="readonly" className='displayLocationData' id='latitude' placeholder='Latitude' />
                <input type='text' readOnly="readonly" className='displayLocationData' id='longitude' placeholder='Longitude'/>
                <input type='text' readOnly="readonly" className='displayLocationData' id='county' placeholder='County'/>
                <input type='text' readOnly="readonly" className='displayLocationData' id='town' placeholder='Town'/>
                
                <input type='text' readOnly='readonly' className='displayLocationData' id='winCondition' placeholder='Correct // Wrong -10pts'/>
                
                <img id='vtCountyMap' src='https://geology.com/county-map/vermont-county-map.gif' alt='County Map' />

                



            </div>
        )
    }
}

export default Sidebar
