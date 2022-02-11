import { Component } from 'react';
import s from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ img, handleOpen }) => {
  return (
    <li
      className={s['ImageGalleryItem']}
      onClick={() => handleOpen(img.largeImageURL)}
    >
      <img
        src={img.webformatURL}
        className={s['ImageGalleryItem-image']}
        alt=""
      />
    </li>
  );
};

export default ImageGalleryItem;
