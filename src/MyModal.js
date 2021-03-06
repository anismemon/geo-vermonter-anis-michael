import React from 'react'



class MyModal extends React.Component {


  listenKeyboard(event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
      this.props.onClose();
    }
  }

  componentDidMount() {
    if (this.props.onClose) {
      window.addEventListener('keydown', this.listenKeyboard.bind(this), true);
    }
  }

  componentWillUnmount() {
    if (this.props.onClose) {
      window.removeEventListener('keydown', this.listenKeyboard.bind(this), true);
    }
  }

  onDialogClick(event) {
    event.stopPropagation();
  }

  onClose = e => {
    this.props.onClose && this.props.onClose(e)
  }


  chooseCounty = e => { //this function does not work!
    let playerSelection = this.Select.Option // this does not retrieve anything
    alert(playerSelection)

    if ((playerSelection) === (this.state.countyName)) {
      this.props.endGame()
      alert("Wow! You really know Vermont! Good job!!")
    } else {
      // this.setState({ // this can't go here
      //   score: this.state.score - 10
      // });
      alert("Incorrect guess. Please continue your peregrination through the Green Mountain State.")
    }
  }

  render() {

    if (this.props.modalDisplayed) {
      return (
        <div>
          <div className="modal-content-div">
            <div className="modal-dialog-div" onClick={this.onDialogClick}>
              <select id="county-select">
                <option value="">--Please choose a County--</option>
                <option value='Addison County'>Addison</option>
                <option value='Bennington County'>Bennington</option>
                <option value='Caledonia County'>Caledonia</option>
                <option value='Chittenden County'>Chittenden</option>
                <option value='Essex County'>Essex</option>
                <option value='Franklin County'>Franklin</option>
                <option value='Grand Isle County'>Grand Isle</option>
                <option value='Lamoille County'>Lamoille</option>
                <option value='Orange County'>Orange</option>
                <option value='Orleans County'>Orleans</option>
                <option value='Rutland County'>Rutland</option>
                <option value='Washington County'>Washington</option>
                <option value='Windham County'>Windham</option>
                <option value='Windsor County'>Windsor</option>
              </select>

              <div>
                <button
                  onClick={e => {
                    this.chooseCounty(e);
                  }}
                >
                  Submit
                  </button>

                <button

                  onClick={e => {
                    this.onClose(e);
                  }}
                >
                  Cancel
                </button>
              </div>

            </div >
          </div>
        </div>
      )
    } else {
      return <div />
    }
  }
}

export default MyModal

