import React from 'react'
import ReactDOM from "react-dom";

class MyModal extends React.Component {

  render() {
     
    if(this.props.modalDisplayed) {
      return(
         
        <div id="modal">
        [Addison County, Bennington County, Caledonia County, Chittenden County, Essex County, Franklin County, Grand Isle County, Lamoille County, Orange County, Orleans County, Rutland County, Washington County, Windham County, Windsor County]
        </div>
        )
      } else {
        return <div />
      }
  }
}

export default MyModal
