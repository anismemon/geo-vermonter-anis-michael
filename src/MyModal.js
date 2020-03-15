import React from 'react'



class MyModal extends React.Component {

  onClose = e => {
    this.props.onClose && this.props.onClose(e)
  }

  render() {

    if (this.props.modalDisplayed) {
      return (
        <div>
          <div>{this.props.children}</div>
          <div>
            <button
              onClick={e => {
                this.onClose(e);
              }}
            >
              Close
        </button>
          </div>
        </div>
      )
    } else {
      return <div />
    }
  }
}

export default MyModal

// [Addison County, 
//   Bennington County, 
//   Caledonia County, 
//   Chittenden County, 
//   Essex County, 
//   Franklin County, 
//   Grand Isle County, 
//   Lamoille County, 
//   Orange County, 
//   Orleans County, 
//   Rutland County, 
//   Washington County, 
//   Windham County, 
//   Windsor County]