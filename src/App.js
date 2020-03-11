import React from 'react';
import Header from './Header.js'
import Maplet from './Map.js'
import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }


    render() {
        return (
            <div >

                {/* <Header /> */}


                <div id="leaflet-container">
                    <Maplet />
                </div>



            </div>

        )
    }
}

export default App;
