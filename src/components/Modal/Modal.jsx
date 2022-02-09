import { Component } from 'react/cjs/react.production.min';
import { createPortal } from 'react-dom';
import './modal.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackdropClick = event => {
    // console.log('target:', event.currentTarget);
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="overlay" onClick={this.handleBackdropClick}>
        <div className="modal">
          <img src={this.props.images} alt="" />
          {this.props.children}
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
