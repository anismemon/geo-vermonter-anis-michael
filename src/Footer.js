import React from 'react'

class Footer extends React.Component {



    render() {

        return (
            <div>
                <button className='button' id='startButton' disabled={this.props.startButton.disabled} onClick={this.props.startGame}>Start</button>

                <button className='button' id='guessButton' disabled={this.props.guessButton.disabled} onClick={this.props.displayModal}>Guess</button>

                <button className='button' id='quitButton' disabled={this.props.quitButton.disabled} onClick={this.props.quitGame}>I give up!</button>
            </div>
        )
    }
}


export default Footer
