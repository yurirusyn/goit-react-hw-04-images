import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './imageGallery.module.css';
const ImageGallery = ({ images, handleOpen }) => {
  return (
    <>
      <ul className={s['ImageGallery']}>
        {images.map(img => (
          <ImageGalleryItem img={img} key={img.id} handleOpen={handleOpen} />
        ))}
      </ul>
    </>
  );
};

export default ImageGallery;
