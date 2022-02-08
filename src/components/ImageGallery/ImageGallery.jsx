import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './imageGallery.module.css';
const ImageGallery = ({ images }) => {
  return (
    <>
      <ul className={s['ImageGallery']}>
        {images.map(img => (
          <ImageGalleryItem img={img} key={img.id} />
        ))}
      </ul>
    </>
  );
};

export default ImageGallery;
