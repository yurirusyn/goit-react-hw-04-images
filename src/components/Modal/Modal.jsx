import { Component } from 'react/cjs/react.production.min';
import { createPortal } from 'react-dom';
import './modal.css';

class Modal extends Component {
  render() {
    return (
      <div class="overlay">
        <div class="modal">
          <img src="" alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
