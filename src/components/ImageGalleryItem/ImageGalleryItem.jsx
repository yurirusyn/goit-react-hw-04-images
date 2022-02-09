import { Component } from 'react';
import s from './imageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {};
  render() {
    console.log(this.props.img.webformatURL);
    return (
      <li
        className={s['ImageGalleryItem']}
        onClick={() => this.props.handleOpen(this.props.img.largeImageURL)}
      >
        <img
          src={this.props.img.webformatURL}
          className={s['ImageGalleryItem-image']}
          alt=""
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
