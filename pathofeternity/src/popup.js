import React from 'react';
import { connect } from 'react-redux'
import {Modal, Button} from 'react-bootstrap'
import {hidePopup} from './actions.js'

const PopupLayout = ({onClick, message, title, show}) =>  (
  show ?
  <Modal.Dialog>
    <Modal.Header>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      {message}
    </Modal.Body>

    <Modal.Footer>
      <Button bsStyle="primary" onClick={onClick}>Close</Button>
    </Modal.Footer>
  </Modal.Dialog>
  : null
)
const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => { dispatch(hidePopup())}
  }
}
const mapStateToProps = (state) => {
  return {
    show: state.popup.show,
    message: state.popup.message,
    title: state.popup.title
  }
}

const Popup = connect(mapStateToProps, mapDispatchToProps)(PopupLayout)

export default Popup;
