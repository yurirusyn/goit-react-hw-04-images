import './App.css';
import Searchbar from './components/Searchbar/Searchbar';
import { getImage } from './services/api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import { Oval } from 'react-loader-spinner';
import Modal from './components/Modal/Modal.jsx';
import { useEffect, useState } from 'react';

const App = () => {
  // state = {
  //   submitValue: '',
  //   images: [],
  //   page: 1,
  //   isLoading: false,
  //   error: null,
  //   showModal: false,
  //   url: '',
  // };

  const [submitValue, setSubmitValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState('');

  // componentDidMount() {
  //   getImage()
  //     .then(images => this.setState({ images }))
  //     .catch(error => this.setState({ error: error.message }));
  // }

  //  componentDidUpdate(prevProps, prevState) {
  //   const prevValue = prevState.submitValue;
  //   const nextValue = this.state.submitValue;
  //   const prevPage = prevState.page;
  //   const nextPage = this.state.page;

  //   if (prevValue !== nextValue || prevPage !== nextPage) {
  //     // if (!this.state.search) return;
  //     this.setImages();
  //   }
  // }

  useEffect(() => {
    getImage()
      .then(images => setImages(images))
      .catch(error => setError(error.message));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getImage(submitValue, page)
      .then(images => setImages(prev => [...prev, ...images]))
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [submitValue, page]);

  const handleFormSubmit = submitValue => {
    setSubmitValue(submitValue);
    setPage(1);
    setImages([]);
    // this.setState({ submitValue, page: 1, images: [] });
  };

  const handleLoadMoreButton = () => {
    setPage(prev => prev.page + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleOpen = url => {
    setUrl(url);
    toggleModal();
  };

  return (
    <>
      {showModal && <Modal images={url} onClose={toggleModal}></Modal>}
      <Searchbar onSubmit={handleFormSubmit} />
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <ImageGallery images={images} handleOpen={handleOpen} />
          {isLoading ? (
            <Oval color="#00BFFF" height={80} width={80} />
          ) : (
            submitValue && <Button onClick={handleLoadMoreButton} />
          )}
        </>
      )}
    </>
  );
};

export default App;
