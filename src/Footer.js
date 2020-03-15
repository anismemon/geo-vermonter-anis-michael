import React from 'react'

class Footer extends React.Component {



    render() {

        return (
            <div>
                <button className='button' id='startButton' disabled={this.props.startDisabled} onClick={this.props.startGame}>Start</button>

                <button className='button' id='guessButton' disabled={this.props.guessDisabled} onClick={this.props.displayModal}>Guess</button>

                <button className='button' id='quitButton' disabled={this.props.quitDisabled} onClick={this.props.endGame}>I give up!</button>
            </div>
        )
    }
}


export default Footer
