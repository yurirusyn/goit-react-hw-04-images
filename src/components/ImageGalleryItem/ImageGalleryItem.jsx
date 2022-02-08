import { Component } from 'react';
import s from './imageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {};
  render() {
    return (
      <li className={s['ImageGalleryItem']}>
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
